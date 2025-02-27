import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaLock,
  FaUserPlus,
  FaShareAlt,
} from "react-icons/fa";
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { getUserDetails } from "../../../services/userService";
import { getImage } from "../../../helper/utilities";

const SelectedUserProfile = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedUser, setSelectedUser] = useState();
  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.slice(14);
    if (id) {
      getUserDetails(id).then((userDetails) => {
        setSelectedUser(userDetails);
      });
    }
  }, [location.pathname]);

  const posts = [{
    id: 1,
    image: getImage(selectedUser?.profilePic),
    title: "Placeholder title",
    likes: 234,
  }];

  const hideStats = () => {
    return (
      <div className="absolute inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-10 rounded-xl">
        <div className="text-center text-white">
          <FaLock className="text-4xl mb-2 mx-auto" />
          <p>This profile is private! Connect now to unlock and explore!</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative group">
            <img
              src={getImage(selectedUser?.profilePic)}
              alt={selectedUser?.user_name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200 group-hover:border-blue-500 transition-all duration-300"
              onError={(e) => {
                e.target.src = `https://robohash.org/${selectedUser?.user_name}.png`;
              }}
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="flex items-center justify-center text-3xl font-bold text-gray-900 flex md:justify-start mb-3 mt-2">
              {selectedUser?.user_name}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-2">
              <FaEnvelope className="text-gray-400" />
              <span>{selectedUser?.user_email}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>
                {selectedUser?.location ? selectedUser?.location : "-"}
              </span>
            </div>

            <div className="flex items-center justify-center md:justify-start flex-wrap gap-4 mt-6">
              <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors flex items-center gap-2">
                <FaUserPlus /> Connect
              </button>
              <button className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors flex items-center gap-2">
                <FaEnvelope /> Message
              </button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-colors flex items-center gap-2">
                <FaShareAlt /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="relative">
          {hideStats()}
          <div className="relative mt-8">
            <div
              className={`grid grid-cols-2 md:grid-cols-2 gap-4 mt-8 p-4 bg-gray-50 rounded-xl blur-sm`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  -
                </h3>
                <p className="text-gray-600">Connections</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  -
                </h3>
                <p className="text-gray-600">Posts</p>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="mt-12 relative">
            <div className="blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Posts</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <BsGrid3X3Gap />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <BsListUl />
                  </button>
                </div>
              </div>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {posts?.map((post) => (
                  <div
                    key={post.id}
                    className={`cursor-pointer transform hover:scale-105 transition-transform duration-300 ${
                      viewMode === "grid"
                        ? ""
                        : "flex gap-4 items-center bg-gray-50 p-4 rounded-xl"
                    }`}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className={`rounded-xl ${
                        viewMode === "grid" ? "w-full h-64" : "w-32 h-32"
                      } object-cover`}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1531482615713-2afd69097998";
                      }}
                    />
                    <div className={viewMode === "list" ? "flex-1" : "mt-2"}>
                      <h3 className="font-semibold text-gray-900">
                        {post.title}
                      </h3>
                      <p className="text-gray-600">{post.likes} likes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedUserProfile;
