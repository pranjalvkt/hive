import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import imageCompression from "browser-image-compression";

const PostModal = ({
  show,
  handleClose,
  handleSubmit,
  formData,
  onInputChange,
  setFormData,
  errors,
  type,
}) => {
  const onFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);

        setFormData((prevData) => ({
          ...prevData,
          file: compressedFile,
        }));
      } catch (error) {
        console.error("Image compression error:", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{type === "edit" ? "Edit Post" : "Create Post"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post title"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="postDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter post description"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="postFile">
            <Form.Label>Upload File</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={onFileChange}
              isInvalid={!!errors.file}
            />
            <Form.Control.Feedback type="invalid">
              {errors.file}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            {type === "edit" ? "Update" : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
