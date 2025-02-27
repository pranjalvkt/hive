import { getImage } from "../../helper/utilities";

const ShowPostModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <img
          src={getImage(post?.image_file)}
          alt={post?.title}
          className="w-full h-96 object-cover rounded-lg"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1531482615713-2afd69097998";
          }}
        />
        <h3 className="text-xl font-semibold mt-4">{post?.title}</h3>
        <p className="text-gray-600">{post?.likes} likes</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default ShowPostModal;