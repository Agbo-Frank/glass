import './footer.css'

function Footer(){
    return(
        <footer>
            <ul>
                <h4>Quick Links</h4>
                <li><i class="fa fa-chevron-right"></i>Home</li>
                <li><i class="fa fa-chevron-right"></i>Products</li>
                <li><i class="fa fa-chevron-right"></i>About</li>
                <li><i class="fa fa-chevron-right"></i>Blogs</li>
                <li><i class="fa fa-chevron-right"></i>Contacts</li>
                <li><i class="fa fa-chevron-right"></i>Login</li>
                <li><i class="fa fa-chevron-right"></i>Register</li>
            </ul>
            <ul>
                <h4>Extra Links</h4>
                <li><i class="fa fa-chevron-right"></i>My Order</li>
                <li><i class="fa fa-chevron-right"></i>My Account</li>
                <li><i class="fa fa-chevron-right"></i>My Wishlist</li>
            </ul>
            <ul>
                <h4>Follow Us</h4>
                <li><i class="fa fa-facebook"></i>Facebook</li>
                <li><i class="fa fa-twitter"></i>Twitter</li>
                <li><i class="fa fa-instagram"></i>Instagram</li>
                <li><i class="fa fa-linkedin"></i>Linkedin</li>
                <li><i class="fa fa-github"></i>GitHub</li>
            </ul>
            <div>
                <h4>News Letter</h4>
                <div>
                    <p>Subscribe For Latest Updates</p>
                    <input type="email"/>
                    <button type="submit" className="btn">Subscribe</button>
                </div>
            </div>
        </footer>
    )
}

export default Footer