// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from '../components/Header';
// import Footer from "../components/Footer.jsx";
// import { Link } from 'react-router-dom';
//
// const Home = () => {
//     const [products, setProducts] = useState([]);
//
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         axios.get('http://localhost:8080/user/home', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//             .then((res) => {
//                 console.log(res.data);
//                 setProducts(res.data)})
//             .catch((err) => console.error('Failed to fetch products', err));
//     }, []);
//
//     return (
//         <div className="bg-gray-100 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <h1 className="text-3xl font-bold mb-6 text-center">Shop Now</h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {products.map((product) => (
//                         <Link to={`/product/${product.id}`} key={product.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition block">
//                             {product.images && product.images.length > 0 ? (
//                                 <img
//                                     src={product.images[0].url || 'https://m.media-amazon.com/images/I/81OUC3HhW1L._SL1500_.jpg'}
//                                     alt={product.name}
//                                     className="w-full h-48 object-cover mb-4 rounded"
//                                 />
//                             ) : (
//                                 <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded mb-4">
//                                     <span>No Image</span>
//                                 </div>
//                             )}
//                             <h2 className="text-xl font-semibold">{product.name}</h2>
//                             <p className="text-gray-600">{product.description}</p>
//                             <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Home;




import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { token } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/user/home", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setProducts(res.data))
            .catch(err => console.error("Failed to load products", err));
    }, [token]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Recommended Products</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => navigate(`/user/product/${product.id}`)}
                        className="cursor-pointer border rounded shadow hover:shadow-lg p-4 bg-white transition"
                    >
                        <img
                            src={product.images?.[0]?.url || "https://via.placeholder.com/150"}
                            alt={product.name}
                            className="w-full h-40 object-contain mb-2"
                        />
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-600 text-sm truncate">{product.description}</p>
                        <p className="text-green-700 font-bold mt-2">₹{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

