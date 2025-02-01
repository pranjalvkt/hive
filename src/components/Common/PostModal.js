import React, { useRef, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import imageCompression from "browser-image-compression";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

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
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const imageRef = useRef(null);
  const cropperRef = useRef(null);
  const fileInputRef = useRef(null); // Ref for file input

  useEffect(() => {
    if (!show) {
      setCroppedImage(null);
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Clear input on modal close
    }
  }, [show]);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCroppedImage(null);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setTimeout(() => {
          cropperRef.current = new Cropper(imageRef.current, {
            aspectRatio: 1,
            viewMode: 2,
            autoCropArea: 1,
          });
        }, 100);
      };
      reader.readAsDataURL(file);
    }
  };

  const cropImage = async () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas();
      canvas.toBlob(async (blob) => {
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
          };
          const compressedBlob = await imageCompression(blob, options);
          setCroppedImage(URL.createObjectURL(compressedBlob));

          setFormData((prevData) => ({
            ...prevData,
            file: compressedBlob,
          }));

          cropperRef.current.destroy();
          cropperRef.current = null;
          setImage(null);
        } catch (error) {
          console.error("Image compression error:", error);
        }
      }, "image/png");
    }
  };

  const cancelCrop = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input
  };

  return (
    <>
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
                ref={fileInputRef} // Attach ref to input field
              />
              <Form.Control.Feedback type="invalid">
                {errors.file}
              </Form.Control.Feedback>
            </Form.Group>

            {croppedImage && (
              <div className="mt-3 text-center">
                <h5>Preview</h5>
                <img
                  src={croppedImage}
                  alt="Cropped"
                  style={{ width: "150px", height: "150px", borderRadius: "10px" }}
                />
              </div>
            )}

            <Button variant="primary" type="submit">
              {type === "edit" ? "Update" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {image && (
        <Modal fullscreen={true} show={true} centered>
          <Modal.Header>
            <Modal.Title>Crop Image</Modal.Title>
            <Button variant="close" onClick={cancelCrop}></Button>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img ref={imageRef} src={image} alt="Crop Preview" style={{ maxWidth: "100%" }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelCrop}>
              Cancel
            </Button>
            <Button variant="success" onClick={cropImage}>
              Crop & Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default PostModal;
