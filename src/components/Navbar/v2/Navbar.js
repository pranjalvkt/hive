import { useCallback, useEffect, useState } from "react";
import {
  FiMenu,
  FiX,
  FiMessageSquare,
  FiBell,
  FiSearch,
  FiUsers,
  FiPlusSquare,
  FiLogOut,
} from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getImage } from "../../../helper/utilities";
import { getUserRequest } from "../../../actions/userAction";
import GenericModal from "../../Common/GenericModal";
import SearchModal from "../../Search/SearchModal";
import NotificationModal from "../../Notification/NotificationModal";
import CreatePost from "../../Post/CreatePost";
import { logout } from "../../../actions/authActions";
import { toast } from "react-toastify";

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

  const notifications = 5;
  const messages = 3;

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleShowNotificationModal = () => setShowNotificationModal(true);
  const handleCloseNotificationModal = () => setShowNotificationModal(false);

  const handleShowSearchModal = () => setShowSearchModal(true);
  const handleCloseSearchModal = () => setShowSearchModal(false);

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    setShowLogoutModal(false);
    setShowProfileMenu(false);
    localStorage.removeItem("authToken");
    dispatch(logout());
    toast.success("You have logged out successfully.");
    navigate("/auth/login");
  };

  const fetchProfile = useCallback(() => {
    if (user) {
      setProfilePic(getImage(user?.profilePic));
    }
  }, [user]);
  useEffect(() => {
    if (token) {
      dispatch(getUserRequest(token));
    } else if (location.pathname !== "/auth/register") {
      navigate("/auth/login");
    }
  }, [token, dispatch, location.pathname, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [fetchProfile, user]);

  if (location.pathname.includes("/chat/")) {
    return;
  }

  return (
    <div className="pt-16">
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Branding */}
            <div className="flex-shrink-0 flex items-center">
              <h1
                className="text-2xl font-bold text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors duration-300"
                onClick={() => navigate("/")}
              >
                Hive
              </h1>
            </div>

            {/* Center Section - Desktop */}
            {token && (
              <div className="hidden md:flex items-center space-x-8">
                <div className="relative">
                  <button
                    className="text-gray-600 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                    aria-label="Messages"
                    onClick={() => navigate("/chat")}
                  >
                    <FiMessageSquare className="h-6 w-6" />
                    {messages > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                        {messages}
                      </span>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <button
                    className="text-gray-600 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                    aria-label="Notifications"
                    onClick={handleShowNotificationModal}
                  >
                    <FiBell className="h-6 w-6" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <button
                    className="text-gray-600 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                    aria-label="Search"
                    onClick={handleShowSearchModal}
                  >
                    <FiSearch className="h-6 w-6" />
                  </button>
                </div>

                <button
                  className="text-gray-600 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                  aria-label="Friends"
                  onClick={() => navigate("/friends")}
                >
                  <FiUsers className="h-6 w-6" />
                </button>

                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center space-x-2"
                  aria-label="Create Post"
                >
                  <FiPlusSquare className="h-5 w-5" />
                  <CreatePost />
                </button>
              </div>
            )}

            {/* Right Section */}
            {token ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <button
                    className="flex items-center space-x-3 focus:outline-none"
                    aria-label="User menu"
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={profilePic}
                      alt="Profile"
                      onClick={() => navigate("/profile")}
                    />
                    <IoMdArrowDropdown
                      className="h-5 w-5 text-gray-600"
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                    />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                      <span
                        onClick={() => navigate("/about")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        About
                      </span>
                      <span
                        onClick={() => navigate("/settings")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Settings
                      </span>
                      <span
                        onClick={openLogoutModal}
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                      >
                        Sign out
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  {location.pathname === "/auth/login" ? (
                    <span
                      className="cursor-pointer"
                      onClick={(e) => navigate("/auth/register")}
                    >
                      Register
                    </span>
                  ) : location.pathname === "/auth/register" ? (
                    <Link className="nav-link" to="/auth/login">
                      Login
                    </Link>
                  ) : null}
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
              >
                <span className="sr-only">
                  {isOpen ? "Close main menu" : "Open main menu"}
                </span>
                {isOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/chat");
                }}
              >
                <FiMessageSquare className="h-6 w-6" />
                <span>Messages</span>
                {messages > 0 && (
                  <span className="ml-auto bg-red-500 text-white rounded-full text-xs px-2 py-1">
                    {messages}
                  </span>
                )}
              </button>

              <button
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => {
                  setIsOpen(false);
                  handleShowNotificationModal();
                }}
              >
                <FiBell className="h-6 w-6" />
                <span>Notifications</span>
                {notifications > 0 && (
                  <span className="ml-auto bg-red-500 text-white rounded-full text-xs px-2 py-1">
                    {notifications}
                  </span>
                )}
              </button>

              <button
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => {
                  setIsOpen(false);
                  handleShowSearchModal();
                }}
              >
                <FiSearch className="h-6 w-6" />
                <span>Search</span>
              </button>

              <button
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/friends");
                }}
              >
                <FiUsers className="h-6 w-6" />
                <span>Friends</span>
              </button>

              <button className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700">
                <FiPlusSquare className="h-6 w-6" />
                <CreatePost />
              </button>

              <button className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={profilePic}
                  alt="Profile"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/profile");
                  }}
                />
                Profile
              </button>

              <button
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
                onClick={() => {
                  setIsOpen(false);
                  openLogoutModal();
                }}
              >
                <FiLogOut className="h-6 w-6" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        )}

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
    </div>
  );
};

export default Navbar;
