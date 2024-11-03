import React, { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../config/Firebase';

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
    const [order, setOrder] = useState([]);
    const [userDocuments, setUserDocuments] = useState([]);
    const [allorder, setAllOrder] = useState([]);
    const [loading, setLoading] = useState(false);

    // Memoize user to prevent unnecessary re-renders
    const user = useMemo(() => {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null; // Safeguard against null
    }, []);

    const getOrderData = useCallback(async () => {
        if (!user || !user.uid) return; // Exit if no user is logged in

        setLoading(true);
        try {
            const ordersArray = [];
            const ordersRef = collection(firestore, "orders");
            const q = query(ordersRef, where("userid", "==", user.uid)); // Adjusted field name

            let result = await getDocs(q);
            result.forEach((doc) => {
                ordersArray.push({ id: doc.id, ...doc.data() }); // Include document ID for keying
            });
            setOrder(ordersArray);
            console.log(ordersArray); // Log orders array
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        getOrderData(); // Fetch orders when the component mounts
    }, [getOrderData]);


    const getAllOrderData = useCallback(async () => {
        setLoading(true);
        try {
            const allOrdersArray = [];
            const ordersRef = collection(firestore, "orders");
            
            // No query condition to fetch all orders
            const result = await getDocs(ordersRef);
            
            result.forEach((doc) => {
                allOrdersArray.push({ id: doc.id, ...doc.data() }); // Include document ID for keying
            });
            
            setAllOrder(allOrdersArray);
            console.log(allOrdersArray); // Log orders array
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    }, []); // Removed user dependency
    
    useEffect(() => {
        getAllOrderData(); // Fetch orders when the component mounts
    }, [getAllOrderData]);

    const fetchUsers = async () => {
        const array = [];
        const querySnapshot = await getDocs(collection(firestore, "users"));
        querySnapshot.forEach((doc) => {
            array.push(doc.data());
        });
        setUserDocuments(array);
        // setUserData(array);
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    

    return (
        <OrderContext.Provider value={{ loading, order, getOrderData , allorder,userDocuments }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContextProvider;
