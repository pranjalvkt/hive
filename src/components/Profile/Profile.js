import React, { useState, useEffect } from "react";
import { Button, Form, Modal, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserRequest } from "../../actions/authActions";
import { getImage } from "../../helper/utilities";
import { toast } from "react-toastify";
import { fetchAddedUserRequest } from "../../actions/connectionAction";
import PostList from "../Home/PostList";
import FriendCard from "../Friends/FriendCard";

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { connections } = useSelector((state) => state.connection);

  const token = localStorage.getItem("authToken");

  const [username, setUsername] = useState(user?.user_name);
  const [email, setEmail] = useState(user?.user_email);
  const [profilePic, setProfilePic] = useState(getImage(user?.profilePic));

  const [showEditModal, setShowEditModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newProfilePic, setNewProfilePic] = useState(null);

  const fetchUserDetails = () => {
    setEmail(user.user_email);
    setUsername(user.user_name);
    setProfilePic(getImage(user?.profilePic));
  };

  const updateUserDetails = () => {
    if (!newUsername && !newProfilePic) {
      toast.warn("No new values provided for update.");
      return;
    }

    const data = {
      fullName: newUsername || username,
      file: newProfilePic || profilePic,
    };

    dispatch(updateUserRequest({ id: user.user_id, data: data }));
  };

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  useEffect(() => {
    if (connections.length === 0) {
      dispatch(fetchAddedUserRequest({ token }));
    }
  }, []);

  useEffect(() => {
    if (connections.length === 0) {
      dispatch(fetchAddedUserRequest({ token }));
    }
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(e.target.files[0]);
    }
  };

  const handleProfileChange = () => {
    updateUserDetails();
    setShowEditModal(false);
  };

  const renderPosts = () => {
    return <PostList />;
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
              <h4 className="mt-3 text-center">{username}</h4>
              <p className="text-center">{email}</p>
              <Button
                className="text-center"
                variant="outline-secondary"
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
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

          {/* Friend List */}
          <h5 className="mt-4">Friends</h5>
          <ul className="list-group">
            {connections &&
              connections.map((friend) => (
                <FriendCard users={friend?.user} key={friend.user._id} />
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
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter new Full Name"
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
