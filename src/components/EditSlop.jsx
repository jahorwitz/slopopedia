import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EDIT_MOVIE } from "../graphql/mutations/edit-slop-submission";
import { GET_MOVIE } from "../graphql/queries/get-movie-by-id";
import { Form } from "./form/index";
import { Header } from "./index";

export const EditSlop = () => {
  const { slopId } = useParams();
  const navigate = useNavigate();
  const [slopData, setSlopData] = useState();

  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: {
      where: { id: slopId },
    },
  });

  const [editMovie, { loading: editing, error: editError }] =
    useMutation(EDIT_MOVIE);

  useEffect(() => {
    setSlopData(data ? data.movie : null);
  }, [data]);

  const handleInputChange = (fieldname) => (event) => {
    setSlopData({ ...slopData, [fieldname]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedMovieData = {
      title: slopData.title,
      description: slopData.description,
      howToWatch: slopData.howToWatch,
      keyword: slopData.keyword,
      releaseYear: slopData.releaseYear,
      runtime: slopData.runtime,
      tomatoesScore: slopData.tomatoesScore,
    };

    try {
      const response = await editMovie({
        variables: {
          where: { id: slopId },
          data: updatedMovieData,
        },
      });

      console.log("Update successful", response);
      navigate("/submit-list");
    } catch (e) {
      console.error("Error updating movie", e);
    }
  };

  if (loading) return <div>Loading movie data...</div>;
  if (error) return <div>Error loading movie: {error.message}</div>;

  if (editing) return <div>Updating movie...</div>;
  if (editError) return <div>Error updating movie: {editError.message}</div>;

  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className=" w-full max-w-[453px]">
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
            value={slopData.tomatoesScore || ""}
            onChange={handleInputChange("tomatoesScore")}
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
