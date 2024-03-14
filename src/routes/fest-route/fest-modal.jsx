import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { Button, Modal, MovieCardList } from "../../components";

export const FestModal = ({
  closeModal,
  recommendedMovies,
  loading,
  addMovies,
}) => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [moviesToAdd, setMoviesToAdd] = useState([]);
  const [movieList, setMovieList] = useState(recommendedMovies);
  const [query, setQuery] = useState("");

  const filteredMovies =
    query === ""
      ? movieList
      : movieList?.filter((movie) => {
          return movie.title.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Modal title="ADD MORE SLOPS" closeModal={closeModal}>
      <div className="pb-28 pt-20 px-4 ">
        <Combobox value={selectedMovie}>
          <div className=" max-w-sm my-0 mx-auto">
            <Combobox.Input
              className="border-2 max-w-sm w-full py-2 px-2"
              onChange={(evt) => setQuery(evt.target.value)}
            />
          </div>
          <Combobox.Options className="border-2 max-w-sm w-full my-0 mx-auto cursor-pointer">
            {filteredMovies?.length === 0 && query !== "" ? (
              <div>Nothing found</div>
            ) : (
              filteredMovies?.map((movie) => (
                <Combobox.Option
                  key={movie.id}
                  value={movie.title}
                  onClick={() => {
                    setMoviesToAdd([...moviesToAdd, movie]);
                    setMovieList(
                      movieList?.filter((item) => item.title !== movie.title)
                    );
                  }}
                >
                  {movie.title}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Combobox>
        <div className="py-4">
          <MovieCardList movies={moviesToAdd} colSpanOne />
        </div>
        {moviesToAdd?.length > 0 && (
          <Button
            onClick={() => {
              addMovies(moviesToAdd);
              closeModal();
            }}
          >
            {loading ? "Adding..." : "Add Movies"}
          </Button>
        )}
      </div>
    </Modal>
  );
};
