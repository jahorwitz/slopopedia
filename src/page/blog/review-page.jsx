export const Review = ({ title, date, author, content, onEdit, onDelete }) => {
  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">{/* Empty div for spacing */}</div>
        <div className="flex flex-col space-y-2">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500">{`By ${author}, ${date}`}</p>
      </div>
      <div className="space-y-2">
        {content.split("\n").map((paragraph, index) => (
          <p key={index} className="text-gray-700 text-base">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};
