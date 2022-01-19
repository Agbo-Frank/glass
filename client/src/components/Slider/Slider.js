import images from '../../glass_img'
import { useState } from 'react'
import './slider.css'

function Slider(){

    const [type, setType] = useState(1)
    return(
        <div className="sliders">
            <div className={`slider ${type === 1 && 'active'}`}>
                <img src={images.slide3} alt='slider'/>
                <div>
                    <p>Protect your eyes</p>
                    <h1>UPTO 50% OFF</h1>
                    <a href="/" className="btn fadeIn">Shop now</a>
                </div>
            </div>
            <div className={`slider ${type === 2 && 'active'}`}>
                <img src={images.slide2} alt='slider'/>
                <div>
                    <p>Protect your eyes</p>
                    <h1>UPTO 50% OFF</h1>
                    <a href="/" className="btn fadeIn">Shop now</a>
                </div>
            </div>
            <div className={`slider ${type === 3 && 'active'}`}>
                <img src={images.slide1} alt='slider'/>
                <div>
                    <p>Protect your eyes</p>
                    <h1>UPTO 50% OFF</h1>
                    <a href="/" className="btn fadeIn">Shop now</a>
                </div>
            </div>
            <ul className="navs">
                <li onClick={() => {
                    if(type === 1){
                        return setType(3)
                    }
                    setType(type - 1)
                }}><i className="fa fa-chevron-left"></i></li>
                <li onClick={() => {
                    if(type === 3){
                        return setType(1)
                    }
                    setType(type + 1)
                }}><i className="fa fa-chevron-right"></i></li>
            </ul>
        </div>
    )
}

export default Slider