import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostRequest } from "../../actions/postsActions";
import PostModal from "../Common/PostModal";

function CreatePost() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setErrors({});
    setShow(false);
  };

  const validate = () => {
    const newErrors = {};
    const { title, description, file } = formData;

    if (!title || title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long.";
    } else if (title.length > 100) {
      newErrors.title = "Title cannot exceed 100 characters.";
    }

    if (!description || description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long.";
    } else if (description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters.";
    }

    if (!file) {
      newErrors.file = "Please upload a file.";
    } else {
      const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedFileTypes.includes(file.type)) {
        newErrors.file = "Only JPG, PNG, or PDF files are allowed.";
      }
      const maxFileSize = 5 * 1024 * 1024;
      if (file.size > maxFileSize) {
        newErrors.file = "File size cannot exceed 5 MB.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { title, description, file } = formData;
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("file", file);
    data.append("userId", user?.user_id);
    data.append("userEmail", user?.user_email);
    data.append("userName", user?.user_name);

    dispatch(createPostRequest(data));
    handleClose();
    setFormData({ title: "", description: "", file: null });
  };

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
