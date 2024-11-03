import React, { useContext, useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillDelete, AiFillShopping } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { firestore } from '../../../config/Firebase';
import { Image } from 'antd';
import { useAuthContext } from '../../../contexts/AuthContext';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { OrderContext } from '../../../contexts/OrderContext';


const timestamp = new Date().getTime();

function DashboardTab() {
    const { allorder } = useContext(OrderContext)
    const { userDocuments } = useContext(OrderContext)
    const [documents, setDocuments] = useState([])
    const { setData } = useAuthContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [item, setItem] = useState({})
    const fetchData = async () => {
        let array = []
        const querySnapshot = await getDocs(collection(firestore, "products"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            array.push(data)
            // doc.data() is never undefined for query doc snapshots
            // console.log("data", data);
        });
        setDocuments(array)
        setData(array)
    }
    useEffect(() => {
        fetchData()
    }, [])

    //Delete
    const handleDelete = async (product) => {
        setIsProcessing(true)
        try {
            await deleteDoc(doc(firestore, "products", product.id));
            let newItem = documents.filter((doc) => {
                return doc.id !== product.id
            })
            setIsProcessing(false)
            setDocuments(newItem)
            setData(newItem)
        } catch (error) {
            console.error(error)
            setIsProcessing(false)
        }
    }

    // Edit 
    const handleSave = async () => {
        // setIsLoading(true)
        let newItem = { ...item, dateModified: dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss') }
        try {
            await setDoc(doc(firestore, "products", newItem.id), newItem, { merge: true });
            let newDocument = documents.map((doc) => {
                if (doc.id === item.id)
                    return item
                return doc
            })
            setDocuments(newDocument)
            setData(newDocument)
            // setIsLoading(false)
            toast.success("Product has been successfully Updated")
        } catch (error) {
            console.error(error)
            // setIsLoading(false)
            toast.error("Something went wrong while update")
        }

    }
    const formatTimestamp = (timestamp) => {
        if (timestamp && timestamp.seconds) {
            const date = new Date(timestamp.seconds * 1000);
            return date.toLocaleString(); // Adjust formatting as needed
        }
        return null; // Return null or a default value if not valid
    };

    return (
        <>
            <div className="container mx-auto my-5">
                <div className="tab container mx-auto">
                    <Tabs defaultIndex={0}>
                        <TabList className="d-flex justify-content-center mb-4" style={{ listStyle: 'none' }}>
                            <Tab>
                                <button
                                    type="button"
                                    className="btn btn-outline-purple btn-outline-success btn-lg border rounded-lg text-xl mx-2">
                                    <div className="d-flex align-items-center">
                                        <MdOutlineProductionQuantityLimits /> Products
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button
                                    type="button"
                                    className="btn btn-outline-pink btn-outline-danger btn-lg border rounded-lg text-xl mx-2">
                                    <div className="d-flex align-items-center">
                                        <AiFillShopping /> Orders
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button
                                    type="button"
                                    className="btn btn-outline-green rounded-lg text-xl mx-2 btn-outline-success btn-lg border">
                                    <div className="d-flex align-items-center">
                                        <FaUser /> Users
                                    </div>
                                </button>
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <div className='mb-4'>
                                <h1 className='text-center mb-5 text-3xl font-semibold underline'>Product Details</h1>
                                <div className="d-flex justify-content-end my-2">
                                    <Link to="/addproducts"
                                        type="button"
                                        className="btn btn-danger">
                                        <div className="d-flex align-items-center">
                                            Add Product <FaCartPlus size={20} />
                                        </div>
                                    </Link>
                                </div>
                                <div className="table-responsive">
                                    <table className="table text-sm">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Date Created</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {documents.map((product, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td> <Image className='w-16 rounded-circle' src={product.url} alt="img" style={{ width: 40, height: 40 }} /></td>
                                                    <td>{product.title}</td>
                                                    <td>${product.price}</td>
                                                    <td>{product.category}</td>
                                                    <td>{product.dateCreated}</td>
                                                    <td>
                                                        <button style={{ border: "none", backgroundColor: "white" }} disabled={isProcessing}>
                                                            {!isProcessing
                                                                ? <AiFillDelete className='mx-1 primary-hover' size={24} style={{ cursor: 'pointer', color: 'black' }} onClick={() => handleDelete(product)} />
                                                                : <div className='spinner-grow spinner-grow-sm'></div>}
                                                        </button>
                                                        <button style={{ border: "none", backgroundColor: "white" }} disabled={isProcessing}>
                                                            {!isProcessing
                                                                ? <BiEdit className='primary-hover' size={24} style={{ cursor: 'pointer', color: 'black' }} data-bs-toggle='modal' data-bs-target='#exampleModalEdit' onClick={() => setItem(product)} />
                                                                : <div className='spinner-grow spinner-grow-sm'></div>}
                                                        </button>

                                                    </td>
                                                </tr>
                                            ))}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="table-responsive mb-4">
                                <h1 className='text-center mb-5 text-3xl font-semibold underline'>Order Details</h1>
                                <table className="table text-sm">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Category</th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Phone Number</th>
                                            <th>Email</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allorder.map((item) => (
                                            item.cartItems.map((cartItem, j) => (
                                                <tr key={j}>
                                                    <td>
                                                        <Image className='w-16 rounded-circle' src={cartItem.url} alt="img" style={{ width: 40, height: 40 }} />
                                                    </td>
                                                    <td>{cartItem.title}</td>
                                                    <td>${cartItem.price}</td>
                                                    <td>{cartItem.category}</td>
                                                    <td>{item.addressInfo.fullName}</td>
                                                    <td>{item.addressInfo.address}</td>
                                                    <td>{item.addressInfo.mobileNumber}</td>
                                                    <td>{item.userEmail}</td>
                                                    <td>{item.date}</td>
                                                </tr>
                                            ))
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="table-responsive mb-4">
                                <h1 className='text-center mb-5 text-3xl font-semibold underline'>User Details</h1>
                                <table className="table text-sm">
                                    <thead className="table-light">
                                        <tr>
                                            <th>S.No</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>User-Id</th>
                                            <th>Date Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userDocuments.map((user , i)=>(
                                            <tr key={i}>
                                            <th>{i + 1}</th>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.uid}</td>
                                            <td>{formatTimestamp(user.date)}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
            {/* Edit  */}
            {/* Edit Model */}
            <div className="modal fade" id="exampleModalEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Product</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" placeholder='Type Your Title' className='form-control my-3' name='title'
                                value={item.title || ''} onChange={(e) => setItem({ ...item, title: e.target.value })}
                            />
                            <input type="text" placeholder='Enter Your Item Price' className='form-control my-3' name='price'
                                value={item.price || ''} onChange={(e) => setItem({ ...item, price: e.target.value })}
                            />
                            <input type="text" placeholder='Enter Your Item Url' className='form-control my-3' name='url'
                                value={item.url || ''} onChange={(e) => setItem({ ...item, url: e.target.value })}
                            />
                            <input type="text" placeholder='Enter Your Item Category' className='form-control my-3' name='category'
                                value={item.category || ''} onChange={(e) => setItem({ ...item, category: e.target.value })}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSave}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardTab;

