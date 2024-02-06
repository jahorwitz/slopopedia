import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "./index";
import { mockSlops } from "./SubmittedSlops";

export const EditSlop = () => {
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
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-3">Title</label>
            <input
              type="text"
              value={slopData.title || ""}
              onChange={handleInputChange("title")}
              className="w-[453px] h-[49px] border-2 border-gray-300"
            />
          </div>
          <div>
            <label className="block mb-3">Description</label>
            <textarea
              value={slopData.description || ""}
              onChange={handleInputChange("description")}
              className="w-[453px] h-[120px] border-2 border-gray-300"
            />
          </div>
          <div className="flex justify-between space-x-4">
            <div>
              <label className="block mb-3">Release Year</label>
              <input
                type="number"
                value={slopData.releaseYear || ""}
                onChange={handleInputChange("releaseYear")}
                className="w-[216px] h-[49px] border-2 border-gray-300"
              />
            </div>
            <div>
              <label className="block mb-3">Run Time</label>
              <input
                type="number"
                value={slopData.runtime || ""}
                onChange={handleInputChange("runtime")}
                className="w-[216px] h-[49px] border-2 border-gray-300"
              />
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <div>
              <label className="block mb-3">Rotten Tomatoes Score</label>
              <input
                type="number"
                value={slopData.score || ""}
                onChange={handleInputChange("score")}
                className="w-[216px] h-[49px] border-2 border-gray-300"
              />
            </div>
            <div>
              <label className="block mb-3">How to Watch</label>
              <input
                type="text"
                value={slopData.howToWatch || ""}
                onChange={handleInputChange("howToWatch")}
                className="w-[216px] h-[49px] border-2 border-gray-300"
              />
            </div>
          </div>
          <div>
            <label className="block mb-3">Keywords</label>
            <input
              type="text"
              value={slopData.keyword || ""}
              onChange={handleInputChange("keyword")}
              className="w-[453px] h-[49px] border-2 border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-[453px] mt-5 p-2 bg-blue-500 text-white rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
      <div className="mb-10 mt-24">//add footer component here//</div>
    </>
  );
};
