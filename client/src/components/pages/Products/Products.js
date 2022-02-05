import './products.css'
import { Link } from 'react-router-dom'
import {Image} from 'cloudinary-react';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client'
import { GET_PRODUCTS } from '../../../Apollo/Operations/queries'
import { ADD_TO_CART, SAVE_ITEM } from '../../../Apollo/Operations/mutations'
import Title from '../../Title/Title'
import Loader from '../../Loader/Loader';
import { configuration } from '../../../utils'
import { UserVar } from '../../../Apollo/reactiveVariables/User'

function Product({product}){
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

    return(
        <div className="product">
            <div>
                <i className="fa fa-cart-arrow-down" onClick={() => addToCart({
                    variables:{
                        id: product._id
                    }
                })}></i>
                <Link to={`/product/${product._id}`}><i className="fa fa-eye"></i></Link>
                <i className="fa fa-heart" onClick={() => saveItem({
                    variables:{
                        id: product._id
                    }
                })}></i>
            </div>
            <Image cloudName="agbofrank" publicId={product.image[0]} secure="true" ></Image>
            <div>
                <strong>{product.name}</strong>
                <ul className="stars">
                    <li><i className="fa fa-star"></i></li>
                    <li><i className="fa fa-star"></i></li>
                    <li><i className="fa fa-star"></i></li>
                    <li><i className="fa fa-star"></i></li>
                    <li><i className="fa fa-star-half"></i></li>
                </ul>
                <p>${product.price}.00</p>
            </div>
        </div>
    )
}

function Products(){
    const {data, loading} = useQuery(GET_PRODUCTS)
    console.log(data)
    const products = data?.getProducts

    if(loading){
        return (<Loader />)
    }
    return(
        <div className="products">
            <Title title="OUR PRODUCTS" location="product"/>
            <h2>OUR PRODUCTS</h2>
            <section>
                <div className="grid">
                    {
                        products?.map(product => (
                            <Product product={product} />
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default Products