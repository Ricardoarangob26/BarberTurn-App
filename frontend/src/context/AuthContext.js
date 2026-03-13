import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                // Si el token expiró
                if (decodedUser.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser(decodedUser);
                }
            } catch (error) {
                console.error("Invalid token error", error);
                logout();
            }
        }
        setLoading(false);
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        const decodedUser = jwtDecode(newToken);
        setUser(decodedUser);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
