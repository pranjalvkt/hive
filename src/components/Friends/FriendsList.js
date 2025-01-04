import React, { useState } from "react";
import { Button } from "react-bootstrap"; // Importing Bootstrap Button

const FriendsList = () => {
  // Sample list of people accounts (you could replace this with an API call)
  const allPeople = [
    { id: 1, name: "Alice", username: "alice123" },
    { id: 2, name: "Bob", username: "bob456" },
    { id: 3, name: "Charlie", username: "charlie789" },
    { id: 4, name: "Diana", username: "diana101" },
    { id: 5, name: "Eve", username: "eve202" }
  ];
  const initialFriends = [
    { id: 1, name: "John Doe", username: "johndoe" },
    { id: 2, name: "Jane Smith", username: "janesmith" },
    { id: 3, name: "Emily Davis", username: "emilydavis" },
    { id: 4, name: "Michael Brown", username: "michaelbrown" },
    { id: 5, name: "Sarah Wilson", username: "sarahwilson" },
    { id: 6, name: "David Johnson", username: "davidjohnson" },
    { id: 7, name: "Laura Martinez", username: "lauramartinez" },
    { id: 8, name: "Chris Lee", username: "chrislee" },
    { id: 9, name: "Megan Clark", username: "meganclark" },
    { id: 10, name: "Andrew Walker", username: "andrewwalker" }
  ];
  

  // State to track friends and people to add
  const [friends, setFriends] = useState(initialFriends);
  const [people, setPeople] = useState(allPeople);

  // Function to handle adding a friend
  const handleAddFriend = (person) => {
    if (!friends.some(friend => friend.id === person.id)) {
      setFriends([...friends, person]);
      setPeople(people.filter(p => p.id !== person.id)); // Remove from "people to add"
    }
  };

  // Function to handle removing a friend
  const handleRemoveFriend = (person) => {
    setFriends(friends.filter(friend => friend.id !== person.id));
    setPeople([...people, person]); // Add back to the people list
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* People you can add (left column) */}
        <div className="col-md-6">
          <h3>People You Can Add</h3>
          <ul className="list-group">
            {people.map(person => (
              <li key={person.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>{person.name} (@{person.username})</div>
                <Button variant="primary" onClick={() => handleAddFriend(person)}>
                  Add Friend
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Your Friends (right column) */}
        <div className="col-md-6">
          <h3>Your Friends</h3>
          <ul className="list-group">
            {friends.map(friend => (
              <li key={friend.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>{friend.name} (@{friend.username})</div>
                <Button variant="danger" onClick={() => handleRemoveFriend(friend)}>
                  Remove Friend
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
