import React from "react";
import { Modal, Button } from "react-bootstrap";

const ShareModal = ({ show, handleClose, handleShare }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Share Post</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>Choose a platform to share this post:</p>
        <div className="d-flex justify-content-around">
          <Button variant="success" onClick={() => handleShare("whatsapp")}>
            WhatsApp
          </Button>
          <Button variant="primary" onClick={() => handleShare("facebook")}>
            Facebook
          </Button>
          <Button variant="info" onClick={() => handleShare("twitter")}>
            Twitter
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal;
