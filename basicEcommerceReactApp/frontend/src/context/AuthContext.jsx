import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [role, setRole] = useState(() => localStorage.getItem("role"));

    const login = (newToken, userRole) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("role", userRole);
        setToken(newToken);
        setRole(userRole);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setRole(null);
    };

    const isLoggedIn = !!token;

    return (
        <AuthContext.Provider value={{ token, role, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);