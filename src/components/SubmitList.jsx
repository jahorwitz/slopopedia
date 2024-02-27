import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { GET_MOVIES, useCurrentUser } from "../graphql/index";
import { Button, Header, MovieCardList } from "./index";

export const SubmitList = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const { loading, data, error } = useQuery(GET_MOVIES, {
    variables: {
      where: {},
    },
  });

  //edit function for dynamic button
  const handleEdit = (movieId) => {
    navigate(`/edit-slop/${movieId}`);
  };

  //dynamic button for handleEdit. If the author id matches the user, Edit Button appears.
  // if the current user is an admin, approve button appears.
  // if neither of these conditions are met, the button does not appear.
  const renderButton = (movie) => {
    console.log(currentUser);
    if (currentUser?.id === movie?.author?.id) {
      return <Button onClick={() => handleEdit(movie.id)}>Edit</Button>;
    } else if (currentUser?.isAdmin) {
      return <Button onClick={() => console.log("Approve!")}>Approve</Button>;
    } else return null;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col justify-center items-center relative ">
          <h1 className="mb-10 mt-10 xs:self-end xs:pl-2 xs:pr-2  ">
            //Add PageTitle component here
          </h1>
          <Link
            to={"/submit"}
            className="absolute left-10 xs:left-4 sm:left-4 xs:text-sm top-[40px] border-b-2 border-black"
          >
            Back to submit page
          </Link>
          <div className="max-w-[453px] h-[728px] ">
            {data && data.movies && (
              <MovieCardList movies={data.movies} renderButton={renderButton} />
            )}
          </div>
          <div className="mb-10 mt-24">//add footer component here//</div>
        </div>
      </div>
    </>
  );
};
