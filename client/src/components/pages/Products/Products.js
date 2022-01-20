import './products.css'
import { Link } from 'react-router-dom'
import {Image} from 'cloudinary-react';
import { useQuery, useMutation } from '@apollo/client'
import { AlertFunc } from '../../../Apollo/reactiveVariables/Alert'
import { GET_PRODUCTS } from '../../../Apollo/Operations/queries'
import { ADD_TO_CART } from '../../../Apollo/Operations/mutations'
import Title from '../../Title/Title'
import Loader from '../../Loader/Loader';

function Product({product}){
    const token = localStorage.getItem('Token')
    const configuration = {
        context:{
            headers:{
                authToken: token 
            }
        },
        onCompleted: async (data) => {
            console.log(data)
            await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT2'}), 3000)
            return AlertFunc({type: 'SUCCESS_ALERT2', data: 'Product Successfully Added'})
        },
        onError: async (err) => {
            if(err){
                const message1 = err.networkError
                console.log(message1, err.graphQLErrors)
                await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT2'}), 5000)
                return AlertFunc({type: 'ERROR_ALERT2', data: <>Unsuccessfully Added, Please <Link to="/login" className="alert-link">Login!</Link></>})
            }
        }
    }
    const [addToCart] = useMutation(ADD_TO_CART, { ...configuration })
    return(
        <div className="product">
            <div>
                <i class="fa fa-cart-arrow-down" onClick={() => addToCart({
                    variables:{
                        id: product._id
                    }
                })}></i>
                <i class="fa fa-heart"></i>
            </div>
            <Image cloudName="agbofrank" publicId={product.image} secure="true" ></Image>
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
    console.log(data?.getProducts)
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