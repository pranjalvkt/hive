import { Button } from "react-bootstrap";
import { getImage } from "../../helper/utilities";
import { useNavigate } from "react-router-dom";

const FriendCard = (props) => {
  const { users, id, buttonProps } = props;
  const navigate = useNavigate();

  return (
    <>
      <li className="list-group-item border border-1 d-flex justify-content-between align-items-center my-2">
        <div
          className="d-flex align-items-center"
          onClick={() => navigate(`/user-profile/${users._id}`)}
        >
          <img
            src={getImage(users?.profilePic)}
            alt={users?.fullName}
            className="rounded-circle me-2"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
          {users?.fullName}
        </div>
        <div>
          {buttonProps &&
            buttonProps.map((item) => (
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
