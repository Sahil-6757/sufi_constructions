import './login.css';
const Login = () => {
    return (
        <div className="container">
            <div className="form-container">
                <input type="text" placeholder="Username" className="form-input" />
                <input type="password" placeholder="Password" className="form-input" />
                <button className="form-button">Login</button>
            </div>
        </div>
    );
};
export default Login;