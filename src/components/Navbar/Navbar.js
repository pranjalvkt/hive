import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CreatePost from "../Post/CreatePost";
import NotificationModal from "../Notification/NotificationModal";
import SearchModal from "../Search/SearchModal";
import GenericModal from "../Common/GenericModal";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";
import { getUserRequest } from "../../actions/userAction";
import { getImage } from "../../helper/utilities";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("authToken");
  
  const [profilePic, setProfilePic] = useState(getImage(user?.profilePic));
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  }

  const handleLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem("authToken");
    dispatch(logout());
    toast.success("You have logged out successfully.");
    navigate("/auth/login");
  };

  const fetchProfile = useCallback(() => {
    if(user) {
      setProfilePic(getImage(user?.profilePic));
    }
  }, [user])

  useEffect(() => {
    if (token) {
      dispatch(getUserRequest(token));
    } else {
      navigate("/auth/login");
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [fetchProfile, user]);


  const handleShowSearchModal = () => setShowSearchModal(true);
  const handleCloseSearchModal = () => setShowSearchModal(false);

  const handleShowNotificationModal = () => setShowNotificationModal(true);
  const handleCloseNotificationModal = () => setShowNotificationModal(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto">
          <li className="nav-item" onClick={() => navigate("/")} title="Home">
            <h2 className="cursor">Hive</h2>
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
                  src={`${process.env.PUBLIC_URL}/assets/icons/chat-left-text.svg`}
                  alt="Chat"
                  title="Chat"
                />
              </button>
            </li>
            <li className="nav-item" onClick={handleShowNotificationModal}>
              <button className="btn">
                <img
                  className="icons"
                  src={`${process.env.PUBLIC_URL}/assets/icons/bell.svg`}
                  alt="Notification"
                  title="Notification"
                />
              </button>
            </li>
            <li className="nav-item" onClick={handleShowSearchModal}>
              <button className="btn">
                <img
                  className="icons"
                  src={`${process.env.PUBLIC_URL}/assets/icons/search.svg`}
                  alt="Search"
                  title="Search"
                />
              </button>
            </li>
            <li className="nav-item" onClick={() => navigate("/friends")}>
              <button className="btn" title="Connections">
                <img
                  className="icons"
                  src={`${process.env.PUBLIC_URL}/assets/icons/person.svg`}
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
                <li className="nav-item d-flex align-items-center ">
                  <img
                    src={profilePic}
                    alt="User Profile" 
                    className="rounded-circle cursor"
                    style={{
                      width: "100%",
                      height: "40px", // Adjust size
                      objectFit: "cover", // Ensures image covers the area
                    }}
                    onClick={() => navigate("/profile")}
                    title="Profile"
                  />
                </li>
                <li className="nav-item">
                  <button className="btn" onClick={openLogoutModal} title="Logout">
                    <img className="icons" src={`${process.env.PUBLIC_URL}/assets/icons/box-arrow-right.svg`} alt="Log out" />
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

      <GenericModal
        show={showLogoutModal}
        title="Confirm Action"
        body={`Are you sure you want to Logout ?`}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        confirmText="Yes, Proceed"
        cancelText="No, Cancel"
        confirmVariant="danger"
        cancelVariant="secondary"
      />
    </nav>
  );
};

export default Navbar;