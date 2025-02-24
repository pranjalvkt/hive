import React, { useState } from "react";
import { toast } from "react-toastify";
import useChatContext from "../../context/ChatContext";
import { useNavigate } from "react-router-dom";
import { createRoomApi, joinChatApi } from "../../services/chatService";
import Modal from "../Common/Modal";
import { useSelector } from "react-redux";

const JoinCreateChatModal = ({ show, onClose, type }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [detail, setDetail] = useState({
    roomId: "",
    userName: user?.user_id,
  });
  const [loading, setLoading] = useState(false);

  const roomIdLabel = type === "Join Room" ? "Room ID" : "New Room ID";

  const { setRoomId, setCurrentUser, setConnected } = useChatContext();

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (detail.roomId === "") {
      toast.error("Invalid Input !!");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      try {
        setLoading(true);
        const room = await joinChatApi(detail.roomId);
        setLoading(false);
        toast.success("Joined successfully");
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        onClose();
        navigate(`/chat/${room.roomId}`);
      } catch (error) {
        setLoading(false);
        if (error.status === 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error in joining room");
        }
        console.log(error);
      }
    } else {
      console.log("error");
    }
  }

  async function createRoom() {
    if (validateForm()) {
      try {
        setLoading(true);
        const response = await createRoomApi(detail.roomId);
        setLoading(false);
        toast.success("Room Created Successfully !!");
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);
        onClose();
        navigate(`/chat/${detail.roomId}`);
      } catch (error) {
        setLoading(false);
        console.log(error);
        if (error.status === 400) {
          toast.error("Room already exists !!");
        } else {
          toast.error("Error in creating room");
        }
      }
    }
  }

  return (
    <Modal show={show} onClose={onClose}>
      <div className="p-10 w-full flex flex-col gap-5 max-w-md rounded">
        <div>
          <img
            alt={type}
            src={`${process.env.PUBLIC_URL}/assets/images/chat.png`}
            className="w-24 mx-auto"
          />
        </div>

        <h1 className="text-2xl font-semibold text-center">{type}</h1>

        {/* Room ID input */}
        <div>
          <label htmlFor="roomId" className="block font-medium mb-2">
            {roomIdLabel}
          </label>
          <input
            name="roomId"
            onChange={handleFormInputChange}
            value={detail.roomId}
            type="text"
            id="roomId"
            placeholder="Enter the room ID"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center gap-2 mt-1">
          {type === "Join Room" ? (
            loading ? (<div className="loading-container">
              <div className="loader"></div>
              <span className="loading-text">Joining room...</span>
            </div>) : (<button
              onClick={joinChat}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-800 hover:text-blue-100 rounded-full"
            >
              Join Room
            </button>)
          ) : (
            loading ? (<div className="loading-container">
              <div className="loader"></div>
              <span className="loading-text">Creating room...</span>
            </div>) : (<button
              onClick={createRoom}
              className="px-3 py-2 bg-orange-500 hover:bg-orange-800 hover:text-orange-100 rounded-full"
            >
              Create Room
            </button>)
          )}
        </div>
      </div>
    </Modal>
  );
};

export default JoinCreateChatModal;