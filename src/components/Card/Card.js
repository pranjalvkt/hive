import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { calculateTimeAgo, getImage } from "../../helper/utilities";
import { deletePostsRequest } from "../../actions/postsActions";
import GenericModal from "../Common/GenericModal";

const Card = (props) => {
  const { post } = props;
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deletePostsRequest(deleteId));
      setShowModal(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleEdit = () => {
    console.log("edit");
  };
  const handleShare = () => {
    console.log("share");
  };

  return (
    <>
      <div className="w-25 mx-2">
        <div className="card">
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
                />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby={`dropdownMenuButton-${post._id}`}
              >
                <li>
                  <button className="dropdown-item" onClick={handleEdit}>
                    Edit Post
                  </button>
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
                  <button className="dropdown-item" onClick={handleShare}>
                    Share Post
                  </button>
                </li>
              </ul>
            </div>
          </div>

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

      <GenericModal
        title="Confirm Delete"
        body="Are you sure you want to delete this post? This action cannot be undone."
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
        cancelVariant="secondary"
      />
    </>
  );
};

export default Card;
