import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddedUserRequest, fetchRecommendedUserRequest } from "../../actions/connectionAction";
import { getImage } from "../../helper/utilities";
import FriendCard from "./FriendCard";

const FriendsList = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    dispatch(fetchAddedUserRequest({token}));
    dispatch(fetchRecommendedUserRequest({token}));
  }, [])

  const {connections, recommendation} = useSelector((state) => state.connection);
  console.log(connections);
  

  const handleAddFriend = (personId) => {
    console.log("add friend", personId);
    
  };

  const handleRemoveFriend = (connectionId) => {
    console.log("connection id", connectionId);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* People you can add (left column) */}
        <div className="col-md-6">
          <h3>People You Can Add</h3>
          <ul className="list-group">
            {recommendation.map(person => (
              <FriendCard 
                key={person._id}
                users={person} 
                handlerFunction={handleAddFriend} 
                id={person._id} 
                type={'Add Friend'}
              />
            ))}
          </ul>
        </div>

        {/* Your Friends (right column) */}
        <div className="col-md-6">
          <h3>Your Friends</h3>
          <ul className="list-group">
            {connections.map(friend => (
              <FriendCard 
                key={friend.connectionId}
                users={friend?.receiver} 
                handlerFunction={handleRemoveFriend} 
                id={friend?.connectionId} 
                type={'Remove Friend'}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
