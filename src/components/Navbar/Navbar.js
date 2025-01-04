import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CreatePost from "../CreatePost/CreatePost";
import NotificationModal from "../Notification/NotificationModal";
import SearchModal from "../Search/SearchModal"; // Import SearchModal
import "./Navbar.css";
import api from "../../helper/api";
import { useSelector } from "react-redux";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  
  const token = localStorage.getItem("authToken");
  const [profilePic, setProfilePic] = useState(process.env.PUBLIC_URL+'/blank-avatar.png');

  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false); // State for Search Modal visibility

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    toast.success("You have logged out successfully.");
    navigate("/auth/login");
  };

  const fetchProfile = async () => {
    console.log('trigger from nav');
    
    try {
      const response = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfilePic(
        response.data?.profilePic ? `http://localhost:3001/api/userImage/${response.data?._id}` :
        profilePic
      );
    } catch (err) {

    }
  }

  useEffect(() => {
    if(token) {
      fetchProfile();
    }
  }, []);


  const handleShowSearchModal = () => setShowSearchModal(true);
  const handleCloseSearchModal = () => setShowSearchModal(false);

  const handleShowNotificationModal = () => setShowNotificationModal(true);
  const handleCloseNotificationModal = () => setShowNotificationModal(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto">
          <li className="nav-item" onClick={() => navigate("/")}>
            <h2>Hive</h2>
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
        {token && (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item" onClick={() => navigate("/chat")}>
              <button className="btn">
                <img
                  className="icons"
                  src={`${process.env.PUBLIC_URL}/chat-left-text.svg`}
                  alt="Chat"
                />
              </button>
            </li>
            <li className="nav-item" onClick={handleShowNotificationModal}>
              <button className="btn">
                <img
                  className="icons"
                  src={`${process.env.PUBLIC_URL}/bell.svg`}
                  alt="Notification"
                />
              </button>
            </li>
            <li className="nav-item" onClick={handleShowSearchModal}>
              <button className="btn">
                <img
                  className="icons"
                  src={`${process.env.PUBLIC_URL}/search.svg`}
                  alt="Search"
                />
              </button>
            </li>
            <li className="nav-item" onClick={() => navigate("/friends")}>
              <button className="btn">
                <img
                  className="icons"
                  src={`${process.env.PUBLIC_URL}/person.svg`}
                  alt="Friends"
                />
              </button>
            </li>
            
              <li className="nav-item">
                <CreatePost />
              </li>
          </ul>
            )}
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
              <>
                {/* Display User Profile Picture */}
                <li className="nav-item d-flex align-items-center">
                  <img
                    src={profilePic}
                    alt="User Profile"
                    className="rounded-circle"
                    style={{
                      width: "40px", // Adjust size
                      height: "40px", // Adjust size
                      objectFit: "cover", // Ensures image covers the area
                      marginRight: "10px", // Adds space between profile pic and logout button
                    }}
                    onClick={() => navigate("/profile")}
                  />
                </li>
                <li className="nav-item">
                  <button className="btn" onClick={handleLogout}>
                    <img className="icons" src={`${process.env.PUBLIC_URL}/box-arrow-right.svg`} alt="Log out" />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        show={showNotificationModal}
        handleClose={handleCloseNotificationModal}
      />

      {/* Search Modal */}
      <SearchModal
        show={showSearchModal}
        handleClose={handleCloseSearchModal}
      />
    </nav>
  );
};

export default Navbar;