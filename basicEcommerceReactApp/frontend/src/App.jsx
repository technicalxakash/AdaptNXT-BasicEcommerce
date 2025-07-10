import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './components/Register.jsx';
import AdminDashboard from './pages/AdminDashBoard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Home from "./pages/Home.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Header />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/user/product/:id" element={<ProductDetailPage />} />
                            {/*<Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />*/}
                            <Route
                                path="/cart"
                                element={
                                    <ErrorBoundary>
                                        <CartPage />
                                    </ErrorBoundary>
                                }
                            />
                            <Route
                                path="/admin/dashboard"
                                element={
                                    <PrivateRoute allowedRole="ADMIN">
                                        <AdminDashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="/" element={<Home />} />
                            {/* Add user/home or other routes as needed */}
                        </Routes>
                    </main>
                    <Footer />
                </Router>
                <ToastContainer />
            </CartProvider>
        </AuthProvider>
    );
}

export default App;