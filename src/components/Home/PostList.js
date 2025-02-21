import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPostsRequest } from "../../actions/postsActions";
import Card from "../Card/Card";

const PostList = () => {
  const navigate = useNavigate();
  const { posts, loading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if(posts.length === 0) {
      dispatch(fetchPostsRequest(token));
    }
  }, [token, dispatch, posts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRedirect = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
        {posts.map((post) => (
          <Card key={post._id} post={post} handleRedirect={handleRedirect}/>
        ))}
      </div>
    </div>
  );
};

export default PostList;
