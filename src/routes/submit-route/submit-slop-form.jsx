import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form } from "../../components";
import { CREATE_MOVIE, GET_MOVIES } from "../../graphql";
import { GET_KEYWORDS } from "../../graphql/get-keywords";
import { useCurrentUser } from "../../hooks";
import titleImage from "../../images/Submit a slop.png";

export const SubmitSlopForm = () => {
  const { currentUser } = useCurrentUser();
  const [createMovie] = useMutation(CREATE_MOVIE);
  const [submitted, setSubmitted] = useState(false);
  const [movieKeywords, setMovieKeywords] = useState([]);
  const [movieSubmitted, setMovieSubmitted] = useState(false);

  // Grab the keywords from the database
  const { data: keywordsData } = useQuery(GET_KEYWORDS);

  // If we have keywords, then setMovieKeywords to the data in the response
  useEffect(() => {
    if (keywordsData) {
      setMovieKeywords(keywordsData.keywords);
    }
  }, [keywordsData]);

  // Reseting submitted data so we can submit another if the user wants
  const resetSubmitted = () => {
    setSubmitted(false);
    setMovieSubmitted(true);
  };

  // React hook form variables and default form values
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      releaseYear: "",
      runtime: "",
      tomatoScore: "",
      howToWatch: "",
      keywords: [],
    },
  });

  // Gettting the form values with useForm
  const {
    title,
    description,
    releaseYear,
    runtime,
    tomatoScore,
    howToWatch,
    keywords,
  } = getValues();

  // Handle submit function. The constants are expected to be integers so we need to run parseInt to make the default string value and integer
  const handleFormSubmit = async (data) => {
    setSubmitted(true);
    const releaseYearInt = parseInt(data.releaseYear);
    const runTimeInt = parseInt(data.runtime);
    const tomatoScoreInt = parseInt(data.tomatoScore);
    try {
      createMovie({
        variables: {
          data: {
            author: {
              connect: {
                id: currentUser.id,
              },
            },
            title,
            description,
            releaseYear: releaseYearInt,
            runtime: runTimeInt,
            tomatoScore: tomatoScoreInt,
            howToWatch,
            // photo: {
            //   upload: data.photo
            // },
            keywords: {
              connect: keywords.map((keyword) => ({
                id: keyword.id,
              })),
            },
          },
        },
      });
      console.log("Data sent");
      hasSubmittedMovie();
    } catch (err) {
      console.error("Error in createMovies request", err);
    }
  };

  // useEffect that resets our values when the form is submitted
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        title: "",
        description: "",
        releaseYear: "",
        runtime: "",
        tomatoScore: "",
        howToWatch: "",
        keywords: "",
      });
    }
  }, [isSubmitSuccessful]);

  // Querying movies and adding the needed, variables. Setting the author id to the user.id
  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: { where: { author: { id: { equals: currentUser.id } } } },
  });

  // If there is data or movies, call the hasSubmittedMovies function
  useEffect(() => {
    if (data) {
      hasSubmittedMovie();
    }
  }, [data]);

  // If the data length is great than 0, controll the movie state
  const hasSubmittedMovie = () => {
    if (data && data.movies.length > 0) {
      setMovieSubmitted(true);
    } else {
      setMovieSubmitted(false);
    }
  };

  return (
    <div className="max-w-[1440px] relative m-auto">
      {/* Conditionally render this Link if the user has submitted movies */}
      {movieSubmitted && (
        <Link
          className="xs:hidden block absolute right-0 mr-10 underline"
          to="/submitted-list"
        >
          View submitted
        </Link>
      )}
      <img src={titleImage} className="m-auto mt-10 mb-10"></img>
      <Form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={
          submitted
            ? `hidden`
            : ` xs:w-[300px] sm:w-[453px] md:w-[453px] lg:w-[453px] xl:w-[453px] m-auto flex flex-col font-arialBold text-lg mb-10`
        }
      >
        <Form.TextInput
          value={title}
          errors={errors}
          register={register("title", {
            required: "Title is required",
          })}
          name="title"
          placeholder="Title"
          labelText="Title *"
          required
          onChange={(e) => {
            setValue("title", e.target.value, { shouldValidate: true });
          }}
          isValid={!errors.title}
          classNameInput="bg-white"
        />
        {errors.title && <Form.Feedback message={errors.title.message} />}
        <Form.TextArea
          value={description}
          errors={errors}
          register={register("description", {
            required: "Description is required",
          })}
          placeholder="Descritpion"
          labelText="Description *"
          onChange={(e) => {
            setValue("description", e.target.value, { shouldValidate: true });
          }}
          isValid={!errors.description}
          classNameTextArea="bg-white"
        />
        {errors.description && (
          <Form.Feedback message={errors.description.message} />
        )}
        <div className="xs:flex-col sm:flex md:flex lg:flex xl:flex justify-between font-arialBold text-lg box-border ">
          <div className="flex flex-col">
            <Form.TextInput
              required
              maxLength={4}
              value={releaseYear}
              errors={errors}
              register={register("releaseYear", {
                required: "Release Year is required",
                minLength: {
                  value: 4,
                  message: "Please enter 4 digits",
                },
              })}
              placeholder="Release Year"
              labelText="Release Year *"
              onChange={(e) => {
                if (!isNaN(e.target.value) && e.target.value !== " ") {
                  setValue("releaseYear", e.target.value, {
                    shouldValidate: true,
                  });
                }
              }}
              isValid={!errors.releaseYear}
              classNameInput="bg-white"
            />
            {errors.releaseYear && (
              <Form.Feedback message={errors.releaseYear.message} />
            )}
          </div>
          <div className="flex flex-col">
            <Form.TextInput
              required
              maxLength={3}
              value={runtime}
              errors={errors}
              register={register("runtime", {
                required: "Runtime is required",
              })}
              placeholder="Runtime"
              labelText="Runtime *"
              onChange={(e) => {
                if (!isNaN(e.target.value) && e.target.value !== " ") {
                  setValue("runtime", e.target.value, { shouldValidate: true });
                }
              }}
              isValid={!errors.runtime}
              classNameInput="bg-white"
            />
            {errors.runtime && (
              <Form.Feedback message={errors.runtime.message} />
            )}
          </div>
        </div>
        {/* // For future use */}
        {/* <Form.FileDrop
          id="photo"
          labelText="Image"
          watch={watch}
          setValue={setValue}
          onChange={(file) => setValue("photo", file)}
        >
          Drop File here
        </Form.FileDrop> */}
        <div className="xs:flex-col sm:flex md:flex lg:flex xl:flex justify-between box-border font-arialBold text-lg">
          <div className="flex flex-col">
            <Form.TextInput
              value={tomatoScore}
              register={register("tomatoScore", {
                pattern: {
                  value: /^\d+%/,
                  message: "Must be a percent",
                },
              })}
              placeholder="Rotten Tomatoes Score"
              labelText="Rotten Tomatoes Score"
              onChange={(e) => {
                setValue("tomatoScore", e.target.value, {
                  shouldValidate: true,
                });
              }}
              isValid={!errors.tomatoScore}
              classNameInput="bg-white"
            />
            {errors.tomatoScore && (
              <Form.Feedback message={errors.tomatoScore.message} />
            )}
          </div>
          <div className="flex flex-col">
            <Form.TextInput
              value={howToWatch}
              placeholder="How To Watch"
              labelText="How To Watch"
              onChange={(e) => {
                setValue("howToWatch", e.target.value, {
                  shouldValidate: true,
                });
              }}
              isValid={!errors.howToWatch}
              classNameInput="bg-white"
            />
          </div>
        </div>
        <Form.Combobox
          list={movieKeywords}
          watch={watch}
          setValue={setValue}
          labelText={"Keywords"}
          placeholder={"Choose Keywords"}
          id={"keywords"}
          nameKey={"name"}
          idKey={"name"}
          name={"Keywords"}
          classNameCombo="bg-white"
        />
        {errors.keywords && <Form.Feedback message={errors.keywords.message} />}
        <Form.Submit
          type="submit"
          title="yeah"
          className="w-full border-none"
          disabled={!isValid}
        />
        <Link
          className="xs:block hidden font-arialRegular m-auto mt-4 underline"
          to="/submitted-slops"
        >
          View submitted
        </Link>
      </Form>
      {/* If form is submitted, we are displaying a thank you message */}
      {submitted ? (
        <div className="flex gap-[200px] flex-col m-auto max-w-[672px] mt-[200px]">
          <p className="font-arialRegular text-lg text-center">
            Thanks for submitting a slop to our platform, dear goblin! Our team
            of professional slop goblins will review your submission and publish
            it, if your slop is actually sloppy, and doesn’t repeat movies
            already published here
          </p>
          <button
            onClick={resetSubmitted}
            className="m-auto w-[453px] border-none font-bold font-arial text-lg/4 border py-4 px-4 bg-yellow"
          >
            Submit another one?
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
