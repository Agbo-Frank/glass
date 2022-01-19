import Title from "../../Title/Title";
import images from "../../../glass_img";
import './about.css'

function About(){
    return(
        <>
            <Title title="about us" location="about" />
            <h2>Why Choose Us?</h2>
            <section>
                <div className="about">
                    <img src={images.about} />
                    <div>
                        <h2>The Best Eye Glasses Sellers</h2>
                        <p>
                            Lorem ipsum dolor, sit amet
                            consectetur adipisicing elit. Natus excepturi aliquam eum quaerat! Error 
                            explicabo laboriosam deserunt eveniet nesciunt perspiciatis ex repellendus officia facere, amet 
                            ecessitatibus sequi at laudantium tenetur!
                            Lorem ipsum dolor, sit amet
                            consectetur adipisicing elit. Natus excepturi aliquam eum quaerat! Error 
                            explicabo laboriosam deserunt eveniet nesciunt perspiciatis ex repellendus officia facere, amet 
                            ecessitatibus sequi at laudantium tenetur!
                        </p>
                        <div className="btn">Read More</div>
                    </div>
                </div>
                <ul>
                    <li>
                        <img src={images.icon1} alt="" />
                        <p>Free Shipping</p>
                    </li>
                    <li>
                        <img src={images.icon3} alt="" />
                        <p>Easy Return</p>
                    </li>
                    <li>
                        <img src={images.icon2} alt="" />
                        <p>All Sizes</p>
                    </li>
                    <li>
                        <img src={images.icon4} alt="" />
                        <p>Easy Payment</p>
                    </li>
                    <li>
                        <img src={images.icon5} alt="" />
                        <p>24/7 support</p>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default About