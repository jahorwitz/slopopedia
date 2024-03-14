import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Footer, Header, MovieCardList } from "../../components";
import { GET_MOVIES, GET_USERS_WATCHLIST } from "../../graphql";
import arrowdown from "../../images/arrowdown.svg";
import arrowup from "../../images/arrowup.svg";
import sloppreferances from "../../images/sloppreferances.svg";
import { ProfileHorizontalMenu } from "./profile-horizontal-menu";
import { ProfileSidebar } from "./profile-sidebar";

export const ProfileRecommendedRoute = () => {
  const [selected, setSelected] = useState("Top 10 from wishlist");
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelected(value);
    setIsOpen(false);
  };

  const moviesQuery = useQuery(GET_MOVIES, { variables: { where: {} } });
  const movies = useMemo(() => {
    return moviesQuery.data?.movies?.map((movie) => {
      return movie;
    });
  });
  const watchlistQuery = useQuery(GET_USERS_WATCHLIST, {
    where: {},
  });

  //1. top 10 from wishlist. Sort the movies based on the number of times they have been added to wishlist by all users.
  const wishList = useMemo(() => {
    return watchlistQuery.data?.users?.map((user) => {
      return user.wishlist;
    });
  }, [watchlistQuery.data]);
  let flattenedWishList = wishList?.reduce(
    (acc, curVal) => acc.concat(curVal),
    []
  );
  const wishlistIds = flattenedWishList?.map(({ id }) => id);
  const filteredWishlist = flattenedWishList?.filter(
    ({ id }, index) => !wishlistIds.includes(id, index + 1)
  );
  const sortWishList = filteredWishlist?.sort((a, b) => (a.id > b.id ? -1 : 1));
  const topTenWishlist = sortWishList?.slice(0, 10).map((input) => {
    return input;
  });

  //2. top 10 not in wishlist. Sort the movies based on their high tomatoScore, but only from the list of movies that are not in all users wishlist.
  const filteredNotInWishlist = movies?.filter(
    ({ id }) => !wishlistIds?.includes(id)
  );
  const sortNotInWishlist = filteredNotInWishlist?.sort((a, b) =>
    a.tomatoScore > b.tomatoScore ? -1 : 1
  );
  const topTenNotInWishlist = sortNotInWishlist?.slice(0, 10).map((input) => {
    return input;
  });

  //3. top 10 watched. Sort the movies based on the number of times they have been added to watchedlist by all users.
  const watchedList = useMemo(() => {
    return watchlistQuery.data?.users?.map((user) => {
      return user.watched;
    });
  }, [watchlistQuery.data]);

  let flattenedWatchedList = watchedList?.reduce(
    (acc, curVal) => acc.concat(curVal),
    []
  );
  const watchedIds = flattenedWatchedList?.map(({ id }) => id);
  const filteredWatched = flattenedWatchedList?.filter(
    ({ id }, index) => !watchedIds.includes(id, index + 1)
  );
  const sortWatched = filteredWatched?.sort((a, b) => (a.id > b.id ? -1 : 1));
  const topTenWatched = sortWatched?.slice(0, 10).map((input) => {
    return input;
  });

  //4. bottom 10 watched. Sort the movies based on the number of times they have been added to watchedlist by all users.
  const sortBottomWatched = filteredWatched?.sort((a, b) =>
    b.id > a.id ? -1 : 1
  );
  const bottomTenWatched = sortBottomWatched?.slice(0, 10).map((input) => {
    return input;
  });

  //5. top 10 easy (all-time). Sort movies by their TomatoScore in descending order, i.e., from highest to lowest
  const sortMoviesAllTime = movies?.sort((a, b) =>
    a.tomatoScore > b.tomatoScore ? -1 : 1
  );
  const topTenMoviesAllTime = sortMoviesAllTime?.slice(0, 10).map((input) => {
    return input;
  });

  //6. bottom 10 easy (all-time). Sort movies by their TomatoScore in ascending order, i.e., from lowest to highest
  const sortBottomMoviesAllTime = movies?.sort((a, b) =>
    b.tomatoScore > a.tomatoScore ? -1 : 1
  );
  const bottomTenMoviesAllTime = sortBottomMoviesAllTime
    ?.slice(0, 10)
    .map((input) => {
      return input;
    });

  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  const options = [
    {
      label: "Top 10 from wishlist",
      value: "Top-10-from-wishlist",
    },
    {
      label: "Top 10 not in wishlist",
      value: "Top-10-not-in-wishlist",
    },
    {
      label: "Top 10 watched",
      value: "Top-10-watched",
    },
    {
      label: "Bottom 10 watched",
      value: "Bottom-10-watched",
    },
    {
      label: "Top 10 easy (all-time)",
      value: "Top-10-easy-(all-time)",
    },
    {
      label: "Bottom 10 easy (all-time)",
      value: "Bottom-10-easy-(all-time)",
    },
  ];

  return (
    <div className="max-w-[1440px] min-h-[1023px] bg-gray-background mx-auto">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <section className="flex bg-gray-background">
        {isDesktopSize ? <ProfileSidebar /> : <ProfileHorizontalMenu />}
        <div className="w-[956px] relative">
          <div className="flex w-[343px]">
            <div className="flex w-full text-start z-10 ">
              <button
                type="button"
                onClick={toggling}
                className="flex items-center gap-4 text-left pb-6 scale-y-2 font-arialBold text-lg  mt-8 pt-1"
              >
                <div className="border-b-2 border-slate-950 h-[24px] uppercase">
                  {selected}
                </div>
                {!isOpen ? (
                  <img src={arrowdown} className="h-[6px] w-[15px]" />
                ) : (
                  <img src={arrowup} className="h-[6px] w-[15px]" />
                )}
              </button>
              {isOpen && (
                <div className="bg-white absolute top-[70px] flex flex-col items-start font-arial py-3 border-solid border-2  border-black/[0.4]">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      className="w-full"
                      onClick={onOptionClicked(option.label)}
                    >
                      <div className="flex w-full justify-between font-arialRegular hover:bg-slate-200 cursor-pointer tracking-tighter text-lg font-normal leading-4 text-start py-[10px] pl-[20px] pr-[40px] ">
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex align-baseline absolute top-[30px] right-[-10px] gap-2 text-lg font-arial font-bold h-[24px]">
              <div className="self-center">
                <img
                  src={sloppreferances}
                  className="w-[24.63px] h-[13.33px]"
                />
              </div>
              <Link
                to={"/preferences/:value"}
                className="border-b-2 border-slate-950"
              >
                Slop Preferences
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap mt-[20px] grid-cols-4 md:flex-wrap xs:flex-wrap gap-5 mb-10 p-0 z-1">
            {selected == "Top 10 from wishlist" ? (
              <MovieCardList movies={topTenWishlist} />
            ) : (
              ""
            )}
            {selected == "Top 10 not in wishlist" ? (
              <MovieCardList movies={topTenNotInWishlist} />
            ) : (
              ""
            )}
            {selected == "Top 10 watched" ? (
              <MovieCardList movies={topTenWatched} />
            ) : (
              ""
            )}
            {selected == "Bottom 10 watched" ? (
              <MovieCardList movies={bottomTenWatched} />
            ) : (
              ""
            )}
            {selected == "Top 10 easy (all-time)" ? (
              <MovieCardList movies={topTenMoviesAllTime} />
            ) : (
              ""
            )}
            {selected == "Bottom 10 easy (all-time)" ? (
              <MovieCardList movies={bottomTenMoviesAllTime} />
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <div className="mb-[15px]">
        <Footer />
      </div>
    </div>
  );
};
