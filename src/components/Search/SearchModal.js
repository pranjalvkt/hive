import { useState, useMemo } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { debounce } from "../../helper/utilities";
import { useDispatch, useSelector } from "react-redux";
import { searchUserRequest } from "../../actions/userAction";

const SearchModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const{ searchResult, searchLoading } = useSelector((state) => state.user);
  
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("authToken");

  const fetchResults = useMemo(
    () =>
      debounce(async (searchTerm) => {
        if (!searchTerm) return;
        dispatch(searchUserRequest({ query: searchTerm, token }));
      }, 300),
    [dispatch, token]
  );

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => {
              fetchResults(e.target.value);
              setQuery(e.target.value);
            }
          }
        />
        {query && (
          <div className="mt-3">
            <h5>Results:</h5>
            {searchLoading ? (
              <p>Loading...</p>
            ) : (
              <ul className="list-unstyled">
                {searchResult.length > 0 ? (
                  searchResult.map((result) => <li key={result._id}>{result.fullName}</li>)
                ) : (
                  <li>No results found</li>
                )}
              </ul>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModal;
