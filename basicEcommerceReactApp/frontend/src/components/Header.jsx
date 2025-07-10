// // components/Header.jsx
// import React from "react";
// import { useAuth } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
//
// const Header = () => {
//     const { isLoggedIn, logout, role } = useAuth();
//     const navigate = useNavigate();
//
//     const handleLogout = () => {
//         logout();
//         navigate("/login");
//     };
//
//     return (
//         <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
//             <h1 className="text-xl font-bold">🛒 BasicEcom</h1>
//
//             {isLoggedIn && (
//                 <nav className="flex gap-4">
//                     <Link to="/user/home" className="hover:underline">Home</Link>
//                     <Link to="/user/profile" className="hover:underline">Profile</Link>
//                     {role === "ADMIN" && <Link to="/admin/dashboard" className="hover:underline">Admin</Link>}
//                     <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
//                 </nav>
//             )}
//         </header>
//     );
// };
//
// export default Header;


import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Header = () => {
    const { token, isLoggedIn, logout } = useContext(AuthContext);
    const { cartItems, refreshCart } = useContext(CartContext);

    useEffect(() => {
        if (isLoggedIn) {
            refreshCart();
        }
    }, []);

    return (
        <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">ShopZone</Link>
            <nav className="flex gap-6 items-center">
                {isLoggedIn && (
                    <>
                        <Link to="/cart" className="relative">
                            <FaShoppingCart size={24} />
                            {cartItems?.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartItems?.length || 0}
                                </span>
                            )}
                        </Link>
                        <button onClick={logout} className="text-sm bg-white text-blue-600 px-3 py-1 rounded">Logout</button>
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;