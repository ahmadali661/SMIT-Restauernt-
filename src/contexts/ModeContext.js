// import { collection, getDocs, query, where } from 'firebase/firestore';
// import React, { createContext, useEffect, useState } from 'react';
// import { firestore } from '../config/Firebase';

// export const ModeContext = createContext();

// export default function ModeContextProvider({ children }) {
//     const [searchKey, setSearchKey] = useState("");
//     const [filterType, setFilterType] = useState("");
//     const [filterPrice, setFilterPrice] = useState("");
//     const [isAppLoading, setIsAppLoading] = useState(true);
//     const [wishlistProducts, setWishlistProducts] = useState([]);
//     const [mode, setMode] = useState('light');

//     const user = JSON.parse(localStorage.getItem("user"));

//     useEffect(() => {
//         setTimeout(() => {
//             setIsAppLoading(false);
//         }, 3000);
//     }, []);

//     const toggleMode = () => {
//         setMode(prevMode => {
//             const newMode = prevMode === 'light' ? 'dark' : 'light';
//             document.body.style.backgroundColor = newMode === 'dark' ? 'rgb(17, 24, 39)' : 'white';
//             return newMode;
//         });
//     };

//     useEffect(() => {
//         const fetchWishlistProducts = async () => {
//             if (!user || !user.uid) {
//                 console.log("No user logged in or user ID not found");
//                 return; // Exit if no user is logged in
//             }

//             try {
//                 const productsArray = [];
//                 const productsRef = collection(firestore, "wishlists");
//                 const q = query(productsRef, where("uid", "==", user.uid));

//                 const querySnapshot = await getDocs(q);
//                 querySnapshot.forEach((doc) => {
//                     productsArray.push({ id: doc.id, ...doc.data() });
//                 });

//                 setWishlistProducts(productsArray);
//             } catch (error) {
//                 console.error("Error fetching wishlist products:", error);
//             }
//         };

//         fetchWishlistProducts(); // Fetch products when component mounts
//     }, [user]);

//     return (
//         <ModeContext.Provider value={{
//             mode, toggleMode, isAppLoading, setIsAppLoading,
//             searchKey, setSearchKey, filterType, setFilterType,
//             filterPrice, setFilterPrice, wishlistProducts
//         }}>
//             {children}
//         </ModeContext.Provider>
//     );
// }



import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { firestore } from '../config/Firebase';

export const ModeContext = createContext();

export default function ModeContextProvider({ children }) {
    const [searchKey, setSearchKey] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterPrice, setFilterPrice] = useState("");
    const [isAppLoading, setIsAppLoading] = useState(true);
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [mode, setMode] = useState('light');

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        setTimeout(() => {
            setIsAppLoading(false);
        }, 3000);
    }, []);

    const toggleMode = () => {
        setMode(prevMode => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            document.body.style.backgroundColor = newMode === 'dark' ? 'rgb(17, 24, 39)' : 'white';
            return newMode;
        });
    };

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            if (!user || !user.uid) {
                console.log("No user logged in or user ID not found");
                return;
            }

            try {
                const productsArray = [];
                const productsRef = collection(firestore, "wishlists");
                const q = query(productsRef, where("uid", "==", user.uid));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    productsArray.push({ id: doc.id, ...doc.data() });
                });

                setWishlistProducts(productsArray);
            } catch (error) {
                console.error("Error fetching wishlist products:", error);
            }
        };

        fetchWishlistProducts();
    }, [user]);

    return (
        <ModeContext.Provider value={{
            mode, toggleMode, isAppLoading, setIsAppLoading,
            searchKey, setSearchKey, filterType, setFilterType,
            filterPrice, setFilterPrice, wishlistProducts
        }}>
            {children}
        </ModeContext.Provider>
    );
}

