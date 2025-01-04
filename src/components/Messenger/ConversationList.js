import React from "react";
import { Card, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ConversationList = () => {

  const conversations = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, are you free tomorrow?",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Can you send me the report?",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      name: "Michael Johnson",
      lastMessage: "Let's meet up next week!",
      timestamp: "1 day ago",
    },
  ];

  const navigate = useNavigate();

  const handleConversationClick = (id) => {
    // Navigate to the conversation view for the clicked conversation
    navigate(`/chat/${id}`);
  };

  return (
    <div className="container">
      <Card className="mt-4">
        <Card.Header>
          <h4>Conversations</h4>
        </Card.Header>
        <ListGroup variant="flush">
          {conversations.map((conversation) => (
            <ListGroupItem
              key={conversation.id}
              action
              onClick={() => handleConversationClick(conversation.id)}
              style={{
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
            >
              <Row>
                <Col xs={3} md={2}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${conversation.name}`}
                    alt={conversation.name}
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  />
                </Col>
                <Col xs={7} md={8}>
                  <strong>{conversation.name}</strong>
                  <p style={{ margin: 0, color: "#777" }}>
                    {conversation.lastMessage}
                  </p>
                </Col>
                <Col xs={2} md={2} className="text-end">
                  <small>{conversation.timestamp}</small>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default ConversationList;