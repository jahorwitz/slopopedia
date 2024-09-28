import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CREATE_MOVIE } from "../../graphql";
import { GET_KEYWORDS } from "../../graphql/get-keywords";
import { useCurrentUser } from "../../hooks";

export default function SubmitSlopForm() {
  const defaultFormValues = {
    title: "",
    description: "",
    releaseYear: "",
    runtime: "",
    howToWatch: "",
  };
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultFormValues,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { currentUser } = useCurrentUser();
  const { data: keywordsData } = useQuery(GET_KEYWORDS);
  const [createMovie] = useMutation(CREATE_MOVIE);
  const keywords = [];
  for (let i = 0; i < keywordsData?.keywords.length; i++) {
    const obj = {};
    obj["label"] = keywordsData?.keywords[i].name;
    obj["value"] = keywordsData?.keywords[i].id;
    keywords.push(obj);
  }
  async function handleImageUpload(data) {
    const formData = new FormData();
    formData.append("movieTitle", data.title);
    formData.append("movieImage", data.image);
    formData.append("userId", currentUser.id);
    const res = await fetch("http://localhost:8080/api/movie", {
      method: "POST",
      body: formData,
    });
    return res.json();
  }
  async function onSubmit(data) {
    if (data.keywords.length <= 0) {
      return alert("Please select at least one keyword.");
    }
    const releaseYearInt = parseInt(data.releaseYear);
    const runTimeInt = parseInt(data.runtime);
    const tomatoScoreInt = parseInt(data.tomatoScore);
    const { uniqueKey } = await handleImageUpload(data);

    try {
      createMovie({
        variables: {
          data: {
            author: {
              connect: {
                id: currentUser.id,
              },
            },
            title: data.title,
            description: data.description,
            releaseYear: releaseYearInt,
            runtime: runTimeInt,
            tomatoScore: tomatoScoreInt,
            howToWatch: data.howToWatch,
            imageKey: uniqueKey,
            keywords: {
              connect: data.keywords.map((keyword) => ({
                id: keyword,
              })),
            },
          },
        },
      });
      reset({});
      setIsSubmitted(true);
    } catch (e) {
      console.error("Error in request", e.message);
    }
  }

  if (!isSubmitted) {
    return (
      <main className="mx-auto flex flex-col py-10">
        <p className="text-center text-3xl font-bold uppercase pb-5">
          SUBMIT A SLOP
        </p>
        <Link
          className="xs:hidden block absolute right-0 mr-10 underline"
          to="/submitted-list"
        >
          View submitted
        </Link>
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
                  const value = e.target.value;
                  if (
                    value === "" ||
                    (!isNaN(value) &&
                      /^\d+$/.test(value) &&
                      !/^0+$/.test(value) &&
                      value.length <= 4)
                  ) {
                    setValue("releaseYear", value, {
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
                type="number"
                register={register("runtime", {
                  required: "Runtime is required",
                })}
                placeholder="Runtime"
                labelText="Runtime *"
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value === "" ||
                    (!isNaN(value) &&
                      /^\d+$/.test(value) &&
                      !/^0+$/.test(value) &&
                      value.length <= 3)
                  ) {
                    setValue("runtime", value, { shouldValidate: true });
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
          <TextInput
            label="Title *"
            {...register("title", {
              required: {
                value: true,
                message: "Title is required.",
              },
              minLength: {
                value: 2,
                message: "Title must be at least 2 characters.",
              },
              maxLength: {
                value: 100,
                message: "Title must be no more than 100 characters.",
              },
            })}
          />
          <FormError errors={errors} name="title" />
          <TextArea
            label="Description *"
            {...register("description", {
              required: {
                value: true,
                message: "Description is required.",
              },
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters.",
              },
              maxLength: {
                value: 1000,
                message: "Description must be no more than 1000 characters.",
              },
            })}
          />
          <FormError errors={errors} name="description" />
          <div className="flex gap-2">
            <div className="">
              <TextInput
                label="Release Year"
                type="number"
                {...register("releaseYear", {
                  minLength: {
                    value: 4,
                    message: "Release Year must be exactly 4 characters",
                  },
                  maxLength: {
                    value: 4,
                    message: "Release Year must be exactly 4 characters",
                  },
                })}
              />
              <FormError errors={errors} name="releaseYear" />
            </div>
            <div>
              <TextInput
                type="number"
                label="Runtime"
                {...register("runtime", {})}
              />
              <FormError errors={errors} name="runtime" />
            </div>
          </div>
          <Dropzone
            control={control}
            label="Image"
            name="image"
            multiple={false}
          />
          <div className="flex gap-2">
            <div className="">
              <TextInput
                label="Rotten Tomatoes Score"
                type="number"
                {...register("tomatoScore", {
                  minLength: {
                    value: 1,
                    message:
                      "Rotten Tomatoes Score must be at least 1 character",
                  },
                  maxLength: {
                    value: 4,
                    message:
                      "Rotten Tomatoes Score must be at most 2 characters",
                  },
                })}
              />
              <FormError errors={errors} name="releaseYear" />
            </div>
            <div>
              <TextInput label="How to Watch" {...register("howToWatch", {})} />
              <FormError errors={errors} name="runtime" />
            </div>
          </div>
          <Dropdown
            label="Keywords *"
            defaultValue={[]}
            options={keywords}
            name="keywords"
            control={control}
            isMulti
          />
          {!isValid ? (
            <Button type="submit" disabled>
              Yeah!
            </Button>
          ) : (
            <Button type="submit">Yeah!</Button>
          )}
        </form>
      </main>
    );
  }
  return (
    <main className="flex gap-[200px] flex-col m-auto max-w-[672px] my-[200px]">
      <p className="font-arialRegular text-lg text-center">
        Thanks for submitting a slop to our platform, dear goblin! Our team of
        professional slop goblins will review your submission and publish it, if
        your slop is actually sloppy, and doesn’t repeat movies already
        published here
      </p>
      <button
        onClick={() => setIsSubmitted(false)}
        className="m-auto w-[453px] border-none font-bold font-arial text-lg/4 border py-4 px-4 bg-yellow"
      >
        Submit another one?
      </button>
    </main>
  );
*/}
        </Form>
      </main>
    );
  }
}
