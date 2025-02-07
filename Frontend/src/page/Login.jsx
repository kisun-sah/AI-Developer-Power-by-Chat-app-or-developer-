import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/login', { email, password });
            console.log(response.data);
            alert('login successful');
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            navigate('/');
        } catch (error) {
            console.error(error.response?.data || "Login error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="email">Email</label>
                        <div className="flex items-center border rounded bg-gray-100 p-2">
                            <FaEnvelope className="text-gray-500 mx-2" />
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-transparent p-2 focus:outline-none"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 mb-2" htmlFor="password">Password</label>
                        <div className="flex items-center border rounded bg-gray-100 p-2">
                            <FaLock className="text-gray-500 mx-2" />
                            <input
                                type="password"
                                id="password"
                                className="w-full bg-transparent p-2 focus:outline-none"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-600 mt-4 text-center">
                    Don t have an account? <Link to="/register" className="text-blue-500 hover:underline">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
