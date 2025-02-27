import React, { useState, useEffect } from "react";
import { FiHome, FiSearch, FiBell, FiMenu, FiImage, FiVideo, FiSmile, FiMoreHorizontal, FiSun, FiMoon } from "react-icons/fi";
import { BiLike, BiComment, BiShare } from "react-icons/bi";

const mockPosts = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
    },
    content: "Just had an amazing day exploring nature! 🌿",
    timestamp: "2h ago",
    likes: 42,
    comments: 8,
    shares: 3,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    content: "New recipe experiment turned out great! 🍳",
    timestamp: "4h ago",
    likes: 89,
    comments: 12,
    shares: 5,
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f"
  }
];

const mockFriendSuggestions = [
  {
    id: 1,
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    mutualFriends: 5
  },
  {
    id: 2,
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    mutualFriends: 3
  }
];

const SocialMediaHome = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState(mockPosts);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        user: {
          name: "Current User",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
        },
        content: postContent,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        shares: 0
      };
      setPosts([newPost, ...posts]);
      setPostContent("");
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-100"}`}>
      <nav className="fixed bottom-0 w-full md:top-0 md:bottom-auto bg-white dark:bg-gray-800 border-t md:border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <FiMenu className="h-6 w-6 text-gray-500 dark:text-gray-400 md:hidden" />
              <FiHome className="h-6 w-6 text-blue-500" />
            </div>
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none"
                />
                <FiSearch className="absolute right-4 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FiBell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? <FiSun className="h-6 w-6 text-gray-400" /> : <FiMoon className="h-6 w-6 text-gray-500" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-4 md:pt-20 pb-20 md:pb-4">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <form onSubmit={handlePostSubmit}>
                <div className="flex items-start space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                    alt="User"
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="What's on your mind?"
                      className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none resize-none"
                      rows="3"
                    />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex space-x-2">
                        <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                          <FiImage className="h-5 w-5" />
                        </button>
                        <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                          <FiVideo className="h-5 w-5" />
                        </button>
                        <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                          <FiSmile className="h-5 w-5" />
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={post.user.avatar} alt={post.user.name} className="h-10 w-10 rounded-full" />
                        <div>
                          <h3 className="font-semibold dark:text-white">{post.user.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                        <FiMoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="mt-4 dark:text-white">{post.content}</p>
                    {post.image && (
                      <img src={post.image} alt="Post content" className="mt-4 rounded-lg w-full" />
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex space-x-4">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 dark:text-gray-400">
                          <BiLike className="h-5 w-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 dark:text-gray-400">
                          <BiComment className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 dark:text-gray-400">
                          <BiShare className="h-5 w-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Friend Suggestions</h2>
              <div className="space-y-4">
                {mockFriendSuggestions.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={friend.avatar} alt={friend.name} className="h-10 w-10 rounded-full" />
                      <div>
                        <h3 className="font-medium dark:text-white">{friend.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{friend.mutualFriends} mutual friends</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none">
                      Add
                    </button>
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

export default SocialMediaHome;
