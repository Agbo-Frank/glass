import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home/Home.js'
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer'
import About from './components/pages/About/About'
import Products from './components/pages/Products/Products'
import Product from './components/pages/Product/Product'
import './index.css'
import { useReactiveVar } from '@apollo/client'
import { UserVar } from './Apollo/reactiveVariables/User'
import Blogs from './components/pages/Blogs/Blog.js'
import Login from './components/pages/Auth/Login.js'
import SignUp from './components/pages/Auth/SignUp.js'
import Carts from './components/pages/Cart/Cart.js'
// import Upload from './components/pages/Vendor/Upload/upload'
import { Alert2 } from './components/Alert/Alert'
import Search from './components/Search/Search.js'
import VendorPage from './components/pages/Vendor'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import "swiper/css/bundle";


function App() {
  const user = useReactiveVar(UserVar)
  
  return (
    <div className="App">
      <Header/>
      <Search />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/products" element={<Products />}/>
        <Route exact path="/product/:id" element={<Product />}/>
        <Route exact path="/about" element={<About />}/>
        <Route exact path="/blogs" element={<Blogs />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/sign-up" element={<SignUp />}/>
        {user[0]?.isLoggedIn && <Route exact path="/cart" element={<Carts />}/>}
        {/* <Route exact path="/upload" element={<Upload />}/> */}
        <Route exact path="/vendor/*" element={<VendorPage />}/>
      </Routes> 
      <Footer />
      <Alert2 />
    </div>
  );
}

export default App;
