import './title.css'
import { Link } from 'react-router-dom'


function Title({title, location}){
    return(
        <div className="title">
            <h2>{title}</h2>
            <p>
                <Link to="/">Home</Link>
                <i class="fa fa-angle-double-right" ></i>
                <Link to={`/${location}`}>{location}</Link>
            </p>
        </div>
    )
}

export default Title