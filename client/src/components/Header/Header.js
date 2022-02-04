import { Link } from "react-router-dom";
import images from "../../glass_img";
import { useReactiveVar, useQuery } from "@apollo/client";
import { CartLength } from '../../Apollo/reactiveVariables/Cart'
import { UserVar, UserFunc } from '../../Apollo/reactiveVariables/User'
import { ToggleFunc } from '../../Apollo/reactiveVariables/Toggle'
import { GET_USER } from '../../Apollo/Operations/queries'
import { useState } from 'react'
import './header.css'

function Header(){
    const [active, setActive] = useState('')
    const user = useReactiveVar(UserVar)
    const cart = useReactiveVar(CartLength)
    const token = localStorage.getItem('Token');

    const {data, loading} = useQuery(GET_USER, {
        context:{
            headers:{
                authToken:  token
            }
        },
        onCompleted: (data) => {
            console.log(data)
            UserFunc({type: 'LOAD_USER', data: data.getUser})
        }
    })
    
    return(
        <>
            <header>
                <div>
                    <img src={images.icon2} alt="logo" />
                </div>
                <div className="">
                    <ul className={`${active}`}>
                        <li onClick={() => setActive('')}><Link to="/">Home</Link></li>
                        <li onClick={() => setActive('')}><Link to="/products">Products</Link></li>
                        <li className="dropdown"><a>Pages+</a>
                            <ul className="dropdownMenu">
                                <li onClick={() => setActive('')}><Link to="/about">About</Link></li>
                                <li onClick={() => setActive('')}><Link to="/blogs">blogs</Link></li>
                            </ul>
                        </li>
                        <li onClick={() => setActive('')}><Link to="upload">Upload</Link></li>
                        {
                            user[0]?.isLoggedIn ?
                            <li onClick={() => {
                                UserFunc({type: 'LOGOUT'})
                                setActive('')
                            }}><a>LogOut</a></li> :
                            <li className="dropdown"><a>Account+</a>
                                <ul className="dropdownMenu">
                                    <li onClick={() => setActive('')}><Link to="/login">Login</Link></li>
                                    <li onClick={() => setActive('')}><Link to="/sign-up">Register</Link></li>
                                </ul>
                            </li>
                        }
                    </ul>
                    <div className="icons">
                        <i className="fa fa-bars" onClick={() => active === ''? setActive('active'): setActive('')}></i>
                        <i className="fa fa-search" onClick={() => ToggleFunc({type: 'OPEN_SEARCH_PAGE'})}></i>
                        <Link className={`cartIcon ${user[0]?.isLoggedIn && "active"}`} data-num={cart.length} to={user[0]?.isLoggedIn ?"/cart": "/login"}><i className="fa fa-shopping-cart"></i></Link>
                    </div>
                </div>
            </header>
            {active === 'active' && <div className='overlayer' onClick={() => setActive('')}></div>}
        </>
    )
}

export default Header