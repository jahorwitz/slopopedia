import { useMutation, useQuery } from "@apollo/client";
import { isEmpty } from "lodash";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
import { Form } from "../../components/form";
import { CREATE_MOVIE, GET_MOVIES } from "../../graphql";
import { GET_KEYWORDS } from "../../graphql/get-keywords";
import titleImage from "../../images/Submit a slop.png";
import { CurrentUserContext } from "../../store/current-user-context";

export const SubmitSlopForm = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [createMovie] = useMutation(CREATE_MOVIE);
  const [submitted, setSubmitted] = useState(false);
  const [movieKeywords, setMovieKeywords] = useState([]);

  // Grab the keywords from the database
  const { data: keywordsData } = useQuery(GET_KEYWORDS);

  // Logic to upload image
  const [uploadImage] = useMutation(CREATE_MOVIE);

  const resetSubmitted = () => {
    setSubmitted(false);
  };

  const {
    register,
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
      photo: "",
      howToWatch: "",
      keywords: "",
    },
  });

  const {
    title,
    description,
    releaseYear,
    runtime,
    tomatoScore,
    howToWatch,
    keywords,
  } = getValues();

  const handleFormSubmit = (data) => {
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
            keywords: {
              connect: [...keywords, { id: keywords.id }],
            },
          },
        },
      });
      console.log("Data sent");
    } catch (err) {
      console.error("Error in createMovies request", err);
    }
  };

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

  // Function to check if movie ID is the same as the user Id
  const hasSubmittedMovie = !isEmpty(data?.movies);

  return (
    <div className="max-w-[1440px] relative m-auto">
      {hasSubmittedMovie && (
        <Link className="absolute right-0 mr-10 underline" to="/">
          View submitted
        </Link>
      )}
      <img src={titleImage} className="m-auto mt-10 mb-10"></img>
      <Form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={
          submitted
            ? `hidden`
            : `max-w-[453px] m-auto flex flex-col font-arialBold text-lg mb-10`
        }
      >
        <Form.TextInput
          value={title}
          errors={errors}
          register={register("title", {
            required: "Title is required",
            minLength: {
              value: 2,
              message: "Please enter 2 or more characters",
            },
          })}
          name="title"
          placeholder="Title"
          labelText="Title *"
          required
          onChange={(e) => {
            setValue("title", e.target.value, { shouldValidate: true });
          }}
          isValid={!errors.title}
        />
        {errors.title && <Form.Feedback message={errors.title.message} />}
        <Form.TextArea
          value={description}
          errors={errors}
          register={register("description", {
            required: "Description is required",
            minLength: {
              value: 20,
              message: "Be more descriptive, 20 characters are required.",
            },
          })}
          placeholder="Descritpion"
          labelText="Description *"
          onChange={(e) => {
            setValue("description", e.target.value, { shouldValidate: true });
          }}
          isValid={!errors.description}
        />
        {errors.description && (
          <Form.Feedback message={errors.description.message} />
        )}
        <div className="flex justify-between font-arialBold text-lg box-border ">
          <div className="flex flex-col">
            <Form.TextInput
              value={releaseYear}
              errors={errors}
              register={register("releaseYear", {
                minLength: {
                  value: 4,
                  message: "Please enter 4 or more characters",
                },
              })}
              placeholder="Release Year"
              labelText="Release Year"
              onChange={(e) => {
                setValue("releaseYear", e.target.value, {
                  shouldValidate: true,
                });
              }}
              isValid={!errors.releaseYear}
            />
            {errors.releaseYear && (
              <Form.Feedback message={errors.releaseYear.message} />
            )}
          </div>
          <div className="flex flex-col">
            <Form.TextInput
              value={runtime}
              placeholder="Runtime"
              labelText="Runtime"
              onChange={(e) => {
                setValue("runtime", e.target.value, { shouldValidate: true });
              }}
              isValid={!errors.runtime}
            />
          </div>
        </div>
        <Form.TextInput
          type="file"
          register={register("photo", { required: false })}
          accept="image/png, image/jpeg"
          labelText="Image"
          isValid={!isValid}
          // onChange={({
          //   target: {
          //     validity,
          //     files: [file],
          //   },
          // }) => {
          //   if (validity.valid)
          //     uploadImage({
          //       variables: {
          //         file,
          //       },
          //     });
          // }}
        />
        <div className="flex justify-between box-border font-arialBold text-lg">
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
            />
          </div>
        </div>
        <Form.Combobox
          nameKey="name"
          idKey="name"
          id="keywords"
          list={movieKeywords}
          value={keywords}
          errors={errors}
          register={register("keywords", {
            minLength: {
              value: 4,
              message: "Please enter 4 or more characters",
            },
          })}
          placeholder="Keywords"
          labelText="Keywords *"
          onChange={(e) => {
            setValue("keywords", e.target.value, { shouldValidate: true });
          }}
          isValid={!errors.keywords}
        />
        {errors.keywords && <Form.Feedback message={errors.keywords.message} />}
        <Form.Submit
          type="submit"
          title="yeah"
          className="w-full border-none"
          disabled={!isValid}
        />
      </Form>
      {/* If form is submitted, we are displaying a thank you message */}
      {submitted ? (
        <div className="flex gap-[200px] flex-col m-auto max-w-[672px] mt-[200px]">
          <p className="font-arialRegular text-lg text-center">
            Thanks for submitting a slop to our platform, dear goblin! Our team
            of professional slop goblins will review your submission and publish
            it,  if your slop is actually sloppy, and doesn’t repeat movies
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
  <Footer />;
};
