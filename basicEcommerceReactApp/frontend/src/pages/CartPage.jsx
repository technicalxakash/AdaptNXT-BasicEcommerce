import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CartPage = () => {
    const { token } = useContext(AuthContext);
    const [cart, setCart] = useState({ items: [], total: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8080/user/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data && Array.isArray(res.data.items)) {
                setCart(res.data);
            } else {
                setCart({ items: [], total: 0 });
            }
            setError(null);
        } catch (err) {
            console.error("Failed to fetch cart", err);
            setError("Failed to load cart.");
            setCart({ items: [], total: 0 });
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            await axios.patch(
                "http://localhost:8080/user/cart/update",
                { productId, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchCart();
        } catch (err) {
            console.error("Failed to update cart", err);
        }
    };

    const removeItem = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/user/cart/remove/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCart();
        } catch (err) {
            console.error("Failed to remove item", err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {cart.items.map((item) => (
                        <div
                            key={item.productId}
                            className="flex items-center justify-between border p-4 rounded shadow"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={"https://via.placeholder.com/80"}
                                    alt={item.productName}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div>
                                    <p className="font-semibold">{item.productName}</p>
                                    <p className="text-sm">₹{item.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="px-2 py-1 bg-gray-300 rounded"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                    className="px-2 py-1 bg-gray-300 rounded"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => removeItem(item.productId)}
                                    className="ml-4 px-3 py-1 text-white bg-red-500 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="text-right mt-6 text-xl font-semibold">
                        Total: ₹{cart.total.toFixed(2)}
                    </div>
                    <div className="text-right">
                        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">
                            Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;