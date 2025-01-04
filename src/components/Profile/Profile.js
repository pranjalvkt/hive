import React, { useState, useEffect } from "react";
import { Button, Form, Modal, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../helper/api";
import { isEmpty } from "../../helper/utilities";
import { useSelector } from "react-redux";

const Profile = () => {
  const token = localStorage.getItem("authToken");

  const { user } = useSelector((state) => state.auth);

  const [userId, setUserId] = useState(user?.user_id);
  const [username, setUsername] = useState(user?.user_name);
  const [email, setEmail] = useState(user?.user_email);
  const [profilePic, setProfilePic] = useState(
    process.env.PUBLIC_URL + "/assets/images/blank-avatar.png"
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newProfilePic, setNewProfilePic] = useState(null);

  const [friends, setFriends] = useState([
    { id: 1, name: "Jane Smith", username: "janesmith" },
    { id: 2, name: "Michael Brown", username: "michaelbrown" },
  ]);
  const [posts, setPosts] = useState([
    { id: 1, content: "Had a great day at the park!" },
    { id: 2, content: "Just finished a new project, feeling accomplished!" },
  ]);

  const navigate = useNavigate();

  const fetchUserDetails = () => {
    setEmail(user.user_email);
    setUsername(user.user_name);
    setUserId(user.user_id);
    setProfilePic(
      !isEmpty(user?.profilePic)
        ? `http://localhost:3001/api/userImage/${user?._id}`
        : profilePic
    );
  };

  const updateUserDetails = async () => {
    const data = {
      fullName: newUsername,
      file: newProfilePic,
    };

    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
      return;
    }
    try {
      const response = await api.put(`/updateUser/${userId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUsername(response.data.user.fullName);
      setProfilePic(`http://localhost:3001/api/userImage/${userId}`);
    } catch (err) {
      toast.error("Session expired! Please log in again.");
      localStorage.removeItem("authToken");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserDetails(); // Only fetch profile after user data is available
    }
  }, [user]);

  // Function to handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(e.target.files[0]);
    }
  };

  // Function to handle Profile change
  const handleProfileChange = () => {
    setUsername(newUsername);
    setProfilePic(newProfilePic);
    updateUserDetails();
    setShowEditModal(false);
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <div key={post.id} className="mb-2 p-3 border rounded">
        <p>{post.content}</p>
      </div>
    ));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          {/* Profile Picture */}
          <div className="text-center">
            <img
              src={profilePic}
              alt="Profile"
              className="rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <div className="mt-2">
              <Button
                variant="outline-primary"
                onClick={() => document.getElementById("fileInput").click()}
              >
                Edit Profile Picture
              </Button>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProfilePicChange}
              />
            </div>
          </div>
          {/* Username */}
          <h4 className="mt-3 text-center">{username}</h4>
          <p className="text-center">{email}</p>
          <Button
            variant="outline-secondary"
            onClick={() => setShowEditModal(true)}
            block
          >
            Edit Profile
          </Button>

          {/* Friend List */}
          <h5 className="mt-4">Friends</h5>
          <ul className="list-group">
            {friends.map((friend) => (
              <li
                key={friend.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {friend.name} (@{friend.username})
              </li>
            ))}
          </ul>
          <Link to="/friends">
            <Button variant="outline-primary" className="mt-2">
              View All Friends
            </Button>
          </Link>
        </div>

        <div className="col-md-8">
          <h5>Your Posts</h5>
          {renderPosts()}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter new username"
              />
            </Form.Group>
            <Form.Group controlId="profilePic">
              <Form.Label>Profile Picture</Form.Label>
              <InputGroup>
                <FormControl
                  type="file"
                  onChange={handleProfilePicChange}
                  accept="image/*"
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleProfileChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
