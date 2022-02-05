import { NavLink, Route, Routes } from 'react-router-dom'
import images from '../../../glass_img'
import Dashboard from './Dashboard/Dashboard'
import './index.css'

function VendorPage(){
    return(
        <div className='vendor-page'>
            <div className='side-bar'>
                <div className='logo'>
                    <img src={images.icon2} alt="logo" />
                </div>
                <ul>
                    <li><NavLink to=''>Dashboard</NavLink></li>
                    <li><NavLink to='customers'>Customers</NavLink></li>
                    <li><NavLink to='products'>Products</NavLink></li>
                    <li><NavLink to='orders'>Orders</NavLink></li>
                    <li><NavLink to='upload'>Upload</NavLink></li>
                </ul>
            </div>
            <div>
                <div className='header'>
                    <div className='searchv'>
                        <input type='text' placeholder='Search Here...' />
                        <i className="far fa-search"></i>
                    </div>
                    <div className='icons'>
                        <i className="far fa-bell"></i>
                        <i className="far fa-plus"></i>
                    </div>
                </div>
                <Routes>
                    <Route path=''element={<Dashboard />}/>
                </Routes>
            </div>
        </div>
    )
}

export default VendorPage