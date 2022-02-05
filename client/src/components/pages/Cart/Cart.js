import './cart.css'
import Title from "../../Title/Title"
import {Image} from 'cloudinary-react';
import { useQuery, useReactiveVar, useMutation } from '@apollo/client'
import { GET_CART } from '../../../Apollo/Operations/queries'
import { UserVar } from '../../../Apollo/reactiveVariables/User'
import { CartVar, CartLength } from '../../../Apollo/reactiveVariables/Cart'
import Loader from '../../Loader/Loader'
import { REMOVE_CART_ITEM } from '../../../Apollo/Operations/mutations'

function Cart({cart}){
    const user = useReactiveVar(UserVar)
    const token = user[0]?.token
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
                        <input type="text" value={cart.quantity}/>
                    </div>
                    <p>${cart?.product.price}.00</p>
                </div>
            </div>
        </div>
    )
}

function Carts(){
    const carts = useReactiveVar(CartVar)
    const user = useReactiveVar(UserVar)
    const token = user[0]?.token
    
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
                </div>
            </section>
        </>
    )
}

export default Carts