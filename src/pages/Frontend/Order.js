import React, { useContext, useEffect } from 'react';
import { OrderContext } from '../../contexts/OrderContext';
import { Image, Spin } from 'antd';

const Order = () => {
    const { order, loading,  getOrderData } = useContext(OrderContext);
    useEffect(() => {
        const refreshPage = () => {
            getOrderData(); // Call the function to fetch order data
        };

        refreshPage();
    }, [getOrderData]); // Ensure it runs on component mount


    return (
        <div className="container my-5">
            <h1 className='text-center fw-bold my-2'>Your Order Products</h1>
            {loading ? (
                <div className="text-center">
                    <Spin size="large" /> {/* Loading spinner */}
                </div>
            ) : order.length > 0 ? ( // Check if there are orders
                <div className="row">
                    {order.map(orderItem => (
                        orderItem.cartItems.map(item => ( // Iterate over cartItems
                            <div className="col-12 col-md-6 col-lg-3 mt-4" key={item.id}>
                                <div className="card p-2">
                                    <Image 
                                        src={item.url} 
                                        alt={item.title} 
                                        className='img-fluid custom-image' 
                                        preview={false} 
                                        style={{ height: 200 }} 
                                    />
                                    <p className="mt-2 text-grey">AR Store</p>
                                    <h4 className="mt-1">{item.title || "No title available"}</h4>
                                    <h4 className="mt-1">{item.category || "No category available"}</h4>
                                    <p className='text-success fs-2'>${item.price}</p>
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            ) : (
                <div className="text-center my-4">
                    <h4>No orders available right now.</h4>
                </div>
            )}
        </div>
    );
};

export default Order;
