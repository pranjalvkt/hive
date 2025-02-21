import React from "react";
import { usePostForm } from "../../hooks/usePostForm";
import PostModal from "../Common/PostModal";

function EditPost({ post }) {
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
  } = usePostForm(post, "edit"); // Pass the post data to the hook for editing

  return (
    <>
      <button className="btn dropdown-item" onClick={() => setShow(true)} title="Edit Post">
      Edit Post
      </button>

      <PostModal
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        onInputChange={onInputChange}
        onFileChange={onFileChange}
        errors={errors}
        type="edit"
      />
    </>
  );
}

export default EditPost;
