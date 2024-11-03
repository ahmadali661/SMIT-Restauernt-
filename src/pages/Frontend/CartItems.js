import React, { useState } from 'react';
import { Image } from 'antd';
import { useCart } from '../../contexts/CartContext';
import { AiFillDelete } from 'react-icons/ai';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../config/Firebase';
import { toast } from 'react-toastify';

export default function CartItems() {
    const { state: cartItems, dispatch } = useCart();
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [loading, setLoading] = useState(false); // Loader state

    const handleDelete = async (item) => {
        try {
            const itemDocRef = doc(firestore, "carts", item.id);
            await deleteDoc(itemDocRef);
            dispatch({ type: 'DELETE_TO_CART', payload: item });
            toast.success("Item deleted from cart successfully");
        } catch (error) {
            console.error("Error removing document: ", error);
            toast.error("Failed to remove item from cart");
        }
    };

    const handleIncrease = (item) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: item });
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            dispatch({ type: 'DECREASE_QUANTITY', payload: item });
        } else {
            handleDelete(item); // Optionally remove item if quantity is 1
        }
    };

    const subtotal = cartItems.reduce((total, item) => {
        return total + (item.price * (item.quantity || 1));
    }, 0);
    const shipping = 20;
    const total = subtotal + shipping;

    const buyNow = async () => {
        if (!fullName || !address || !pinCode || !mobileNumber) {
            return toast.error("All fields are required", {
                position: "top-center",
                autoClose: 1000,
                theme: "colored",
            });
        }

        const user = JSON.parse(localStorage.getItem("user")); // Make sure this is defined here
        if (!user || !user.uid) {
            return toast.error("User not logged in.");
        }

        const addressInfo = {
            fullName,
            address,
            pinCode,
            mobileNumber,
            id: Math.random().toString(36).slice(2),
            date: new Date().toLocaleString("en-US"),
        };

        const orderInfo = {
            cartItems,
            addressInfo,
            date: addressInfo.date,
            userid: user.uid,
            userEmail: user.email,
        };

        setLoading(true); // Set loading to true

        try {
            await setDoc(doc(firestore, "orders", addressInfo.id), orderInfo); // Use addressInfo.id for uniqueness
            toast.success("Congratulation your order placed successfully");
        } catch (error) {
            console.error("Error saving order:", error);
            toast.error("Failed to place order");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="container my-4">
            <h1 className='text-center mb-5'>Cart Items</h1>

            <div className="card p-3 mb-4" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <div className="row">
                    <div className="col-6">
                        <p>Subtotal</p>
                        <p>Shipping</p>
                    </div>
                    <div className="col-6">
                        <p>${subtotal}</p>
                        <p>${shipping}</p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-6">
                        <h5>Total</h5>
                    </div>
                    <div className="col-6">
                        <h5>${total.toFixed(2)}</h5>
                    </div>
                </div>
                <div className="row text-center mt-3">
                    <div className="col-12 text-center">
                        <button type="button" className="btn btn-primary" style={{ width: 200 }} data-bs-toggle="modal" data-bs-target="#exampleModalEdit">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Processing your order...</p>
                </div>
            )}

            {cartItems.length === 0 ? (
                <h5 className='text-center'>Your cart is empty.</h5>
            ) : (
                cartItems.map((item) => (
                    <div className="card py-3 px-3 mb-3" key={item.id} style={{ position: 'relative', boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px", borderRadius: '0.5rem' }}>
                        <div className="d-flex align-items-start">
                            <div>
                                <Image src={item.url} alt={item.title} className="img-fluid rounded-circle" style={{ height: 120, width: 120, objectFit: 'cover' }} />
                            </div>
                            <div className="mx-3">
                                <h5 className="mb-1" style={{ fontSize: '1.25rem' }}>{item.title}</h5>
                                <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>{item.category}</p>
                                <p className="mb-1" style={{ fontSize: '0.9rem' }}>{item.description}</p>
                                <p className="mb-0" style={{ fontWeight: 'bold' }}>${item.price} * {item.quantity || 1}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className="d-flex align-items-center">
                                <button className="btn btn-sm btn-secondary" onClick={() => handleDecrease(item)}>-</button>
                                <span className="mx-2">{item.quantity || 1}</span>
                                <button className="btn btn-sm btn-secondary" onClick={() => handleIncrease(item)}>+</button>
                            </div>
                            <AiFillDelete
                                onClick={() => handleDelete(item)}
                                style={{
                                    cursor: 'pointer',
                                    color: 'red',
                                    transition: 'color 0.2s'
                                }}
                                size={24}
                                onMouseOver={(e) => (e.currentTarget.style.color = 'darkred')}
                                onMouseOut={(e) => (e.currentTarget.style.color = 'red')}
                            />
                        </div>
                    </div>

                ))
            )}
            {/* Modal for Order */}
            <div className="modal fade" id="exampleModalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Order Your Product</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="fullName">Enter Full Name*</label>
                            <input type="text" id='fullName' className='form-control mb-3 mt-1' name='fullName' value={fullName}
                                onChange={(e) => setFullName(e.target.value)} />
                            <label htmlFor="fullAddress">Enter Full Address*</label>
                            <input type="text" id='fullAddress' className='form-control mb-3 mt-1' name='address' value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                            <label htmlFor="pincode">Enter Your PinCode*</label>
                            <input type="number" id='pincode' className='form-control mb-3 mt-1' name='pinCode' value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)} />
                            <label htmlFor="mobile">Enter Mobile Number*</label>
                            <input type="number" id='mobile' className='form-control mb-3 mt-1' name='mobileNumber' value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={buyNow}>Order Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
