import { Button } from "react-bootstrap";
import { getImage } from "../../helper/utilities";

const FriendCard = (props) => {
  const {users, id, buttonText, handlerFunctionBtn, acceptText, acceptFunction} = props;
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
          {users?.fullName}
        </div>
        <div>
        <Button
          className="mx-2"
          variant={buttonText === "Add Friend" ? 'primary' : "danger"}
          onClick={() => handlerFunctionBtn(id)}
        >
          {buttonText}
        </Button>
        {acceptText && <Button
          className="mx-2"
          variant='primary'
          onClick={() => acceptFunction(id)}
        >
          {acceptText}
        </Button>}
        </div>
        
      </li>
    </>
  );
};
export default FriendCard;
