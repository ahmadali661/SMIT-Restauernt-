import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Firebase';
import { ModeContext } from '../contexts/ModeContext';

export default function Navbar() {
    const { isAuthenticated, dispatch } = useAuthContext();
    const { state: cartItems } = useCart();
    const { wishlistProducts } = useContext(ModeContext);
    const admin = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "SET_LOGGED_OUT" });
                toast.error("Logout successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <nav className="navbar navbar-expand-lg bg-primary navbar-light" style={{ boxShadow: "1px 1px 10px black" }}>
            <div className="container">
                <Link to="/" className="navbar-brand" style={{ color: "#99582a", fontSize: 23, fontWeight: 'bold' }}>Khan's Kitchen</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to="/" className="nav-link active mx-2">Home</Link></li>
                        {/* <li className="nav-item">{admin && admin.email === "admin@gmail.com" ? <Link to="/admin" className="nav-link active mx-2">Admin</Link> : null}</li> */}
                        <li className="nav-item">{isAuthenticated ? <Link to="/allProducts" className="nav-link active mx-2">All Products</Link> : null}</li>
                        <li className="nav-item">{isAuthenticated ? <Link to="/order" className="nav-link active mx-2">Order</Link> : null}</li>
                    </ul>
                    
                    <sup style={{ fontSize: 20, color: "green", fontWeight: "bold" }}>{cartItems.length}</sup>
                    <Link to="/cart"><i className='fa fa-shopping-cart' style={{ fontSize: 25, color: "black", marginRight: "30px" }}></i></Link>
                    <sup style={{ fontSize: 20, color: "green", fontWeight: "bold" }}>{wishlistProducts.length}</sup>
                    <Link to="/wishlist"><i className='fa fa-heart-o' style={{ fontSize: 25, color: "black", marginRight: "30px" }}></i></Link>
                    {admin && admin.email === "admin@gmail.com" ?<button className='btn btn-outline-success'> <Link to="/admin" className="nav-link active mx-2">Admin</Link></button> : null}
                    &nbsp;
                    {!isAuthenticated ? <Link to="/auth/login" className="btn btn-dark">Login</Link> : <button className="btn btn-danger" onClick={handleLogout}>Logout</button>} 
                </div>
            </div>
        </nav>
    );
}

