import React from "react"
import { Link } from "react-router-dom"
const year = new Date().getFullYear()
const Footer = () => <footer className="page-footer font-small blue pt-4 bg-primary text-brown pt-5">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Category</h5>
                <ul className="list-unstyled">
                    <li><Link to="/" style={{textDecoration:"none",color:"brown"}}>Home</Link></li>
                    <li><Link to="/order" style={{textDecoration:"none",color:"brown"}}>Order</Link></li>
                    <li><Link to="/cart" style={{textDecoration:"none",color:"brown"}}>Cart</Link></li>
                    <li><Link to="/" style={{textDecoration:"none",color:"brown"}}>Local For Vocal</Link></li>
                </ul>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Customer Service</h5>
                <ul className="list-unstyled">
                    <li><Link style={{textDecoration:"none",color:"brown"}}>Privacy Policy</Link></li>
                    
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© {year}. All Rights Reserved by Khan's Kitchen.
    </div>

</footer>

export default Footer
