import React, { useState } from "react";
import JoinCreateChatModal from "./JoinCreateChatModal";

const JoinCreate = () => {

  const [showChatModal, setShowChatModal] = useState(false);
  const [type, setType] = useState("Join Room");

  const handleModal = (type) => {
    setShowChatModal(true);
    setType(type);
  }

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 mt-5">
      <div className="flex flex-col space-y-4 p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome to Chat Room
        </h1>
        <button
          onClick={() => handleModal("Join Room")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Join Room
        </button>
        <button
          onClick={() => handleModal("Create Room")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          Create Room
        </button>
      </div>
      <JoinCreateChatModal
        type={type}
        show={showChatModal}
        onClose={() => setShowChatModal(false)}
      />
    </div>
  );
};
export default JoinCreate;