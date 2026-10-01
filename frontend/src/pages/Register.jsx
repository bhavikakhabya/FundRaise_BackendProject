import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5001/api/auth/register",
                {
                    name: name,
                    email: email,
                    password: password
                }
            );

            alert("Registration successful! ✨");

            console.log(response.data);

            setName("");
            setEmail("");
            setPassword("");

            navigate("/login");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-visual">

                <span className="auth-floating one">
                    ✦
                </span>

                <span className="auth-floating two">
                    ♥
                </span>

                <span className="auth-small-label">
                    START SOMETHING GOOD ✨
                </span>

                <h1>
                    Make an
                    <br />
                    <span>impact.</span>
                </h1>

                <p>
                    Join a community that believes
                    every little contribution counts.
                </p>

            </div>


            <div className="auth-form-section">

                <div className="auth-box">

                    <div className="auth-icon">
                        ✨
                    </div>

                    <h1>
                        Create account
                    </h1>

                    <p>
                        Join FundRaise and start making
                        a difference.
                    </p>

                    <form onSubmit={handleRegister}>

                        <div className="auth-field">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


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
                                placeholder="Create a password"
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
                            Create Account
                            <span>→</span>
                        </button>

                    </form>


                    <p className="auth-switch">
                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;