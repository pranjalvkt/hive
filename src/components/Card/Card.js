import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { calculateTimeAgo, getImage } from "../../helper/utilities";
import { deletePostsRequest } from "../../actions/postsActions";
import GenericModal from "../Common/GenericModal";
import ShareModal from "../Common/ShareModal";
import EditPost from "../Post/EditPost";

const Card = (props) => {
  const { post, handleRedirect } = props;
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
      <div className="col">
        <div className="card h-100">
          <div className="card-header d-flex justify-content-between">
            {post.userName}
            <div className="dropdown">
              <button
                className="btn btn-sm btn-light"
                type="button"
                id={`dropdownMenuButton-${post._id}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="cursor"
                  src={`${process.env.PUBLIC_URL}/assets/icons/options.svg`}
                  alt="Options"
                  title="Options"
                />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby={`dropdownMenuButton-${post._id}`}
              >
                <li>
                  <EditPost post={post}/>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => confirmDelete(post._id)}
                  >
                    Delete Post
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setShowShareModal(true)}
                  >
                    Share Post
                  </button>
                </li>
              </ul>
            </div>
          </div>
        <div className="cursor" onClick={() => handleRedirect(post._id)}>
        <img
            src={getImage(post.image_file)}
            className="card-img-top"
            alt={post.title}
          />
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              Last updated {calculateTimeAgo(post.createdAt)}
            </small>
          </div>
        </div>
          
        </div>
      </div>

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

      <ShareModal
        show={showShareModal}
        handleClose={() => setShowShareModal(false)}
        handleShare={handleShare}
      />
    </>
  );
};

export default Card;
