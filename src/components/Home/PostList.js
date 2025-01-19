import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsRequest } from "../../actions/postsActions";
import Card from "../Card/Card";

const PostList = () => {
  const { posts, loading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    dispatch(fetchPostsRequest(token));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-list">
      <div className="d-sm-flex justify-content-sm-around">
        {posts.map((post) => (
          <Card key={post._id} post={post}/>
        ))}
      </div>
    </div>
  );
};

export default PostList;
