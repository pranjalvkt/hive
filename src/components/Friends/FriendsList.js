import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acceptRequestRequest, fetchAddedUserRequest, fetchPendingRequestRequest, fetchRecommendedUserRequest, fetchSentRequestRequest, rejectRequestRequest, removeRequestRequest, sendRequestRequest } from "../../actions/connectionAction";
import FriendCard from "./FriendCard";
import GenericModal from "../Common/GenericModal";

const FriendsList = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  const [modalState, setModalState] = useState({
    show: false,
    actionType: "",
    connectionId: null,
  });

  useEffect(() => {
    dispatch(fetchAddedUserRequest({token}));
    dispatch(fetchRecommendedUserRequest({token}));
    dispatch(fetchSentRequestRequest({token}));
    dispatch(fetchPendingRequestRequest({token}));
  }, [token, dispatch])

  const { 
    connections, 
    recommendation, 
    sentRequest, 
    pendingRequest 
  } = useSelector((state) => state.connection);

  const openModal = (actionType, connectionId) => {
    setModalState({
      show: true,
      actionType,
      connectionId,
    });
  };

  const closeModal = () => {
    setModalState({
      show: false,
      actionType: "",
      connectionId: null,
    });
  };

  const handleConfirmAction = () => {
    const { actionType, connectionId } = modalState;
    const data = {
      connectionId: connectionId,
    }

    if (actionType === "remove") {
      dispatch(removeRequestRequest({ token, data }));
    } else if (actionType === "reject") {
      dispatch(rejectRequestRequest({ token, data }));
    } else if (actionType === "cancel") {
      dispatch(removeRequestRequest({ token, data }));
    }

    closeModal();
  };


  const handleAddFriend = (personId) => {
    dispatch(sendRequestRequest({token, personId}));
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
        <div className="col-md-6">
          <h3>People You Can Add</h3>
          <ul className="list-group">
            {recommendation && recommendation.map(person => (
              <FriendCard 
                key={person._id}
                buttonProps={
                  [
                    {func: handleAddFriend, text: 'Add Friend', variant: "primary"}
                  ]
                }
                users={person} 
                id={person._id} 
              />
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h3>Your Friends</h3>
          <ul className="list-group">
            {connections && connections.map(friend => (
              <FriendCard 
                buttonProps={
                  [
                    {
                      func: () => openModal("remove", friend.connectionId), 
                      text: 'Remove Friend', 
                      variant: "danger"}
                  ]
                }
                key={friend?.connectionId}
                users={friend?.user}
                id={friend?.connectionId} 
              />
            ))}
          </ul>
        </div>

        <div className="col-md-6 my-5">
          <h3>Sent Requests</h3>
          <ul className="list-group">
            {sentRequest && sentRequest.map(friend => (
              <FriendCard 
                buttonProps={
                  [
                    {
                      func: () => openModal("cancel", friend.connectionId), 
                      text: 'Cancel', 
                      variant: "danger"}
                  ]
                }
                key={friend.connectionId}
                users={friend?.receiver} 
                id={friend?.connectionId} 
              />
            ))}
          </ul>
        </div>

        <div className="col-md-6 my-5">
          <h3>Received Requests</h3>
          <ul className="list-group">
            {pendingRequest && pendingRequest.map(friend => (
              <FriendCard 
                buttonProps={
                  [
                    {
                      func: () => openModal("reject", friend.connectionId), 
                      text: 'Reject', 
                      variant: "danger"
                    }, 
                    {
                      func: handleAcceptFriend, 
                      text: 'Accept', 
                      variant: "primary"
                    }
                  ]
                }
                key={friend.connectionId}
                users={friend?.sender}
                id={friend?.connectionId}
              />
            ))}
          </ul>
        </div>
      </div>
      <GenericModal
        show={modalState.show}
        title="Confirm Action"
        body={`Are you sure you want to ${
          modalState.actionType === "remove"
            ? "remove this friend"
            : modalState.actionType === "reject"
            ? "reject this request"
            : "cancel this request"
        }?`}
        onClose={closeModal}
        onConfirm={handleConfirmAction}
        confirmText="Yes, Proceed"
        cancelText="No, Cancel"
        confirmVariant="danger"
        cancelVariant="secondary"
      />
    </div>
  );
};

export default FriendsList;
