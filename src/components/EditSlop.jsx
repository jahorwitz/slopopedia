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

  const [slopData, setSlopData] = useState({
    title: "",
    description: "",
    howToWatch: "",
    releaseYear: "",
    runtime: "",
    tomatoScore: "",
  });

  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: {
      where: { id: slopId },
    },
  });

  const [editMovie, { loading: editing, error: editError }] = useMutation(
    EDIT_MOVIE,
    {
      refetchQueries: [
        { query: GET_MOVIE, variables: { where: { id: slopId } } },
      ],
    }
  );

  useEffect(() => {
    if (data && data.movie) {
      setSlopData(data.movie);
      setSelectedKeywords(
        data.movie.keywords.map((kw) => ({ id: kw.id, name: kw.name }))
      );
    }
  }, [data]);

  const handleKeywordChange = (newKeywords) => {
    setSelectedKeywords(newKeywords);
  };

  const handleInputChange = (fieldname) => (event) => {
    setSlopData({ ...slopData, [fieldname]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const releaseYearInt = parseInt(slopData.releaseYear, 10);
    const tomatoScoreInt = parseInt(slopData.tomatoScore, 10);
    const runtimeInt = parseInt(slopData.runtime, 10);

    console.log("Selected Keywords:", selectedKeywords);

    const updatedMovieData = {
      title: slopData.title,
      description: slopData.description,
      howToWatch: slopData.howToWatch,
      releaseYear: releaseYearInt,
      runtime: runtimeInt,
      tomatoScore: tomatoScoreInt,
      keywords: {
        connect: selectedKeywords.map((keyword) => ({ id: keyword.id })),
      },
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
  if (!slopData) return <div>Loading movie data...</div>;

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
          <Form.TextArea
            labelText="Description"
            value={slopData.description || ""}
            onChange={handleInputChange("description")}
            className="mb-4 h-[120px]"
          />
          <div className="flex gap-5 mb-4">
            <Form.TextNumber
              labelText="Release Year"
              value={slopData.releaseYear || ""}
              onChange={handleInputChange("releaseYear")}
              className="w-[216.5px]"
            />
            <Form.TextNumber
              labelText="Run Time"
              value={slopData.runtime || ""}
              onChange={handleInputChange("runtime")}
              className="w-[216.5px]"
            />
          </div>
          <div className="flex gap-5 mb-4">
            <Form.TextNumber
              labelText="Rotten Tomato Score"
              value={slopData.tomatoScore || ""}
              onChange={handleInputChange("tomatoScore")}
              className="w-[216.5px]"
            />
            <Form.TextInput
              labelText="How to Watch"
              value={slopData.howToWatch || ""}
              onChange={handleInputChange("howToWatch")}
              className="w-[216.5px]"
            />
          </div>
          <Form.Combobox
            id="keywords"
            labelText="Keywords"
            list={selectedKeywords}
            selectedItems={selectedKeywords}
            onSelectionChange={handleKeywordChange}
            nameKey="name"
            idKey="name"
          />
          <Form.Submit title="Save Changes" />
        </form>
      </div>
      <div className="mb-10 mt-24">//add footer component here//</div>
    </>
  );
};
