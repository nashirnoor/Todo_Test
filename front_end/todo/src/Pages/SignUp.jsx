import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAxios } from '../auth/api';

const Signup = () => {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authAxios.post('/create_user/', {
                email: formData.email,
                password: formData.password
            });
            // Handle successful signup, e.g., redirect to login page
            history('/login');
        } catch (error) {
            setError(error.response.data.detail || 'An error occurred');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                           id="email" 
                           type="email" 
                           name="email" 
                           value={formData.email} 
                           onChange={handleChange} 
                           placeholder="Email"
                           required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                           id="password" 
                           type="password" 
                           name="password" 
                           value={formData.password} 
                           onChange={handleChange} 
                           placeholder="Password"
                           required 
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                           id="confirmPassword" 
                           type="password" 
                           name="confirmPassword" 
                           value={formData.confirmPassword} 
                           onChange={handleChange} 
                           placeholder="Confirm Password"
                           required 
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="submit">
                        Sign Up
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    </div>
    );
};

export default Signup;
