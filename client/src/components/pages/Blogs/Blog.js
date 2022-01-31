import { Link } from "react-router-dom";
import images from "../../../glass_img";
import Title from "../../Title/Title";
import './blog.css'


function Blog({img}){
    return(
        <div className="blog">
            <img src={img} alt="" />
            <div>
                <div>
                    <strong>Blog Title Goes Here</strong>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus  
                        aperiam.
                    </p>
                    <Link to="/" className="btn">Read More</Link>
                </div>
                <ul>
                    <li><i class="fa fa-clock-o"></i> 21st May, 2021</li>
                    <li><i class="fa fa-clock-o"></i> 21st May, 2021</li>
                </ul>
            </div>
        </div>
    )
}

function Blogs(){
    return(
        <>
            <Title title="our blogs" location="blogs" />
            <h2>Our Daily post</h2>
            <section>
                <div className="blogs">
                    <Blog img={images.blog1}/>
                    <Blog img={images.blog2}/>
                    <Blog img={images.blog3}/>
                    <Blog img={images.blog4}/>
                    <Blog img={images.blog5}/>
                    <Blog img={images.blog6}/>
                </div>
            </section>
        </>
    )
}

export default Blogs