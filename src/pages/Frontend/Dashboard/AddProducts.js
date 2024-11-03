import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { firestore } from '../../../config/Firebase';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const timestamp = new Date().getTime(); // Get the current timestamp

export default function AddProducts() {
    const [isProcessing, setIsProcessing] = useState(false);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(""); // Keep this as string for input
    const [url, setUrl] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!title) {
            toast.error("Enter Your Title");
            return;
        }
        if (!price || isNaN(price)) {
            toast.error("Enter a valid product price");
            return;
        }
        if (!url) {
            toast.error("Enter Your image URL");
            return;
        }
        if (!category) {
            toast.error("Enter Your product category");
            return;
        }
        if (!description) {
            toast.error("Enter Your product description");
            return;
        }
        setIsProcessing(true);

        // Convert price to number before creating the product object
        let product = {
            title,
            price: Number(price), // Ensure price is a number
            url,
            category,
            description,
            id: Math.random().toString(36).slice(2),
            dateCreated: dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
        };
        
        createDocument(product);
    };

    const createDocument = async (product) => {
        try {
            await setDoc(doc(firestore, "products", product.id), product);
            toast.success("A product has been successfully created");
            setIsProcessing(false);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while creating the product");
            setIsProcessing(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col d-flex justify-content-center align-items-center">
                    <div className="card p-3 text-center bg-primary text-white" style={{ width: 500 }}>
                        <form onSubmit={handleAddProduct}>
                            <h2 className='mb-4 text-dark'>Add New Product here</h2>
                            <div>
                                <input type="text" placeholder='Product Title' className='form-control my-4' name='title' value={title}
                                    onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <input type="number" placeholder='Product Price' className='form-control my-4' name='price' value={price}
                                    onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div>
                                <input type="text" placeholder='Product Image URL' className='form-control my-4' name='url' value={url}
                                    onChange={(e) => setUrl(e.target.value)} />
                            </div>
                            <div>
                                <input type="text" placeholder='Product Category' className='form-control my-4' name='category' value={category}
                                    onChange={(e) => setCategory(e.target.value)} />
                            </div>
                            <div>
                                <textarea type="text" placeholder='Product Description' className='form-control my-4' name='description' style={{ height: 150 }} value={description}
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <button className='btn btn-info w-100' disabled={isProcessing}>
                                {!isProcessing ? "Add Product" : <div className='spinner-grow spinner-grow-sm'></div>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

