import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acceptRequestRequest, fetchAddedUserRequest, fetchPendingRequestRequest, fetchRecommendedUserRequest, fetchSentRequestRequest, rejectRequestRequest, removeRequestRequest, sendRequestRequest } from "../../actions/connectionAction";
import FriendCard from "./FriendCard";

const FriendsList = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    dispatch(fetchAddedUserRequest({token}));
    dispatch(fetchRecommendedUserRequest({token}));
    dispatch(fetchSentRequestRequest({token}));
    dispatch(fetchPendingRequestRequest({token}));
  }, [])

  const { 
    connections, 
    recommendation, 
    sentRequest, 
    pendingRequest 
  } = useSelector((state) => state.connection);

  const handleAddFriend = (personId) => {
    dispatch(sendRequestRequest({token, personId}));
  };

  const handleRemoveFriend = (connectionId) => {
    const data = {
      connectionId: connectionId,
    }
    dispatch(removeRequestRequest({token, data}))
  };

  const handleRejectFriend = (connectionId) => {
    const data = {
      connectionId: connectionId,
    }
    dispatch(rejectRequestRequest({token, data}));
  };

  const handleAcceptFriend = (connectionId) => {
    const data = {
      connectionId: connectionId,
    }
    dispatch(acceptRequestRequest({token, data}));
  }

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
                handlerFunctionBtn={handleAddFriend} 
                buttonText={'Add Friend'}
                id={person._id} 
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
                key={friend?.connectionId}
                users={friend?.user} 
                handlerFunctionBtn={handleRemoveFriend} 
                buttonText={'Remove Friend'}
                id={friend?.connectionId} 
              />
            ))}
          </ul>
        </div>

        <div className="col-md-6 my-5">
          <h3>Sent Requests</h3>
          <ul className="list-group">
            {sentRequest.map(friend => (
              <FriendCard 
                key={friend.connectionId}
                users={friend?.receiver} 
                handlerFunctionBtn={handleRemoveFriend} 
                buttonText={'Cancel'}
                id={friend?.connectionId} 
              />
            ))}
          </ul>
        </div>

        <div className="col-md-6 my-5">
          <h3>Received Requests</h3>
          <ul className="list-group">
            {pendingRequest.map(friend => (
              <FriendCard 
                key={friend.connectionId}
                users={friend?.sender} 
                handlerFunctionBtn={handleRejectFriend} 
                buttonText={'Reject'}
                acceptFunction={handleAcceptFriend}
                acceptText={'Accept'}
                id={friend?.connectionId}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
