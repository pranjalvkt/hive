import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FiImage, FiVideo, FiSmile } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getImage } from "../../../helper/utilities";
import { fetchPostsRequest } from "../../../actions/postsActions";
import {
  fetchRecommendedUserRequest,
  sendRequestRequest,
} from "../../../actions/connectionAction";
import PostCard from "./PostCard";
import { usePostForm } from "../../../hooks/usePostForm";
import PostModal from "../../Common/PostModal";

const SocialFeed = () => {
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState("");
  const { posts } = useSelector((state) => state.posts);
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [posts]);
  
  const { user } = useSelector((state) => state.user);
  const { recommendation } = useSelector((state) => state.connection);
  const token = localStorage.getItem("authToken");

  const {
    formData,
    setFormData,
    errors,
    show,
    setShow,
    handleClose,
    handleSubmit,
    onInputChange,
    onFileChange,
  } = usePostForm();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPostsRequest(token));
    }
  }, [token, dispatch, posts]);

  useEffect(() => {
    if (token && !recommendation.length) {
      dispatch(fetchRecommendedUserRequest({ token }));
    }
  }, [dispatch, token, recommendation.length]);

  const handleConnect = useCallback(
    async (personId) => {
      dispatch(sendRequestRequest({ token, personId }));
    },
    [dispatch, token]
  );

  return (
    <div className={`min-h-screen bg-gray-50`}>
      <div className="pt-20 pb-4">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div
              className="bg-white rounded-2xl shadow-sm p-6"
              onClick={() => setShow(true)}
            >
              <form>
                <div className="flex items-start space-x-4">
                  <img
                    src={getImage(user?.profilePic)}
                    alt="User"
                    className="h-12 w-12 rounded-xl"
                    onError={(e) => {
                      e.target.src = `https://robohash.org/${user?.user_name}.png`;
                    }}
                  />
                  <div className="flex-1">
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full p-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      rows="3"
                    />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl"
                        >
                          <FiImage className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl"
                        >
                          <FiVideo className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl"
                        >
                          <FiSmile className="h-5 w-5" />
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled
                      >
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              {sortedPosts.map((post) => (
                <PostCard post={post} user={user} />
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-6">
                Suggested Connections
              </h2>
              <div className="space-y-6">
                {recommendation &&
                  recommendation.map((friend) => (
                    <div
                      key={friend._id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={getImage(friend?.profilePic)}
                          alt={friend?.fullName}
                          className="h-12 w-12 rounded-xl"
                          onError={(e) => {
                            e.target.src = `https://robohash.org/${user?.user_name}.png`;
                          }}
                        />
                        <div>
                          <h6 className="font-medium">{friend.fullName}</h6>
                          <p className="text-sm text-gray-500 mb-0">
                            0 mutual friends
                          </p>
                        </div>
                      </div>
                      <button
                        className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => handleConnect(friend._id)}
                      >
                        Connect
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PostModal
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        onInputChange={onInputChange}
        onFileChange={onFileChange}
        errors={errors}
        type="create"
      />
    </div>
  );
};

export default SocialFeed;
