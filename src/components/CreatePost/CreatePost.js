import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import api from '../../helper/api';
function CreatePost() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
  });
  const [errors, setErrors] = useState({});

  const user = JSON.parse(localStorage.getItem('user'));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validate = () => {
    const newErrors = {};
    const { title, description, file } = formData;

    if (!title || title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long.';
    } else if (title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters.';
    }

    if (!description || description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long.';
    } else if (description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters.';
    }

    if (!file) {
      newErrors.file = 'Please upload a file.';
    } else {
      const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedFileTypes.includes(file.type)) {
        newErrors.file = 'Only JPG, PNG, or PDF files are allowed.';
      }
      const maxFileSize = 5 * 1024 * 1024;
      if (file.size > maxFileSize) {
        newErrors.file = 'File size cannot exceed 5 MB.';
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

    if (!validate()) {
      return;
    }

    const { title, description, file } = formData;

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('file', file);
    data.append('userId', user?.user_id); 
    data.append('userEmail', user?.user_email);
    data.append('userName', user?.user_name);

    try {
      await api.post('/posts/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Post created successfully!');
      setShow(false);
      setFormData({ title: '', description: '', file: null });
      setErrors({});
    } catch (error) {
      console.error('Error creating post', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      
      <button className="btn" onClick={handleShow}>
      <img className="icons" src={`${process.env.PUBLIC_URL}/assets/icons/plus-square.svg`} alt='Create post'/>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
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
                onChange={onFileChange}
                isInvalid={!!errors.file}
              />
              <Form.Control.Feedback type="invalid">
                {errors.file}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreatePost;
