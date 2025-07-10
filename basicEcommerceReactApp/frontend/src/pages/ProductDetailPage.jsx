import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const { updateCartCount, refreshCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/user/product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProduct(res.data);
                console.log(res.data);
            } catch (err) {
                console.error("Failed to fetch product", err);
            }
        };

        fetchProduct();
    }, [id, token]);

    const handleAddToCart = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/user/cart/add",
                {
                    productId: product.id,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success("Product added to cart!");
            if (typeof updateCartCount === "function") updateCartCount();
            if (typeof refreshCart === "function") refreshCart();
        } catch (error) {
            console.error("Failed to add to cart", error);
            toast.error("Failed to add product to cart.");
        }
    };

    if (!product) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-lg mt-6">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex justify-center">
                    <img
                        src={product.images?.[0]?.url || "https://via.placeholder.com/300"}
                        alt={product.name}
                        className="w-80 h-80 object-contain rounded-lg border border-gray-200 hover:shadow-md transition"
                    />
                </div>
                <div className="flex-1 space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                    <p className="text-gray-600 text-lg">{product.description}</p>
                    <p className="text-xl font-semibold text-green-600">₹{product.price}</p>
                    <p className="text-gray-700">In stock: {product.stockQuantity}</p>
                    <button
                        onClick={handleAddToCart}
                        className="mt-4 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-lg transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;