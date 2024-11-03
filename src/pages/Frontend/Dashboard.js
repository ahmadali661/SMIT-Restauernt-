
import React, { useContext } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { ModeContext } from '../../contexts/ModeContext';
import DashboardTab from "././Dashboard/DashboardTab";
import { useAuthContext } from '../../contexts/AuthContext';
import { OrderContext } from '../../contexts/OrderContext';

function Dashboard() {
    
    const context = useContext(ModeContext);
    const { data } = useAuthContext();
    const { allorder } = useContext(OrderContext);
    const { userDocuments } = useContext(OrderContext);
    // const { setUserData } = useAuthContext();
    const { mode } = context;

    const cardStyle = {
        backgroundColor: mode === 'dark' ? 'rgb(46, 49, 55)' : 'rgba(229, 229, 229, 1)',
        color: mode === 'dark' ? 'white' : 'black',
        border: '2px solid #ccc',
        boxShadow: mode === 'dark' ? 'inset 0 0 10px rgba(0, 0, 0, 0.6)' : 'none',
        borderRadius: '0.75rem',
        padding: '1rem',
    };

    const textStyle = {
        color: mode === 'dark' ? 'white' : '#6b5baf',
    };

    return (
        <section className="text-gray-600 body-font mt-10 mb-10 mt-5">
            <div className="container px-5 mx-auto mb-10">
                <div className="row text-center">
                    <div className="col-md-4 col-sm-6 mb-4">
                        <div style={cardStyle}>
                            <div style={textStyle} className="mb-3">
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="font-weight-bold" style={textStyle}>{data.length}</h2>
                            <p className="font-weight-bold" style={textStyle}>Total Products</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                        <div style={cardStyle}>
                            <div style={textStyle} className="mb-3">
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="font-weight-bold" style={textStyle}>{allorder.length}</h2>
                            <p className="font-weight-bold" style={textStyle}>Total Orders</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                        <div style={cardStyle}>
                            <div style={textStyle} className="mb-3">
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="font-weight-bold" style={textStyle}>{userDocuments.length}</h2>
                            <p className="font-weight-bold" style={textStyle}>Total Users</p>
                        </div>
                    </div>
                    {/* <div className="col-md-3 col-sm-6 mb-4">
                        <div style={cardStyle}>
                            <div style={textStyle} className="mb-3">
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="font-weight-bold" style={textStyle}>18</h2>
                            <p className="font-weight-bold" style={textStyle}>Total Products</p>
                        </div>
                    </div> */}
                </div>
            </div>
            <DashboardTab />
        </section>
    );
}

export default Dashboard;
