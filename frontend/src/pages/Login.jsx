import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5001/api/auth/login",
                {
                    email: email,
                    password: password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Login successful! 💜");

            // Go to Home after login
            navigate("/");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-visual">

                <span className="auth-floating one">
                    ♥
                </span>

                <span className="auth-floating two">
                    ✦
                </span>

                <span className="auth-small-label">
                    FUNDRAISE 💜
                </span>

                <h1>
                    Welcome
                    <br />
                    <span>back.</span>
                </h1>

                <p>
                    Continue supporting causes
                    that matter to you.
                </p>

            </div>


            <div className="auth-form-section">

                <div className="auth-box">

                    <div className="auth-icon">
                        ♥
                    </div>

                    <h1>
                        Welcome back
                    </h1>

                    <p>
                        Login to continue to FundRaise.
                    </p>

                    <form onSubmit={handleLogin}>

                        <div className="auth-field">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        <div className="auth-field">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="auth-submit"
                        >
                            Login
                            <span>→</span>
                        </button>

                    </form>


                    <p className="auth-switch">
                        Don't have an account?

                        <Link to="/register">
                            Create one
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;