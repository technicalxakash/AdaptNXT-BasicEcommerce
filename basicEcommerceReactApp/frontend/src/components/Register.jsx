// // src/components/Register.jsx
// import { useState } from "react";
//
// const Register = () => {
//     const [form, setForm] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//         role: "CUSTOMER",
//     });
//
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await fetch("http://localhost:8080/auth/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(form),
//             });
//             const data = await res.text();
//             alert(data);
//         } catch (err) {
//             console.error("Registration failed", err);
//             alert("Registration failed");
//         }
//     };
//
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
//             >
//                 <h2 className="text-2xl font-bold text-center">Register</h2>
//
//                 <div>
//                     <label className="block text-sm">First Name</label>
//                     <input
//                         type="text"
//                         name="firstName"
//                         value={form.firstName}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2"
//                         required
//                     />
//                 </div>
//
//                 <div>
//                     <label className="block text-sm">Last Name</label>
//                     <input
//                         type="text"
//                         name="lastName"
//                         value={form.lastName}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2"
//                         required
//                     />
//                 </div>
//
//                 <div>
//                     <label className="block text-sm">Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2"
//                         required
//                     />
//                 </div>
//
//                 <div>
//                     <label className="block text-sm">Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={form.password}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2"
//                         required
//                     />
//                 </div>
//
//                 <div>
//                     <label className="block text-sm">Role</label>
//                     <select
//                         name="role"
//                         value={form.role}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2"
//                     >
//                         <option value="CUSTOMER">Customer</option>
//                         <option value="ADMIN">Admin</option>
//                     </select>
//                 </div>
//
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
//                 >
//                     Register
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default Register;
//
//




// src/pages/Register.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'CUSTOMER',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/auth/register', form);
            alert('Registration successful');
            navigate('/login');
        } catch (err) {
            alert('Registration failed. Email might already be taken.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold mb-6">Register</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="border rounded p-2 w-full"
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="border rounded p-2 w-full"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border rounded p-2 w-full col-span-1 md:col-span-2"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="border rounded p-2 w-full col-span-1 md:col-span-2"
                    />

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="border rounded p-2 w-full col-span-1 md:col-span-2"
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="mt-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;