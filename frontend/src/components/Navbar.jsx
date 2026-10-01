import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    let userRole = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            userRole = decoded.role;
        } catch (error) {
            console.log("Invalid token");
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                <span className="logo-icon">♥</span>
                FundRaise
            </Link>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                {token && userRole === "admin" && (
                    <Link to="/admin">
                        Dashboard
                    </Link>
                )}

                {!token && (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="nav-register"
                        >
                            Get Started
                        </Link>
                    </>
                )}

                {token && (
                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>
                )}

            </div>

        </nav>
    );
}

export default Navbar;