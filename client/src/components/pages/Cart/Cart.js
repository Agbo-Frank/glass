import './cart.css'
import Title from "../../Title/Title"
import { useNavigate } from 'react-router'
import { AlertFunc } from '../../../Apollo/reactiveVariables/Alert'
import {Image} from 'cloudinary-react';
import { useQuery, useReactiveVar, useMutation } from '@apollo/client'
import {  GET_USER } from '../../../Apollo/Operations/queries'
import { CartVar } from '../../../Apollo/reactiveVariables/Cart'
import { UserVar } from '../../../Apollo/reactiveVariables/User'
import { REMOVE_CART_ITEM } from '../../../Apollo/Operations/mutations'

const token = localStorage.getItem('Token')

function Cart({cart}){
    const [removeItem] = useMutation(REMOVE_CART_ITEM, {
        context: {
            headers: {
                authToken:  token
            }
        },
        onCompleted: (data) => {
            let id = data.removeFromCart.message.split(' ')[0]
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
            <Image cloudName="agbofrank" publicId={cart?.product.image} secure="true" ></Image>
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
    const navigate = useNavigate()
    
    const {loading, error } = useQuery(GET_USER, {
        fetchPolicy: "network-only",
        context:{
            headers:{
                authToken:  token
            }
        },
        onCompleted: (data) => {
            console.log(data)
            return CartVar(
                ...CartVar(),
                data.getUser.cart)
        },
        onError: async (err) => {
            if(err){
                // console.log(err)
                // navigate('/login')
                // await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT'}), 5000)
                // return AlertFunc({type: 'ERROR_ALERT', data: 'Please Login!'})
            }
        } 
    })
    
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