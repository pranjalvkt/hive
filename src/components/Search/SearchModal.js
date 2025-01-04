import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Assuming you're using Bootstrap for modals

const SearchModal = ({ show, handleClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  
  const handleSearch = (e) => {
    setQuery(e.target.value);
    // Here you can implement the logic to fetch data based on the query
    // For now, let's just simulate some results based on the query
    if (query) {
      const simulatedResults = ["John Doe", "Jane Smith", "James Brown"].filter(name =>
        name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(simulatedResults);
    } else {
      setResults([]);
    }
  };

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
          onChange={handleSearch}
        />
        {query && (
          <div className="mt-3">
            <h5>Results:</h5>
            <ul className="list-unstyled">
              {results.length > 0 ? (
                results.map((result, index) => (
                  <li key={index}>{result}</li>
                ))
              ) : (
                <li>No results found</li>
              )}
            </ul>
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