import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockSlops } from "./SubmittedSlops";

const EditSlop = () => {
  const [slopData, setSlopData] = useState(null);
  const { slopId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // When findSlopById is available, will use that with a version of the commented code
    // const data = getSlopById(slopId);
    // setSlopData(data);

    // For now retrieving the slop data by ID from hard coded slops
    const foundSlop = mockSlops.find((slop) => slop.id === slopId);
    setSlopData(foundSlop);
  }, [slopId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/submit-list");
  };

  const handleInputChange = (fieldname) => (event) => {
    setSlopData({ ...slopData, [fieldname]: event.target.value });
  };

  if (!slopData) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={slopData.title || ""}
        onChange={handleInputChange}
      />
      <input
        type="number"
        value={slopData.releaseYear || ""}
        onChange={handleInputChange}
      />
      <input
        type="number"
        value={slopData.runtime || ""}
        onChange={handleInputChange}
      />
      <input
        type="number"
        value={slopData.score || ""}
        onChange={handleInputChange}
      />
      <input
        type="text"
        value={slopData.howToWatch || ""}
        onChange={handleInputChange}
      />

      <button type="submit">Save Changes</button>
    </form>
  );
};
