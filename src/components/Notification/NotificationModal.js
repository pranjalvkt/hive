import React from "react";
import { Modal, Button } from "react-bootstrap";

const NotificationModal = ({ show, handleClose }) => {
  const notifications = [
    { id: 1, message: "You have a new friend request from Jane Smith." },
    { id: 2, message: "Your post was liked by John Doe." },
    { id: 3, message: "Michael Brown commented on your post." },
    { id: 4, message: "You have 3 new notifications." }
  ];

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {notifications.length > 0 ? (
          <ul className="list-group">
            {notifications.map((notification) => (
              <li key={notification.id} className="list-group-item">
                {notification.message}
              </li>
            ))}
          </ul>
        ) : (
          <p>No new notifications.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;