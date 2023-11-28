import { useState } from "react";
// import Tabber from "./tabber";

export function MeGoblin() {
  const [watchList, setWatchList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);

  const moveMovieToWatchedList = (movie) => {
    setWatchList((previousWatchList) =>
      previousWatchList.filter((m) => m !== movie)
    );
    setWatchedList((previousWatchedList) => [...previousWatchedList, movie]);
  };

  return (
    <div>
      {/* <Tabber /> */}
      <ul>
        <li>Me Goblin</li>
        <li>Slop fests</li>
        <li>Recommend-A-Slop</li>
        <li>Settings</li>
        <li>Log out</li>
      </ul>

      {/* // render watch list */}

      {watchList && (
        <ul>
          {watchList.map((movie, idx) => (
            <li key={idx}>
              {movie}
              <button onClick={() => moveMovieToWatchedList(movie)}>
                I watched it!
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* // render watched list */}

      {watchedList && (
        <ul>
          {watchedList.map((movie, idx) => (
            <li key={idx}>{movie}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
