import camera from "../images/camera.svg";
import drCal from "../images/drcaligari.png";
import rottenTomato from "../images/rotten-tomatoes.svg";
import { Image } from "./Image/Image";
import Keyword from "./Keyword";
import { Modal } from "./Modal";

export const MoviePreview = ({ closeModal }) => {
  const movie = {
    photo: drCal,
    title: "Dr. Caligari",
    releaseYear: 1989,
    runtime: 80,
    description:
      'A 1989 softcore sequel to the 1920 German expressionist silent film. The L.A. Times sez: "One of the kinkiest artifacts ever to come out of Orange County."',
    keywords: ["Auteur", "Campy", "Homoerotic Undertones", "Low Budget"],
    tomatoScore: 56,
    howToWatch: ["Netflix"],
  };

  console.log(movie.keywords);
  return (
    <Modal closeModal={closeModal}>
      {/* movie.photo. should be blurred */}
      <div className="outline">
        <Image src={movie.photo} alt={movie.title} className="mx-auto my-0" />
      </div>
      {/* all information about movie */}
      <div className="max-w-[590px] pl-10 pt-5 pb-9 flex flex-col gap-y-5 font-arial">
        <div className="flex flex-col gap-y-2.5 text-movie-card-captions">
          {/* movie.title, movie.releaseYear, movie.runtime */}
          <h1 className="font-bold ">{movie.title}</h1>
          <p>
            {movie.releaseYear}, {movie.runtime} minutes
          </p>
        </div>
        <div>
          {/* movie.description */}
          <p className="text-lg/5">{movie.description}</p>
        </div>
        <div className="flex gap-x-2">
          {/* movie.keywords */}
          {movie.keywords.map((keyword, index) => (
            <Keyword
              className={"bg-yellow-300"}
              key={index}
              keyword={keyword}
            />
          ))}
        </div>
        <div className="flex gap-x-2.5">
          {/* movie.tomatoScore */}
          <Image src={rottenTomato} alt={"rotten tomato"} />
          <p className="text-lg/5">
            Rotten Tomatoes score: {movie.tomatoScore}%
          </p>
        </div>
        <div className="flex gap-x-2.5">
          {/* movie.howToWatch */}
          <Image src={camera} alt={"camera"} />
          <p className="text-lg/5">Watch on: </p>
          {movie.howToWatch.map((method, index) => (
            <p key={index}>{method}</p>
          ))}
        </div>
      </div>
    </Modal>
  );
};
