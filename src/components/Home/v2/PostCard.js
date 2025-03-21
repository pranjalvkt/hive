import React, { useState } from "react";
import { calculateTimeAgo, getImage } from "../../../helper/utilities";
import { FiMoreHorizontal } from "react-icons/fi";
import EditPost from "../../Post/EditPost";
import { BiComment, BiLike, BiShare } from "react-icons/bi";
import ShareModal from "../../Common/ShareModal";
import { deletePostsRequest } from "../../../actions/postsActions";
import { useDispatch } from "react-redux";
import GenericModal from "../../Common/GenericModal";

const PostCard = (props) => {
  const { post, user } = props;
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deletePostsRequest(deleteId));
      setShowDeleteModal(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleShare = (platform) => {
    const postUrl = window.location.href;
    const message = `Check out this post: ${post.title} - ${postUrl}posts/${post._id}`;

    let shareUrl = "";
    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          postUrl
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          message
        )}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
    setShowShareModal(false);
  };

  return (
    <>
      <div
        key={post?._id}
        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={getImage(user?.profilePic)}
                alt={user?.user_name}
                className="h-12 w-12 rounded-xl"
                onError={(e) => {
                  e.target.src = `https://robohash.org/${user?.user_name}.png`;
                }}
              />
              <div>
                <h5 className="font-semibold">{user?.user_name}</h5>
                <p className="text-sm text-gray-500 mb-0">
                  {calculateTimeAgo(post?.createdAt)}
                </p>
              </div>
            </div>

            <div className="dropdown">
              <button
                className="text-gray-400 hover:text-indigo-500"
                id={`dropdownMenuButton-${post._id}`}
                data-bs-toggle="dropdown"
              >
                <FiMoreHorizontal className="h-5 w-5" />
              </button>
              <ul
                className="dropdown-menu z-50"
                aria-labelledby={`dropdownMenuButton-${post._id}`}
              >
                <li>
                  <EditPost post={post} />
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => confirmDelete(post._id)}>Delete Post</button>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-4">{post?.title}</p>
          {post?.image_file && (
            <img
              src={getImage(post?.image_file)}
              alt="Post content"
              className="mt-4 rounded-xl w-full"
            />
          )}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-6">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 ">
                <BiLike className="h-5 w-5" />
                <span>{post?.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 ">
                <BiComment className="h-5 w-5" />
                <span>{post?.comments}</span>
              </button>
              <button
                className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 "
                onClick={() => setShowShareModal(true)}
              >
                <BiShare className="h-5 w-5" />
                <span>{post?.shares}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ShareModal
        show={showShareModal}
        handleClose={() => setShowShareModal(false)}
        handleShare={handleShare}
      />
      <GenericModal
        title="Confirm Delete"
        body="Are you sure you want to delete this post? This action cannot be undone."
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
        cancelVariant="secondary"
      />
    </>
  );
};

export default PostCard;
