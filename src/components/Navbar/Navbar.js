import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CreatePost from "../CreatePost/CreatePost";

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
        <Link className="navbar-brand" to="/">
          Hive
        </Link>
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
          <ul className="navbar-nav">
          <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Notification
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <CreatePost />
            </li>
            
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
              <li>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
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