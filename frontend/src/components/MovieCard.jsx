import plusIconBlack from "../images/plusIconBlack.svg";
import Keyword from "./Keyword";

export function MovieCard({ size, onClick, className, movieInfo, ...rest }) {
  const card = {
    img: movieInfo.img,
    title: movieInfo.title,
    keyword: movieInfo.keyword,
    year: movieInfo.year,
    runTime: movieInfo.runTime,
    rotTomScore: movieInfo.rotTomScore,
    watchOn: movieInfo.watchOn,
    watchedWantIt: movieInfo.watchedWantIt,
    threshold: movieInfo.threshold,
    votes: movieInfo.votes,
    peopleWantIt: movieInfo.peopleWantIt,
  };

  return (
    <div
      className={
        "flex flex-col relative " +
        className +
        (size === 1 && "max-w-sm-card ") +
        (size >= 2 && (size === 2 ? " max-w-md-card" : " max-w-lg-card"))
      }
      onClick={onClick}
      {...rest}
    >
      <img className="mb-2.5 " src={card.img}></img>
      {size >= 2 ? (
        <div className="flex flex-row justify-between">
          <h2 className="text-movie-card-captions mb-2.5 font-bold font-arial">
            {card.title}
          </h2>
          <p className="text-movie-card-captions mb-2.5 text-gray-400 font-arial">
            {card.year}, {card.runTime}
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-movie-card-captions mb-2.5 font-bold font-arial">
            {card.title}
          </h2>
          {card.runTime && (
            <p className="text-movie-card-captions mb-2.5 text-gray-400 font-arial">
              {card.year}, {card.runTime}
            </p>
          )}
        </>
      )}
      {!!card.keyword && (
        <div
          className={
            "flex flex-wrap gap-2 " +
            (size >= 2
              ? "absolute top-2 left-2 max-w-[calc(100%-24px)]"
              : "w-full")
          }
        >
          {card.keyword.map((keyword, index) => (
            <Keyword
              keyword={keyword}
              className={
                size >= 2
                  ? "bg-yellow-300"
                  : "h-31px space-x-2 space-y-2 bg-gray-button"
              }
              index={index}
              key={index}
            />
          ))}
        </div>
      )}
      {!!card.threshold && (
        <p className="text-movie-card-captions font-arial">
          Threshold: {card.threshold}
        </p>
      )}
      {!!card.votes && (
        <div className="flex-row flex h-5 mt-2.5">
          <p className="mr-5 flex items-center font-arial font-bold text-movie-card-captions">
            Votes: {card.votes}
          </p>
          <img className="w-5 h-5" src={plusIconBlack} />
        </div>
      )}
      {!!card.peopleWantIt && (
        <p className="text-goblins-want-it font-bold font-arial mt-5">
          * {card.peopleWantIt} goblins here want it
        </p>
      )}
    </div>
  );
}

export default MovieCard;
