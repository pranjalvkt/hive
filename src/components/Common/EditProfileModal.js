import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserRequest } from "../../actions/userAction";

const EditProfileModal = ({ username, profilePic, show, onClose }) => {
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState("");
  const [newProfilePic, setNewProfilePic] = useState(null);
  const { user } = useSelector((state) => state.user);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewProfilePic(file);
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
    onClose(); // Close modal after saving
  };

  if (!show) return null; // Prevents rendering when not visible

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md md:max-w-lg rounded-xl shadow-lg p-6 sm:p-8 mx-4 sm:mx-0">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new Full Name"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              onChange={handleProfilePicChange}
              accept="image/*"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
          >
            Close
          </button>
          <button
            onClick={updateUserDetails}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;