// frontend/src/components/AuthForm.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AuthForm = ({ isLogin }) => {
    const { login, register } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { username, password };
        try {
            if (isLogin) {
                await login(credentials);
                toast.success('Login successful!');
            } else {
                await register(credentials);
                toast.success('Registration successful!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">{isLogin ? 'Login' : 'Register'}</button>
            </form>
        </div>
    );
};

export default AuthForm;
