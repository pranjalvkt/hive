import { Button } from "react-bootstrap";
import { getImage } from "../../helper/utilities";

const FriendCard = (props) => {
  const {
    users,
    id,
    buttonProps,
  } = props;

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
          {buttonProps && buttonProps.map((item) => (
            <Button
              className="mx-2"
              variant={item.variant}
              onClick={() => item.func(id)}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </li>
    </>
  );
};
export default FriendCard;
