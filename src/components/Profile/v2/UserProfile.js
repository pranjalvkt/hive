import { useState } from "react";
import { FaEdit, FaUserPlus, FaEnvelope, FaShareAlt, FaMapMarkerAlt } from "react-icons/fa";
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getImage } from "../../../helper/utilities";

const UserProfile = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { user } = useSelector((state) => state.user);

  const profileData = {
    name: "Alexandra Thompson",
    username: "@alexthompson",
    email: "alex.thompson@example.com",
    location: "San Francisco, CA",
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    stats: {
      connections: 1234,
      posts: 286,
      followers: 10500,
      following: 892
    },
    posts: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27",
        title: "Summer Vibes",
        likes: 234
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
        title: "Italian Adventure",
        likes: 456
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
        title: "City Exploration",
        likes: 789
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
        title: "Beach Day",
        likes: 321
      }
    ]
  };

  const PostModal = ({ post, onClose }) => {
    if (!post) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998";
            }}
          />
          <h3 className="text-xl font-semibold mt-4">{post.title}</h3>
          <p className="text-gray-600">{post.likes} likes</p>
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Close
          </button>
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
              src={getImage(user?.profilePic)}
              alt={user?.user_name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200 group-hover:border-blue-500 transition-all duration-300"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998";
              }}
            />
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition-all duration-300 flex items-center justify-center">
              <FaEdit className="text-white opacity-0 group-hover:opacity-100 text-2xl" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 flex md:justify-start mb-3">{user?.user_name}</h1>
            <p className="text-gray-600 mb-2 flex md:justify-start">{profileData.username}</p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-2">
              <FaEnvelope className="text-gray-400" />
              <span>{user?.user_email}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>{profileData.location}</span>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2">
                <FaEdit /> Edit Profile
              </button>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 p-4 bg-gray-50 rounded-xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">{profileData.stats.connections}</h3>
            <p className="text-gray-600">Connections</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">{profileData.stats.posts}</h3>
            <p className="text-gray-600">Posts</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">{profileData.stats.followers}</h3>
            <p className="text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">{profileData.stats.following}</h3>
            <p className="text-gray-600">Following</p>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Posts</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                <BsGrid3X3Gap />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                <BsListUl />
              </button>
            </div>
          </div>

          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {profileData.posts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  setSelectedPost(post);
                  setShowModal(true);
                }}
                className={`cursor-pointer transform hover:scale-105 transition-transform duration-300 ${
                  viewMode === "grid" ? "" : "flex gap-4 items-center bg-gray-50 p-4 rounded-xl"
                }`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className={`rounded-xl ${viewMode === "grid" ? "w-full h-64" : "w-32 h-32"} object-cover`}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998";
                  }}
                />
                <div className={viewMode === "list" ? "flex-1" : "mt-2"}>
                  <h3 className="font-semibold text-gray-900">{post.title}</h3>
                  <p className="text-gray-600">{post.likes} likes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <PostModal
          post={selectedPost}
          onClose={() => {
            setSelectedPost(null);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default UserProfile;