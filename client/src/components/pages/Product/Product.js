import './product.css'
import { useParams } from "react-router-dom"
import { useQuery, useMutation, useReactiveVar } from '@apollo/client'
import ProductSlide from './ProductSlide'
import Title from '../../Title/Title'
import { ADD_TO_CART, SAVE_ITEM, CREATE_ORDER } from '../../../Apollo/Operations/mutations'
import { GET_PRODUCT } from '../../../Apollo/Operations/queries'
import Loader from '../../Loader/Loader'
import { configuration } from '../../../utils'
import { UserVar } from '../../../Apollo/reactiveVariables/User'
import { OrderVar } from '../../../Apollo/reactiveVariables/Cart'
import { usePaystackPayment } from "react-paystack"

function Product(){
    const { id } = useParams()
    const { data, loading } = useQuery(GET_PRODUCT, {
        variables: {
            id
        }
    })
    let product = data?.getProduct
    const user = useReactiveVar(UserVar)
    const token = user[0]?.token
    
    const [addToCart] = useMutation(ADD_TO_CART, { ...configuration,
        context:{
            headers:{
                authToken: token 
            }
        }
    })
    const [saveItem] = useMutation(SAVE_ITEM, { ...configuration,
        context:{
            headers:{
                authToken: token 
            }
        }
    })
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
    const config = {
        publicKey: 'pk_test_149011f21e082e0d7211b37f9d8305cee896f759',
        reference: (new Date()).getTime().toString(),
        email: user[0]?.email,
        amount: product.price * 100,
      };
    const initializePayment = usePaystackPayment(config);
    function checkOut(res){
        console.log(res)
        if(res.message === "Approved" && res.status === 'success'){
            createOrder({
                variables: {
                    vendorId: product.vendorId,
                    productId: product._id,
                    price: product.price,
                    reference: res.reference
                }
            })
        }
    }
    if(loading){
        return <Loader />
    }
    return(
        <>
            <Title title="PRODUCT" location="products"/>
            <h2>PRODUCT</h2>
            {
                <div className='product-page'>
                    <ProductSlide arrimage={product.image}/>
                    <div className='text'>
                        <div>
                            <h2>{product.name}</h2>
                            <div>
                                <ul className="stars">
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star-half"></i></li>
                                </ul>
                                <div><i className="fa fa-heart"></i> Save For Later</div>
                            </div>
                        </div>
                        <div className="desc">
                            <h3>Short description </h3>
                            <p>{product.description}</p>
                        </div>
                        <div>
                            <div>${product.price}.00</div>
                            <div className='buttons'>
                                <button onClick={() => {
                                 initializePayment((res) => checkOut(res), (err) => console.log(err));
                                }}>Buy Now</button>
                                <button onClick={() => addToCart({
                                    variables:{
                                        id: product._id
                                    }
                                })}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Product