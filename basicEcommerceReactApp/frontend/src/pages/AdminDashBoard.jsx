// import { useEffect, useState } from "react";
// import axios from "../utils/axiosInstance";
//
// const AdminDashboard = () => {
//     const [products, setProducts] = useState([]);
//     const [form, setForm] = useState({ name: "", description: "", price: "", stockQuantity: "" });
//
//     const fetchProducts = async () => {
//         try {
//             const res = await axios.get("/admin/product/get");
//             setProducts(res.data);
//         } catch (err) {
//             console.error("Failed to fetch products", err);
//         }
//     };
//
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`/admin/product/${id}`);
//             fetchProducts();
//         } catch (err) {
//             console.error("Delete failed", err);
//         }
//     };
//
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };
//
//     const handleAdd = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("/admin/product/add", form);
//             setForm({ name: "", description: "", price: "", stockQuantity: "" });
//             fetchProducts();
//         } catch (err) {
//             console.error("Add failed", err);
//         }
//     };
//
//     useEffect(() => {
//         fetchProducts();
//     }, []);
//
//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
//
//             {/* Add Product Form */}
//             <form onSubmit={handleAdd} className="bg-white p-4 rounded shadow mb-6 max-w-xl">
//                 <h2 className="text-lg font-semibold mb-2">Add Product</h2>
//                 <div className="grid grid-cols-2 gap-4">
//                     <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
//                     <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" required />
//                     <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" required />
//                     <input type="number" name="stockQuantity" value={form.stockQuantity} onChange={handleChange} placeholder="Stock" className="border p-2 rounded" required />
//                 </div>
//                 <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</button>
//             </form>
//
//             {/* Product Table */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white rounded shadow">
//                     <thead className="bg-gray-200">
//                     <tr>
//                         <th className="py-2 px-4">ID</th>
//                         <th className="py-2 px-4">Name</th>
//                         <th className="py-2 px-4">Price</th>
//                         <th className="py-2 px-4">Stock</th>
//                         <th className="py-2 px-4">Actions</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {products.map(p => (
//                         <tr key={p.id} className="border-t">
//                             <td className="py-2 px-4">{p.id}</td>
//                             <td className="py-2 px-4">{p.name}</td>
//                             <td className="py-2 px-4">₹{p.price}</td>
//                             <td className="py-2 px-4">{p.stockQuantity}</td>
//                             <td className="py-2 px-4">
//                                 <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                     {products.length === 0 && (
//                         <tr>
//                             <td colSpan="5" className="text-center py-4 text-gray-500">No products found</td>
//                         </tr>
//                     )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
//
// export default AdminDashboard;


import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        imageUrls: "", // comma-separated input
    });

    // const fetchProducts = async () => {
    //     try {
    //         const res = await axios.get("/admin/product/get");
    //         setProducts(res.data);
    //     } catch (err) {
    //         console.error("Failed to fetch products", err);
    //     }
    // };
    // const fetchProducts = async () => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         const res = await axios.get("http://localhost:8080/admin/product/get", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         setProducts(res.data); // ✅ Only if res.data is actually an array
    //     } catch (error) {
    //         console.error("Failed to fetch products", error);
    //     }
    // };

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token"); // ✅ Get the token
            const res = await axios.get("http://localhost:8080/admin/product/get", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(res.data); // ✅ Only if res.data is actually an array
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/admin/product/${id}`);
            fetchProducts();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...form,
                imageUrls: form.imageUrls.split(",").map(url => url.trim()),
            };
            await axios.post("/admin/product/add", payload);
            setForm({ name: "", description: "", price: "", stockQuantity: "", imageUrls: "" });
            fetchProducts();
        } catch (err) {
            console.error("Add failed", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            {/* Add Product Form */}
            <form onSubmit={handleAdd} className="bg-white p-4 rounded shadow mb-6 max-w-xl">
                <h2 className="text-lg font-semibold mb-2">Add Product</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
                    <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" required />
                    <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" required />
                    <input type="number" name="stockQuantity" value={form.stockQuantity} onChange={handleChange} placeholder="Stock" className="border p-2 rounded" required />
                    <textarea name="imageUrls" value={form.imageUrls} onChange={handleChange} placeholder="Image URLs (comma-separated)" className="col-span-2 border p-2 rounded" rows={2}></textarea>
                </div>
                <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</button>
            </form>

            {/* Product Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Price</th>
                        <th className="py-2 px-4">Stock</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(p => (
                        <tr key={p.id} className="border-t">
                            <td className="py-2 px-4">{p.id}</td>
                            <td className="py-2 px-4">{p.name}</td>
                            <td className="py-2 px-4">₹{p.price}</td>
                            <td className="py-2 px-4">{p.stockQuantity}</td>
                            <td className="py-2 px-4">
                                <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {products.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">No products found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;