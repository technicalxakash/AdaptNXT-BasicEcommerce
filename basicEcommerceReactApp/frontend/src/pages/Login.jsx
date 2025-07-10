
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/auth/login', {
                email,
                password,
            });

            const { token, role } = res.data;
            login(token, role);

            if (role === 'ADMIN') navigate('/admin/dashboard');
            else navigate('/user/dashboard');

        } catch (err) {
            alert('Login failed. Please check credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                <label className="block mb-2">
                    <span className="text-gray-700">Email</span>
                    <input
                        type="email"
                        className="mt-1 block w-full border border-gray-300 rounded p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">Password</span>
                    <input
                        type="password"
                        className="mt-1 block w-full border border-gray-300 rounded p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;