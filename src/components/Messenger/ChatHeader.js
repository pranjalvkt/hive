import { FiMoreVertical, FiPhone, FiVideo, FiArrowLeft } from "react-icons/fi";

const ChatHeader = ({ handleLogout, roomName }) => {
  return (
    <div className="bg-white border-b p-2 sm:p-3 md:p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <FiArrowLeft
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
            onClick={handleLogout}
          />
        </button>
        <img
          src={`https://robohash.org/${roomName}.png`}
          alt={roomName}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
        />
        <div>
          <h4 className="font-semibold text-gray-800 text-sm sm:text-base my-0">{roomName}</h4>
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <FiPhone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>
        <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <FiVideo className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>
        <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <FiMoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
