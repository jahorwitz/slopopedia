import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_MOVIE } from "../graphql/queries/blog/get-movie-by-id";
import { Form } from "./form/index";
import { Header } from "./index";

export const EditSlop = () => {
  const { slopId } = useParams();
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: { id: slopId },
  });
  const navigate = useNavigate();

  useEffect(() => {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const slopData = data?.movie;

  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} class=" w-full max-w-[453px]">
          <Form.TextInput
            labelText="Title"
            value={slopData.title || ""}
            onChange={handleInputChange("title")}
          />
          <Form.TextInput
            labelText="Description"
            value={slopData.description || ""}
            onChange={handleInputChange("description")}
          />
          <Form.TextNumber
            labelText="Release Year"
            value={slopData.releaseYear || ""}
            onChange={handleInputChange("releaseYear")}
          />
          <Form.TextNumber
            labelText="Run Time"
            value={slopData.runtime || ""}
            onChange={handleInputChange("runtime")}
          />
          <Form.TextNumber
            labelText="Rotten Tomatoes Score"
            value={slopData.score || ""}
            onChange={handleInputChange("score")}
          />
          <Form.TextInput
            labelText="How to Watch"
            value={slopData.howToWatch || ""}
            onChange={handleInputChange("howToWatch")}
          />
          <Form.TextNumber
            labelText="Keywords"
            value={slopData.keyword || ""}
            onChange={handleInputChange("keyword")}
          />
          <Form.Submit title="Save Changes" />
        </form>
      </div>
      <div className="mb-10 mt-24">//add footer component here//</div>
    </>
  );
};
