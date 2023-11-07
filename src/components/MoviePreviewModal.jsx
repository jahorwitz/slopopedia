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
  return (
    <Modal closeModal={closeModal}>
      {/* movie.photo. should be blurred */}
      <Image src={movie.photo} alt={movie.title} />
      {/* all information about movie */}
      <div>
        <div>
          {/* movie.title, movie.releaseYear, movie.runtime */}
          <h1>{movie.title}</h1>
          <p>
            {movie.releaseYear}, {movie.runtime} minutes
          </p>
        </div>
        <div>
          {/* movie.description */}
          <p>{movie.description}</p>
        </div>
        <div>
          {/* movie.keywords */}
          {movie.keywords.map((keyword, index) => {
            <Keyword key={index} keyword={keyword} />;
          })}
        </div>
        <div className="flex">
          {/* movie.tomatoScore */}
          <Image src={rottenTomato} />
          <p>Rotten Tomatoes score: {movie.tomatoScore}%</p>
        </div>
        <div className="flex">
          {/* movie.howToWatch */}
          <Image src={camera} />
          <p>Watch on:</p>
          {movie.howToWatch.map((method, index) => {
            <p key={index}>{method}</p>;
          })}
        </div>
      </div>
    </Modal>
  );
};
