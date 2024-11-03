import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/Firebase';
import { useAuthContext } from '../../contexts/AuthContext';

const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!emailFormat.test(email)) {
            toast.error("Enter your email properly");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least six characters");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Signed In User:", user);
            toast.success("Login Successful");
            dispatch({ type: "SET_LOGGED_IN", payload: user });
            navigate("/");
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("You can't log in. Please create your account first.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='bg-light'>
            <div className="container">
                <div className="row">
                    <div className="col-12 login-card">
                        <div className="card register p-4 bg-dark text-white w-100">
                            <form onSubmit={handleLogin}>
                                <h3 className='text-center mt-2 mb-4'>Login Form</h3>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address*</label>
                                    <Input
                                        size='large'
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password*</label>
                                    <Input.Password
                                        size='large'
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ display: 'flex', alignItems: 'center' }} // Align the icon
                                    />
                                </div>
                                <div className="mb-3 text-end">
                                    Don't have an account? <Link to="/auth/register" className='text-success'>Register Yourself</Link>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                                        {loading && <i className='fa fa-spinner fa-spin mx-1' style={{ fontSize: 24 }}></i>}
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        
    );
}
