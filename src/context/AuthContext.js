// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
console.log(token);

    const login = async (credentials) => {
        const response = await loginUser(credentials);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setUser(credentials.username);
    };

    const register = async (credentials) => {
        await registerUser(credentials);
        // Optionally, you can auto-login after registration
        await login(credentials);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) setToken(storedToken);
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
