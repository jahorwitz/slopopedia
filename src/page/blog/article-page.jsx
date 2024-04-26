import { useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { ToastContainer } from "react-toastify";
import { Form } from "../../../src/components/form";
import { Button } from "../../components/button";
import { Footer } from "../../components/index.js";
import {
  CREATE_POST,
  DELETE_POST,
  GET_BLOG_POST,
  GET_KEYWORDS,
  GET_MOVIES,
} from "../../graphql";
import { useCurrentUser } from "../../hooks";
import { ClientContext } from "../../store/client-context.js";

export const Article = ({ isEdited }) => {
  const { id } = useParams();
  const router = useNavigate();
  const [successful, setSuccessful] = useState(false);
  const [createPost, { loading, error }] = useMutation(CREATE_POST);
  const { currentUser } = useCurrentUser();
  const { data } = useQuery(GET_BLOG_POST, {
    variables: {
      where: {
        id: id,
      },
    },
  });
  const { client } = useContext(ClientContext);
  const [deletePost, {}] = useMutation(DELETE_POST, {
    refetchQueries: [GET_BLOG_POST],
  });
  const { data: keywordsData } = useQuery(GET_KEYWORDS);
  const { data: moviesData } = useQuery(GET_MOVIES);
  const keywordsPrefills = data?.post?.keywords?.map((keyword) => ({
    name: keyword.name,
  }));
  const moviesPrefills = data?.post?.movies?.map((movie) => ({
    title: movie.title,
  }));
  // const keywordsOptions = keywordsData?.keywords.map((keyword) => ({
  //   name: keyword.name,
  // }));
  // const moviesOptions = moviesData?.movies.map((movie) => ({
  //   title: movie.title,
  // }));

  const keywordsOptions = keywordsData?.keywords ?? [];
  const moviesOptions = moviesData?.movies ?? [];

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      keywords: data?.post?.keywords,
      movies: data?.post?.movies,
    },
  });
  // useEffect(() => {
  //   if (id) {
  //     console.log(data);

  //     setValue("keywords", data?.post?.keywords, { shouldValidate: true });
  //     setValue("movies", data?.post?.movies, {
  //       shouldValidate: true,
  //     });
  //   }
  // }, [data]);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const onSuccessful = () => {
    setSuccessful(true);
  };

  const onDraft = handleSubmit(() => {
    const { title, content, keywords, movies } = getValues();
    createPost({
      variables: {
        data: {
          title: title,
          content: content,
          keywords: {
            connect: keywords.map((keyword) => ({
              id: keyword.id,
            })),
          },
          movies: {
            connect: movies.map((movie) => ({
              id: movie.id,
            })),
          },
          author: {
            connect: { username: currentUser.username },
          },
          status: "draft",
        },
      },
    })
      .then(() => onSuccessful())
      .catch((err) => {
        console.error(err);
      });
  });

  const onPublish = handleSubmit(() => {
    const { title, content, keywords, movies } = getValues();
    console.log(title, content, keywords, movies);

    createPost({
      variables: {
        data: {
          title: title,
          content: content,
          keywords: {
            connect: keywords.map((keyword) => ({
              id: keyword.id,
            })),
          },
          movies: {
            connect: movies.map((movie) => ({
              id: movie.id,
            })),
          },
          author: {
            connect: { username: currentUser.username },
          },
          status: "published",
        },
      },
    })
      .then(() => onSuccessful())
      .catch((err) => {
        console.error(err);
      });
  });
  // Should turn the onPublish and onDraft
  // into just one function that takes in a paramter
  // but I was having trouble with passing a variable into a
  // mutation

  // redirects the user back to a new empty form after selecting submit another
  const submitAnother = () => {
    setSuccessful(false);
    // setValue({
    //   title: "",
    //   content: "",
    //   keywords: [],
    //   movies: [],
    // });
    setValue("title", data?.post.title, { shouldValidate: true });
    setValue("content", data?.post.content, {
      shouldValidate: true,
    });
  };

  const onDelete = () => {
    if (currentUser.id === data.post.author.id) {
      // delete blog post from server
      deletePost({
        variables: {
          where: {
            id: id,
          },
        },
      }).then(() => {
        // delete blog post from cache
        client.cache.modify({
          fields: {
            posts(existingPosts, { readField }) {
              return existingPosts.filter(
                (post) => id !== readField("id", post)
              );
            },
          },
        });
        router(`/draft`);
      });
    }
  };

  return (
    <>
      {!successful ? (
        <div className="relative flex flex-row justify-center mx-auto -top-5 pt-20">
          {isEdited && (
            <button
              onClick={onDelete}
              className=" absolute top-10 right-10 underline underline-offset-2 text-red-500"
            >
              Delete
            </button>
          )}
          <ToastContainer className={"absolute"} />
          <Form className={"w-[700px] ml-[224px] p-5 bg-white"}>
            <Form.TextInput
              className="relative flex justify-center font-bold font-arial flex-col mt-3"
              labelText={"Title"}
              placeholder={`Title`}
              id="title"
              prefilledInputs={data?.post?.title}
              onChange={(e) =>
                setValue("title", e.target.value, { shouldValidate: true })
              }
              isValid={!errors.title}
              register={register("title", {
                required: true,
                pattern: {
                  value: /^\S/,
                  message: "Must not start with a space",
                },
              })}
            />
            <Form.TextArea
              labelText={"Body"}
              placeholder={`Body`}
              onChange={(e) =>
                setValue("content", e.target.value, {
                  shouldValidate: true,
                })
              }
              prefilledInputs={data?.post?.content}
              register={register("content", {
                required: true,
                pattern: {
                  value: /^\S/,
                  message: "Must not start with a space",
                },
              })}
            />
            <Form.Combobox
              className="flex font-bold font-arial flex-col py-3"
              labelText={"Keywords"}
              placeholder={"Add topical keywords"}
              list={keywordsOptions}
              watch={watch}
              setValue={setValue}
              nameKey={"name"}
              name={"keywords"}
              idKey={"name"}
              id={"keywords"}
            />
            <Form.Combobox
              className="relative flex justify-center font-bold font-arial flex-col py-3"
              labelText={"Slops"}
              placeholder={"Add topical slops"}
              list={moviesOptions}
              watch={watch}
              setValue={setValue}
              nameKey={"title"}
              name={"movies"}
              idKey={"title"}
              id={"movies"}
            />
          </Form>
          <div className="self-center mt-32 h-[49px] min-w-[224px] md:absolute md:bottom-0 md:left-0 md:right-0 md:top-96 xs:absolute xs:bottom-0 xs:left-0 xs:right-0 xs:top-80">
            <Button
              variant="primary"
              className={`font-bold font-arial text-lg/4 border py-4 px-4 bg-white text-black w-full border-black`}
              type="button"
              onClick={onDraft}
            >
              Save to Drafts
            </Button>

            <Button
              variant="primary"
              className={`font-bold font-arial text-lg/4 border py-4 px-4 bg-white text-black w-full border-black`}
              type="button"
              onClick={onPublish}
            >
              Publish!
            </Button>
          </div>
        </div>
      ) : (
        // the ticket that will turn the following success display
        // into a component doesn't seem to be done yet, so for now the
        //  markup is just hard coded in

        <div className="max-w-[1440px] mx-auto ">
          <div className="flex flex-col justify-center items-center xs:px-5 sm:px-5">
            <h1 className="mb-40 mt-10 Arial-NarrowBold text-5xl">SLOP BLOG</h1>
            <p className="max-w-[627px] xs:text-sm sm:text-center md:text-center lg:text-center">
              Thanks for submitting a slop to our platform, dear goblin!
            </p>
            <p className="max-w-[632px] xs:text-sm ">
              Our team of professional slop goblins will review your submission
              and publish it, if your slop is actually sloppy, and doesn't
              repeat movies already published here.
            </p>
            <div className="flex gap-4 mt-40 xs:mt-16 ">
              <Button
                className="w-[400px] h-10 bg-yellow text-lg font-arialBold xs:text-sm xs:w-[285px] flex justify-center"
                title="Submit another one?"
                onClick={submitAnother}
              >
                <label className="self-center">Submit another one?</label>
              </Button>
              <Button
                className="w-[400px] h-10 bg-yellow text-lg font-arialBold xs:text-sm xs:w-[285px] flex justify-center"
                title="Submit another one?"
                onClick={() => router(`/articles`)}
              >
                <label className="self-center">View published articles</label>
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Footer needs to sit at bottom on the successfully submitted screen
absolute bottom-0 does this, but then it clips through the form
Would conditionally adding these CSS styles be the best approach, or does the footer component need work */}

      <div className="w-full max-w-[989] mt-auto p-20">
        <Footer></Footer>
      </div>
    </>
  );
};

export default Article;
