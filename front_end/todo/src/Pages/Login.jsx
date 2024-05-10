import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAxios } from '../auth/api';

const Login = () => {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
            const response = await authAxios.post('/login/', {
                email: formData.email,
                password: formData.password
            });
            // Handle successful login, e.g., redirect to dashboard
            localStorage.setItem('access_token', response.data.access_token);
            history('/');
        } catch (error) {
            setError(error.response.data.error || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
