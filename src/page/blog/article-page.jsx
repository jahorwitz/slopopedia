import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ToastContainer } from "react-toastify";
import { Form } from "../../../src/components/form";
import { Button } from "../../components/button";
import { Footer } from "../../components/index.js";
import { CREATE_POST } from "../../graphql/mutations/blog/post.js";
import { GET_BLOG_POST } from "../../graphql/queries/blog/posts.js";
import { useCurrentUser } from "../../hooks";

export const Article = () => {
  const { id } = useParams();
  const router = useNavigate();
  const [successful, setSuccessful] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    keywords: [],
    movies: [],
  });
  const [createPost, { loading, error }] = useMutation(CREATE_POST);
  const { currentUser } = useCurrentUser();
  const { data } = useQuery(GET_BLOG_POST, {
    variables: {
      where: {
        id: id,
      },
    },
  });

  useEffect(() => {
    if (id) {
      console.log(data);
      setFormState({
        title: data?.post.title,
        content: data?.post.content,
        keywords: [],
        // keywords is an array of objects -- the way keywords and movies will be set depends on how these
        // two fields are going to be built upon, so for now these are just empty
        movies: [],
      });
    }
  }, [data]);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const onSuccessful = () => {
    console.log("notifying");
    setSuccessful(true);
  };

  const onDraft = (e) => {
    e.preventDefault();
    console.log(currentUser);
    createPost({
      variables: {
        data: {
          title: formState.title,
          content: formState.content,
          keywords: {
            create: formState.keywords.map((item) => {
              return { name: item };
            }),
          },
          movies: {
            create: formState.movies.map((item) => {
              return { title: item, description: "placeholder" };
            }),
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
  };

  const onPublish = (e) => {
    e.preventDefault();
    console.log(currentUser);
    createPost({
      variables: {
        data: {
          title: formState.title,
          content: formState.content,
          keywords: {
            create: formState.keywords.map((item) => {
              return { name: item };
            }),
          },
          movies: {
            create: formState.movies.map((item) => {
              return { title: item, description: "placeholder" };
            }),
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
  };
  // I imagine there must be a way
  // to turn the onPublish and onDraft
  // into just one function that takes in a paramter
  // but I was having trouble with passing a variable into a
  // mutation

  // For the sake of refactoring and making things more organized,
  // implementing this would save a decent amount of space

  // redirects the user back to a new empty form after selecting submit another
  const submitAnother = () => {
    setSuccessful(false);
    setFormState({
      title: "",
      content: "",
      keywords: [],
      movies: [],
    });
  };

  const checkValidity = (value) => {
    if (!value) {
      return false;
    }
    return true;
  };

  // ^^^
  // this can probably be replaced w/ better validation, for the sake of
  // matching the mock I just made this, I forget if there is a built in
  // validator

  return (
    <>
      {!successful ? (
        <div className="relative flex flex-row justify-center mx-auto -top-5 pt-20">
          <ToastContainer className={"absolute"} />
          <Form className={"w-[700px] ml-[224px] p-5 bg-white"}>
            <Form.TextInput
              className="relative flex justify-center font-bold font-arial flex-col py-3"
              labelText={"Title"}
              value={formState.title}
              onChange={(e) =>
                setFormState({ ...formState, title: e.target.value })
              }
              isValid={checkValidity(formState.title)}
            />
            <Form.TextArea
              labelText={"Body"}
              placeholder={`Body`}
              value={formState.content}
              onChange={(e) =>
                setFormState({ ...formState, content: e.target.value })
              }
            />
            <Form.TextInput
              className=" flex font-bold font-arial flex-col py-3"
              labelText={"Slops"}
              placeholder={"Add topical slops"}
              value={formState.movies.join(", ")}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  movies: e.target.value.split(",").map((item) => item.trim()),
                })
              }
              isValid={checkValidity(formState.movies.join(", "))}
            />
            <Form.TextInput
              className=" flex font-bold font-arial flex-col py-3"
              labelText={"Keywords"}
              placeholder={"Add topical keywords"}
              value={formState.keywords.join(", ")}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  keywords: e.target.value
                    .split(",")
                    .map((item) => item.trim()),
                })
              }
              isValid={checkValidity(formState.keywords.join(", "))}
            />
          </Form>
          <div className="self-center mt-32 h-[49px] min-w-[224px] md:absolute md:bottom-0 md:left-0 md:right-0 md:top-96 xs:absolute xs:bottom-0 xs:left-0 xs:right-0 xs:top-80">
            <Form onSubmit={onDraft}>
              <Form.Submit
                className="font-bold font-arial bg-white text-lg/4 text-black w-full border border-black py-4 px-4"
                title={"Save to drafts"}
                onSubmit={onDraft}
              />
            </Form>

            <Form onSubmit={onPublish}>
              <Form.Submit
                className="font-bold font-arial bg-yellow-400  text-lg/4 text-black w-full border border-black py-4 px-4"
                title={"Publish!"}
                disabled={false}
              />
            </Form>
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
