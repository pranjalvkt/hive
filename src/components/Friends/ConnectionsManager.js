import { useState, useCallback, useEffect } from "react";
import { FaUserPlus, FaEnvelope, FaTrash, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddedUserRequest,
  fetchPendingRequestRequest,
  fetchRecommendedUserRequest,
  fetchSentRequestRequest,
} from "../../actions/connectionAction";
import { getImage } from "../../helper/utilities";

const ConnectionsManager = () => {
  const [activeTab, setActiveTab] = useState("recommendations");
  const [showModal, setShowModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();

  const { connections, recommendation, sentRequest, pendingRequest } =
    useSelector((state) => state.connection);
  console.log(connections);

  useEffect(() => {
    if (token && !connections.length) {
      dispatch(fetchAddedUserRequest({ token }));
    }
  }, [dispatch, token, connections.length]);

  useEffect(() => {
    if (token && !recommendation.length) {
      dispatch(fetchRecommendedUserRequest({ token }));
    }
  }, [dispatch, token, recommendation.length]);

  useEffect(() => {
    if (token && !sentRequest.length) {
      dispatch(fetchSentRequestRequest({ token }));
    }
  }, [dispatch, token, sentRequest.length]);

  useEffect(() => {
    if (token && !pendingRequest.length) {
      dispatch(fetchPendingRequestRequest({ token }));
    }
  }, [dispatch, token, pendingRequest.length]);

  const handleConnect = useCallback((id) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleRemoveConnection = useCallback((connection) => {
    setSelectedConnection(connection);
    setShowModal(true);
  }, []);

  const confirmRemoveConnection = useCallback(() => {
    setShowModal(false);
    setSelectedConnection(null);
  }, []);

  const Modal = ({ isOpen, onClose, connection }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-xl font-semibold mb-4">Remove Connection</h3>
          <p className="mb-4">
            Are you sure you want to remove {connection?.name} from your
            connections?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmRemoveConnection}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ConnectionCard = ({ connection, type, connectionId }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <img
          src={getImage(connection?.profilePic)}
          alt={connection?.fullName}
          className="w-16 h-16 rounded-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1511367461989-f85a21fda167";
          }}
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{connection?.fullName}</h3>
          <p className="text-gray-600">{connection?.role}</p>
          {connection?.company && (
            <p className="text-gray-500 text-sm">{connection?.company}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {type === "recommendation" && (
            <button
              onClick={() => handleConnect(connection._id)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaUserPlus />
              )}
              Connect
            </button>
          )}
          {type === "connection" && (
            <>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <FaEnvelope />
                Message
              </button>
              <button
                onClick={() => handleRemoveConnection(connectionId)}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                <FaTrash />
                Remove
              </button>
            </>
          )}
          {type === "sent" && (
            <button
              onClick={() => handleRemoveConnection(connectionId)}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <FaTrash />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Connections</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setActiveTab("recommendations")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "recommendations"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Recommendations
          </button>
          <button
            onClick={() => setActiveTab("connections")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "connections"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Your Connections
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "sent"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Sent Requests
          </button>
        </div>

        {activeTab === "connections" && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search connections..."
              className="w-full md:w-96 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === "recommendations" &&
            recommendation.map((item) => (
              <ConnectionCard
                connectionId={item?.connectionId}
                key={item?.connectionId}
                connection={item}
                type="recommendation"
              />
            ))}

          {activeTab === "connections" &&
            connections
              .filter((connection) =>
                connection?.user?.fullName
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((connection) => (
                <ConnectionCard
                  connectionId={connection?.connectionId}
                  key={connection?.connectionId}
                  connection={connection?.user}
                  type="connection"
                />
              ))}

          {activeTab === "sent" &&
            sentRequest.map((request) => (
              <ConnectionCard
                connectionId={request?.connectionId}
                key={request?.connectionId}
                connection={request?.receiver}
                type="sent"
              />
            ))}
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          connection={selectedConnection}
        />
      </div>
    </div>
  );
};

export default ConnectionsManager;
