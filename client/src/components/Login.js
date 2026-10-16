import './login.css';
import logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const handleLogin = (e) => {
        e.preventDefault();
        if (!user.username || !user.password) {
            alert("Please enter your username and password");
            return;
        }
        axios.post("http://localhost:5000/auth/login", user)
            .then((res) => {
                console.log("Login response:", res.data);
                if (res.data.success) {
                    alert("Login successful!");
                    navigate("/dashboard");
                }
            })
            .catch((err) => {
                console.error("Login error:", err);
                const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
                alert(errorMessage);
            });
    };
    return (
        <div className="container">
            <div className="login-container">
                <img src={logo} alt='logo' height={200} width={200} />
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <input type="text" placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="login-input" />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="login-input" />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};
export default Login;