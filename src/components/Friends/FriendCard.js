import { Button } from "react-bootstrap";
import { getImage } from "../../helper/utilities";

const FriendCard = (props) => {
    const {users, id, handlerFunction, type} = props;
  return (
    <>
      <li
        key={users?._id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div className="d-flex align-items-center">
          <img
            src={getImage(users?.profilePic)}
            alt={users?.fullName}
            className="rounded-circle me-2"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
          {users?.fullName} (@{users?.email})
        </div>
        <Button
          variant={type === "Add Friend" ? 'primary' : "danger"}
          onClick={() => handlerFunction(id)}
        >
          {type}
        </Button>
      </li>
    </>
  );
};
export default FriendCard;
