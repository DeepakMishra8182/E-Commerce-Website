// import React, { useContext, useState } from "react";
// import "./Navbar.css";
// import logo from "../Assets/logo.png";
// import cart_icon from "../Assets/cart_icon.png";
// import { Link } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";

// const Navbar = () => {
//   const [menu, setMenu] = useState("shop");
//   const {getTotalCartItems}=useContext(ShopContext)

//   return (
//     <div className="navbar">
//       <div className="nav-logo">
//         <img src={logo} alt="" />
//         <p>E-Commerce</p>
//       </div>
//       <ul className="nav-menu">
//         <li onClick={()=>{setMenu("shop")}}> <Link to='/' style={{textDecoration:'none'}}>Shop</Link>  {menu==="shop" ? <hr/>:<></>}</li>
//         <li onClick={()=>{setMenu("mens")}}><Link to='/mens' style={{textDecoration:'none'}}>Men</Link>  {menu==="mens" ? <hr/>:<></>}</li>
//         <li onClick={()=>{setMenu("womens")}}><Link to='/womens' style={{textDecoration:'none'}}> Women</Link> {menu==="womens" ? <hr/>:<></>}</li>
//         <li onClick={()=>{setMenu("kids")}}><Link to='/kids' style={{textDecoration:'none'}}>Kids</Link>  {menu==="kids" ? <hr/>:<></>}</li>
//       </ul>
//       <div className="nav-login-cart">
//         <Link to='/login'> <button>Login</button></Link>
//        <Link to='/cart'><img src={cart_icon} alt="" /></Link> 
//         <div className="nav-cart-count">{getTotalCartItems()}</div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);

  const handleLinkClick = (section) => {
    setMenu(section);
    setMobileMenuOpen(false); // close mobile menu after click
  };

  return (
    <div className="navbar">
      <div className="nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        ☰
      </div>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>E-Commerce</p>
      </div>
      <ul className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
        <li onClick={() => handleLinkClick("shop")}>
          <Link to="/" style={{ textDecoration: "none" }}>Shop</Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => handleLinkClick("mens")}>
          <Link to="/mens" style={{ textDecoration: "none" }}>Men</Link>
          {menu === "mens" && <hr />}
        </li>
        <li onClick={() => handleLinkClick("womens")}>
          <Link to="/womens" style={{ textDecoration: "none" }}>Women</Link>
          {menu === "womens" && <hr />}
        </li>
        <li onClick={() => handleLinkClick("kids")}>
          <Link to="/kids" style={{ textDecoration: "none" }}>Kids</Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<Link to="/login">
          <button>Login</button>
        </Link>}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
