import './product.css'
import ProductSlide from './ProductSlide'
import images from '../../../glass_img'

function Product(){
    return(
        <div className='product-page'>
                <ProductSlide />
                {/* <div className='slide'>
                    <img src={images.product1} alt="" />
                </div>
                <ul>
                    <li><img src={images.product1} alt="" /></li>
                    <li><img src={images.product2} alt="" /></li>
                    <li><img src={images.product3} alt="" /></li>
                    <li><img src={images.product4} alt="" /></li>
                    <li><img src={images.product6} alt="" /></li>
                    <li><img src={images.banner1} alt="" /></li>
                </ul> */}
            <div className='text'>
                <div>
                    <h2>The Goes here</h2>
                    <div>
                        <ul className="stars">
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star-half"></i></li>
                        </ul>
                        <div><i className="fa fa-star"></i> Save For Later</div>
                    </div>
                </div>
                <div className="desc">
                    <h3>Short description </h3>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Odit molestiae esse placeat suscipit ut at facilis ducimus, aspernatur rerum sed ipsam officiis voluptates? Nesciunt delenit
                    i earum rerum incidunt in labore.
                    </p>
                </div>
                <div>
                    <div>$230.00</div>
                    <div className='buttons'>
                        <button>Buy Now</button>
                        <button>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product