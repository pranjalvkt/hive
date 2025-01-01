import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CreatePost from "../CreatePost/CreatePost";
import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    toast.success("You have logged out successfully.");
    navigate("/auth/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
      <div className="container-fluid">
      <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <h2>Hive</h2>
              {/* <img
                className="logo-img"
                src={`${process.env.PUBLIC_URL}/hive.png`}
                alt="Logo"
              /> */}
            </li>
          </ul>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ">
              <button className="btn">
                <img className="icons"
                  src={`${process.env.PUBLIC_URL}/chat-left-text.svg`}
                  alt="Chat"
                />
              </button>
            </li>
            <li className="nav-item ">
              <button className="btn">
                <img className="icons"
                  src={`${process.env.PUBLIC_URL}/bell.svg`}
                  alt="Notification"
                />
              </button>
            </li>
            <li className="nav-item">
              <button className="btn">
                <img className="icons"
                  src={`${process.env.PUBLIC_URL}/search.svg`}
                  alt="Search"
                />
              </button>
            </li>
            <li className="nav-item">
              <button className="btn">
                <img className="icons"
                  src={`${process.env.PUBLIC_URL}/person.svg`}
                  alt="Profile"
                />
              </button>
            </li>
            {token && (
              <li className="nav-item">
                <CreatePost />
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!token ? (
              location.pathname === "/auth/login" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/auth/register">
                    Register
                  </Link>
                </li>
              ) : location.pathname === "/auth/register" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/auth/login">
                    Login
                  </Link>
                </li>
              ) : null
            ) : (
              <li className="nav-item">
                <button className="btn" onClick={handleLogout}>
                  <img className="icons" src="./box-arrow-right.svg" alt="log out" />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
