import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Image } from "react-bootstrap";
import { getImage } from "../../helper/utilities";
import { fetchPostByIdAPI } from "../../services/postsService";
import BeeLoader from "../Common/BeeLoader";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    fetchPostByIdAPI(id).then((post) => {
      setPost(post);
      setLoading(false);
      setError("");
    }).catch((error) => {
      if( error === 404) {
        setError("Post not found!");
        setLoading(false);
      } else {
        setError("Something went wrong! Please retry");
        setLoading(false);
      }
    })
  }, [id])

  let newPost = {
    ...post,
    likes: 42,
    comments: [
      { user: "Jane", text: "Wow, this looks amazing!" },
      { user: "Mike", text: "Great shot!" },
    ],
  };

  if (error) {
    return <div className="text-center text-muted">{error}</div>;
  }

  if (loading) {
    return <BeeLoader />
  }

  return (
    <Card className="shadow-sm p-3 mb-4">
      <Row>
        {/* Post Image */}
        <Col md={4}>
          <Image src={getImage(newPost?.image_file)} alt="Post" fluid rounded />
        </Col>

        {/* Post Content */}
        <Col md={8}>
          <Card.Body>
            {/* Username */}
            <Card.Title>{newPost.userName}</Card.Title>

            {/* Caption */}
            <Card.Text>{newPost.title}</Card.Text>

            {/* Likes */}
            {newPost.likes && (
              <Card.Text className="text-muted">
                <strong>Likes:</strong> {newPost.likes}
              </Card.Text>
            )}

            {/* Comments */}
            {newPost.comments && newPost.comments.length > 0 && (
              <div className="border-top pt-2">
                <Card.Text className="text-muted">
                    <strong>Comments:</strong> {newPost.comments.length}
                </Card.Text>
                <ul className="list-unstyled">
                  {newPost.comments.map((comment, index) => (
                    <li key={index} className="mt-1">
                      <strong>{comment.user}:</strong> {comment.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default Post;
