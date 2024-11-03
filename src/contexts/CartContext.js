import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, firestore } from '../config/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

const CartContext = createContext();
const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                return state.map(item =>
                    item.id === existingItem.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];
        case 'DELETE_TO_CART':
            deleteFromFirestore(action.payload.id);
            return state.filter(item => item.id !== action.payload.id);
        case 'INCREASE_QUANTITY':
            return state.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            );
        case 'DECREASE_QUANTITY':
            return state.map(item =>
                item.id === action.payload.id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        case 'LOAD_CART':
            return action.payload;
        default:
            return state;
    }
};

const deleteFromFirestore = async (id) => {
    try {
        await deleteDoc(doc(firestore, "carts", id));
        console.log(`Deleted item with id: ${id}`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};

export default function CartContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false); // Set loading to false once user state is confirmed
        });

        return () => unsubscribe(); // Cleanup subscription
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!currentUser) return; // Ensure user is logged in

            setLoading(true); // Start loading
            try {
                const q = query(collection(firestore, "carts"), where("uid", "==", currentUser.uid));
                const cartItemsSnapshot = await getDocs(q);
                const cartItems = cartItemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                dispatch({ type: 'LOAD_CART', payload: cartItems });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchCartItems();
    }, [currentUser]);

    return (
        <CartContext.Provider value={{ state, dispatch, currentUser, loading, error }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    return useContext(CartContext);
};
