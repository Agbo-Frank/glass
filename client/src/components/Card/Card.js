import img1 from '../../glass_img/banner-1.jpg'
import img2 from '../../glass_img/banner-2.jpg'
import img3 from '../../glass_img/banner-3.jpg'
import './card.css'

function Card({img}){
    return(
        <div className="card">
            <img src={img} alt="banner-1" />
            <div>
                <p>Protect your eyes</p>
                <h4>UPTO 50% OFF</h4>
                <a href="/" className="btn">Shop now</a>
            </div>
        </div>
    )
}

function Cards(){
    return(
        <div className="cards">
            <Card img={img1}/>
            <Card img={img2}/>
            <Card img={img3}/>
        </div>
    )
}

export default Cards