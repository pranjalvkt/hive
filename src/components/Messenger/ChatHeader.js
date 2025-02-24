import { FiMoreVertical, FiPhone, FiVideo, FiArrowLeft } from "react-icons/fi";

const ChatHeader = ({ handleLogout, roomName }) => {
  return (
    <div className="bg-white border-b p-4 flex items-center justify-between sticky top-0">
      <div className="flex items-center space-x-3">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <FiArrowLeft
            className="w-5 h-5 text-gray-600"
            onClick={handleLogout}
          />
        </button>
        <img
          src={`https://robohash.org/${roomName}.png`}
          alt={roomName}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-semibold my-0 text-gray-800">{roomName}</h4>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <FiPhone className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <FiVideo className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <FiMoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
