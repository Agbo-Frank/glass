import './product.css'
import { useParams } from "react-router-dom"
import { useQuery, useMutation, useReactiveVar } from '@apollo/client'
import ProductSlide from './ProductSlide'
import Title from '../../Title/Title'
import { ADD_TO_CART, SAVE_ITEM } from '../../../Apollo/Operations/mutations'
import { GET_PRODUCT } from '../../../Apollo/Operations/queries'
import Loader from '../../Loader/Loader'
import { configuration } from '../../../utils'
import { UserVar } from '../../../Apollo/reactiveVariables/User'

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
    console.log(token)
    
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
                                <button>Buy Now</button>
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