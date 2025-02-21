import React from "react";
import { usePostForm } from "../../hooks/usePostForm";
import PostModal from "../Common/PostModal";

function CreatePost() {
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

  return (
    <>
      <button className="btn" onClick={() => setShow(true)} title="Create Post">
        <img
          className="icons"
          src={`${process.env.PUBLIC_URL}/assets/icons/plus-square.svg`}
          alt="Create post"
        />
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
        type="create"
      />
    </>
  );
}

export default CreatePost;