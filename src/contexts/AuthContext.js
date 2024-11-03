import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { auth } from '../config/Firebase';

const AuthContext = createContext();
const initialState = { isAuthenticated: false, user: null }; // Set user to null

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGGED_IN":
            return { isAuthenticated: true, user: payload.user };
        case "SET_LOGGED_OUT":
            return initialState;
        default:
            return state;
    }
};

export default function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [data , setData] = useState([])
    const {userData,setUserData} = useState([])
    const [user , setUser] = useState([])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: "SET_LOGGED_IN", payload: { user } });
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                dispatch({ type: "SET_LOGGED_OUT" });
                localStorage.removeItem("user"); // Clear user from local storage
            }
        });

        return () => unsubscribe(); // Clean up the subscription
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch , data , setData , user , setUser,userData,setUserData }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);

