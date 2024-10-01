import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Header, Loading, MovieCardList } from "../../components";
import { GET_MOVIES } from "../../graphql";
import { useCurrentUser } from "../../hooks";
import downArrow from "../../images/down-arrow.svg";
import eyeSvg from "../../images/eye.svg";
import upArrow from "../../images/up-arrow.svg";
import { ProfileHorizontalMenu, ProfileSidebar } from "./index";

const options = [
  "Top 10 from wishlist",
  "Top 10 not in wishlist",
  "Top 10 watched",
  "Bottom 10 watched",
  "Top 10 easy (all-time)",
  "Bottom 10 easy (all-time)",
];

// DropDownList component

function DropDownList({ listSelection, setListSelection }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex gap-3">
        <div className="text-2xl font-bold border-b-2">
          {listSelection.toUpperCase()}
        </div>
        <button
          className="my-auto w-5 h-5 bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${isOpen ? upArrow : downArrow})` }}
          alt="arrow down"
          onClick={toggleDropdown}
        ></button>
      </div>

      {isOpen && (
        <div className="absolute border mt-2 w-full bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-2" role="menu" aria-orientation="vertical">
            {options.map((option, index) => (
              <div
                key={index}
                className="block px-4 py-2 text-lg font-semibold hover:bg-slate-200 cursor-pointer"
                onClick={() => {
                  setListSelection(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

//Slop Preferences component
function SlopPreferences() {
  return (
    <div className="flex gap-4">
      <img className="w-6 h-6 my-auto" src={eyeSvg} alt="eye logo" />
      <button className="text-lg font-bold border-b-2 ">
        Slop Preferences
      </button>
    </div>
  );
}

//Profile Recommend Route Component

export const ProfileRecommendRoute = () => {
  const { currentUser } = useCurrentUser();
  const [listSelection, setListSelection] = useState(options[0]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  const { data, loading, error } = useQuery(GET_MOVIES, {
    variables: { where: {} },
  });

  // Extract watched movies from the currentUser data

  const watchedMovies = currentUser?.watched || [];
  const wishlistedMovies = currentUser?.wishlist || [];
  function determineMovies(fn, arg) {
    const movies = fn(arg);
    setDisplayedMovies(movies);
    return;
  }
  // Determine which movies to display based on list selection
  console.log({ watchedMovies });
  console.log({ wishlistedMovies });
  // Function to get My Top watched Slops
  const getTopWatched = (watchedMovies) => {
    return [...watchedMovies]
      .sort((a, b) => (b.handicap || 0) - (a.handicap || 0))
      .slice(0, 10);
  };

  // Function to get My Bottom 10 watched
  const getBottomWatched = (watchedMovies = []) => {
    return [...watchedMovies]
      .sort((a, b) => (a.handicap || 0) - (b.handicap || 0))
      .slice(0, 10);
  };

  const getTopWished = (wishlistedMovies = []) => {
    return [...wishlistedMovies]
      .sort((a, b) => (a.handicap || 0) - (b.handicap || 0))
      .slice(0, 10);
  };

  const getNotWished = (wishlistedMovies = []) => {
    const wishlistMovieIds = new Set(wishlistedMovies.map((movie) => movie.id));
    const movies = data.movies;
    const notWished = movies.filter((movie) => !wishlistMovieIds.has(movie.id));
    return [...notWished]
      .sort((a, b) => (a.handicap || 0) - (b.handicap || 0))
      .slice(0, 10);
  };

  const getTopEasy = (movies = []) => {
    return [...movies]
      .sort((a, b) => (a.handicap || 0) - (b.handicap || 0))
      .slice(0, 10);
  };

  const getBotEasy = (movies = []) => {
    return [...movies]
      .sort((a, b) => (b.handicap || 0) - (a.handicap || 0))
      .slice(0, 10);
  };

  useEffect(() => {
    if (listSelection === "Top 10 from wishlist") {
      return determineMovies(getTopWished, wishlistedMovies);
    }
    if (listSelection === "Top 10 not in wishlist") {
      return determineMovies(getNotWished, wishlistedMovies);
    }
    if (listSelection === "Top 10 watched") {
      return determineMovies(getTopWatched, watchedMovies);
    }
    if (listSelection === "Bottom 10 watched") {
      return determineMovies(getBottomWatched, watchedMovies);
    }
    if (listSelection === "Top 10 easy (all-time)") {
      return determineMovies(getTopEasy, data?.movies);
    }
    if (listSelection === "Bottom 10 easy (all-time)") {
      return determineMovies(getBotEasy, data?.movies);
    }
    if (data?.movies) {
      return setDisplayedMovies(watchedMovies);
    }
  }, [listSelection, data]);

  return (
    <div className="">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <section className="flex flex-col h-[900px] bg-gray-background xl:flex-row">
        {isDesktopSize ? <ProfileSidebar /> : <ProfileHorizontalMenu />}
        <div className="w-[75%]">
          <div className="flex mt-10 justify-between w-full">
            <DropDownList
              listSelection={listSelection}
              setListSelection={setListSelection}
            />
            <SlopPreferences />
          </div>
          <div className="pt-10">
            {loading ? (
              <Loading />
            ) : displayedMovies.length === 0 ? (
              <p>No slops here!</p>
            ) : (
              <MovieCardList propMovies={displayedMovies} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
