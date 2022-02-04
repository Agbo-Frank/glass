import './product.css'
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/client'
import ProductSlide from './ProductSlide'
import Title from '../../Title/Title'
import { ADD_TO_CART, SAVE_ITEM } from '../../../Apollo/Operations/mutations'
import { GET_PRODUCT } from '../../../Apollo/Operations/queries'
import Loader from '../../Loader/Loader'
import { configuration } from '../../../utils'

function Product(){
    const { id } = useParams()
    const { data, loading } = useQuery(GET_PRODUCT, {
        variables: {
            id
        }
    })
    let product = data?.getProduct
    
    const [addToCart] = useMutation(ADD_TO_CART, { ...configuration })
    const [saveItem] = useMutation(SAVE_ITEM, { ...configuration })
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