import './cart.css'
import Title from "../../Title/Title"
import {Image} from 'cloudinary-react';
import { useQuery, useReactiveVar, useMutation } from '@apollo/client'
import { GET_CART } from '../../../Apollo/Operations/queries'
import { UserVar } from '../../../Apollo/reactiveVariables/User'
import { CartVar, CartLength, OrderVar } from '../../../Apollo/reactiveVariables/Cart'
import Loader from '../../Loader/Loader'
import { usePaystackPayment } from "react-paystack"
import { REMOVE_CART_ITEM, CREATE_ORDER, CLEARCART } from '../../../Apollo/Operations/mutations'

function Cart({cart}){
    const user = useReactiveVar(UserVar)
    const token = user[0]?.token

    //remove from the cart
    const [removeItem] = useMutation(REMOVE_CART_ITEM, {
        context: {
            headers: {
                authToken:  token
            }
        },
        onCompleted: (data) => {
            let id = data.removeFromCart.split(' ')[0]
            if(CartLength().includes(id)){
                CartLength(
                    CartLength().filter(cart => cart !== id)
                )
            }
            return CartVar(
                CartVar().filter(cart => cart.itemId !== id)
            )
        }
    })
    return(
        <div className="cart">
            <i class="fa fa-times" onClick={() => removeItem({
                variables: {
                    id: cart?.product._id
                }
            })}></i>
            <div>
                <Image cloudName="agbofrank" publicId={cart?.product?.image[0]} secure="true" ></Image>
                <div>
                    <strong>{cart?.product.name}</strong>
                    <div className="quantity-control">
                        <p>Quantity:</p>
                        <input type="text" value={cart?.quantity}/>
                    </div>
                    <p>₦{cart?.product.price}.00</p>
                </div>
            </div>
        </div>
    )
}

function Carts(){
    const carts = useReactiveVar(CartVar)
    const user = useReactiveVar(UserVar)
    const token = user[0]?.token
    
    //fetch cart items
    const {loading, error } = useQuery(GET_CART, {
        fetchPolicy: "network-only",
        context:{
            headers:{
                authToken:  token
            }
        },
        onCompleted: (data) => {
            return CartVar([...data.getUser.cart])
        } 
    })
    //create order after checking out
    const [createOrder] = useMutation(CREATE_ORDER, {
        context:{
            headers:{
                authToken:  token
            }
        },
        onCompleted: (data) => {
            if(data.createOrder){
                OrderVar([...OrderVar(), data.createOrder])
                console.log(OrderVar())
            }
        }
    })

    const [clearCart] = useMutation(CLEARCART, {
        context:{
            headers:{
                authToken:  token
            }
        }, 
        onCompleted: () => {
            CartLength([])
            return CartVar([])
        }
    })
    const shippingFee = 100
    const total = carts.reduce((total, cart) => total + (cart?.product.price * cart?.quantity), 0)

    //pay stack config
    const config = {
        publicKey: 'pk_test_149011f21e082e0d7211b37f9d8305cee896f759',
        reference: (new Date()).getTime().toString(),
        email: user[0]?.email,
        amount: total * 100,
      };
    const initializePayment = usePaystackPayment(config);

    //checkout
    function checkOut(res){
        console.log(res)
        if(res.message === "Approved" && res.status === 'success'){
            carts.forEach(cart => {
                createOrder({
                    variables: {
                        vendorId: cart.product.vendorId,
                        productId: cart.itemId,
                        price: cart.product.price * cart.quantity,
                        reference: res.reference
                    }
                })
            })

            //clear cart
            clearCart()
        }
    }
    if(loading){
        return (<Loader />)
    }
    return(
        <>
            <Title title="shopping cart" location="cart" />
            <h2>your product</h2>
            <section>
                <div className="carts">
                    {
                        carts?.map((cart, i) => (
                            <Cart cart={cart} key={i}/>
                        ))
                    }
                    <div className='order-summary'>
                        <strong>Order Summary</strong>
                        <div>
                            <p>subtotal</p>
                            <p>₦{total}</p>
                        </div>
                        <div>
                            <p>Shipping Fee</p>
                            <p>₦{shippingFee}</p>
                        </div>
                        <div>
                            <strong>Total</strong>
                            <strong>₦{total + shippingFee}</strong>
                        </div>
                        <button onClick={() => {
                            initializePayment((res) => checkOut(res), (err) => console.log(err));
                        }}>Checkout Now</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Carts