import React, { useEffect, useState } from "react";
import api from "../../helper/api";
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const calculateTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const creationTime = new Date(createdAt);

    const timeDifference = currentTime - creationTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timeAgo = '';
    if (days > 0) {
      timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      timeAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      timeAgo = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }

    return timeAgo;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts(); 
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="post-list">
      <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
        {posts.map((post) => (
          <div key={post._id} className="col">
            <div className="card w-50">
              <div className="card-header">
                {post.userName}
              </div>
              <img
                src={`http://localhost:3001/api/posts/image/${post._id}`}
                className="card-img-top"
                alt={post.title}
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">
                  Last updated {calculateTimeAgo(post.createdAt)}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;