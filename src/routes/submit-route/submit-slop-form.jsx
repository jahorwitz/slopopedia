import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../components/form";
import { CREATE_MOVIE } from "../../graphql/create-movie";
import titleImage from "../../images/Submit a slop.png";

export const SubmitSlopForm = () => {
  const [createMovie, { data, loading, error }] = useMutation(CREATE_MOVIE);
  const [submitted, setSubmitted] = useState(false);

  const resetSubmitted = () => {
    setSubmitted(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      releaseYear: "",
      runtime: "",
      image: "",
      tomatoScore: "",
      howToWatch: "",
      keywords: "",
    },
  });

  //* Handling the form submit, getting the needed values and converting the default string values to integers as our request expects
  const handleFormSubmit = (data) => {
    const { title, description, howToWatch } = getValues();
    setSubmitted(true);
    const releaseYearInt = parseInt(data.releaseYear);
    const runTimeInt = parseInt(data.runTime);
    const scoreInt = parseInt(data.tomotoScore);
    try {
      createMovie({
        variables: {
          data: {
            title,
            description,
            releaseYear: releaseYearInt,
            //? Get the variables below to send
            runtime: runTimeInt,
            tomatoScore: scoreInt,
            howToWatch,
          },
        },
      });
      console.log("Data sent");
    } catch (err) {
      console.error("Error in createMovies request", err);
    }
  };

  return (
    <>
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
          labelText={"Title *"}
          required
          onChange={(e) => {
            setValue("title", e.target.value, { shouldValidate: true });
          }}
          isValid={!errors.title}
        />
        {errors.title && <Form.Feedback message={errors.title.message} />}
        <Form.TextArea
          errors={errors}
          register={register("description", {
            required: "Description is required",
            minLength: {
              value: 20,
              message: "Be more descriptive, 20 characters are required.",
            },
          })}
          placeholder="Descritpion"
          labelText={"Description *"}
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
              errors={errors}
              register={register("releaseYear", {
                minLength: {
                  value: 4,
                  message: "Please enter 4 or more characters",
                },
              })}
              placeholder="Release Year"
              labelText={"Release Year"}
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
              placeholder="Runtime"
              labelText={"Runtime"}
              onChange={(e) => {
                setValue("runtime", e.target.value, { shouldValidate: true });
              }}
              isValid={!errors.runtime}
            />
          </div>
        </div>
        <Form.TextInput
          type="file"
          accept="image/png, image/jpeg"
          placeholder="Click to upload"
          labelText={"Image"}
          isValid={!errors.image}
        />
        {errors.image && <Form.Feedback message={errors.image.message} />}
        <div className="flex justify-between box-border font-arialBold text-lg">
          <div className="flex flex-col">
            <Form.TextInput
              placeholder="Rotten Tomatoes Score"
              labelText={"Rotten Tomatoes Score"}
              onChange={(e) => {
                setValue("score", e.target.value, { shouldValidate: true });
              }}
              isValid={!errors.score}
            />
          </div>
          <div className="flex flex-col">
            <Form.TextInput
              placeholder="How To Watch"
              labelText={"How To Watch"}
              onChange={(e) => {
                setValue("howToWatch", e.target.value, {
                  shouldValidate: true,
                });
              }}
              isValid={!errors.howToWatch}
            />
          </div>
        </div>
        <Form.TextInput
          errors={errors}
          register={register("keywords", {
            minLength: {
              value: 4,
              message: "Please enter 4 or more characters",
            },
          })}
          placeholder="Keywords"
          labelText={"Keywords *"}
          onChange={(e) => {
            setValue("keywords", e.target.value, { shouldValidate: true });
          }}
          isValid={!errors.keywords}
        />
        {errors.keywords && <Form.Feedback message={errors.keywords.message} />}
        <Form.Submit
          type="submit"
          title={"yeah"}
          className="w-full border-none"
          disabled={!isValid}
        />
      </Form>
      {/* If form is submitted, display a thank you message */}
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
    </>
  );
};
