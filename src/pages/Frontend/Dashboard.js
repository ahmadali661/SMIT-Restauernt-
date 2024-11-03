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
    const { mode } = context;

    const tableStyle = {
        backgroundColor: mode === 'dark' ? 'rgb(46, 49, 55)' : 'white',
        color: mode === 'dark' ? 'white' : 'black',
    };

    const headerStyle = {
        backgroundColor: mode === 'dark' ? 'rgb(75, 75, 75)' : 'rgba(229, 229, 229, 1)',
        color: mode === 'dark' ? 'white' : 'black',
    };

    const textStyle = {
        color: mode === 'dark' ? 'white' : '#6b5baf',
    };

    return (
        <section className="text-gray-600 body-font mt-10 mb-10">
            <div className="container px-5 mx-auto mb-10">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse w-100 mt-5" style={tableStyle}>
                        <thead>
                            <tr style={headerStyle}>
                                <th className="px-4 py-2 text-left border-b">Icon</th>
                                <th className="px-4 py-2 text-left border-b">Count</th>
                                <th className="px-4 py-2 text-left border-b">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 border-b">
                                    <FaUserTie size={30} />
                                </td>
                                <td className="px-4 py-2 border-b" style={textStyle}>{data.length}</td>
                                <td className="px-4 py-2 border-b" style={textStyle}>Total Products</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b">
                                    <FaUserTie size={30} />
                                </td>
                                <td className="px-4 py-2 border-b" style={textStyle}>{allorder.length}</td>
                                <td className="px-4 py-2 border-b" style={textStyle}>Total Orders</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b">
                                    <FaUserTie size={30} />
                                </td>
                                <td className="px-4 py-2 border-b" style={textStyle}>{userDocuments.length}</td>
                                <td className="px-4 py-2 border-b" style={textStyle}>Total Users</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <DashboardTab />
        </section>
    );
}

export default Dashboard;
