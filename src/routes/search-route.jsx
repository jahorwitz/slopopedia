import { useQuery } from "@apollo/client";
import Fuse from "fuse.js";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Footer, Header, Loading, MovieCardList } from "../components";
import ControlledCheckbox from "../components/form/advanced-form-inputs/controlledCheckbox";
import Slider from "../components/form/advanced-form-inputs/slider";
import TextInput from "../components/form/advanced-form-inputs/textInput";
import { GET_KEYWORDS, GET_MOVIES } from "../graphql";
import useDebounce from "../hooks/use-debounce";

const decades = [
  { label: "1970s", value: "1970" },
  { label: "1980s", value: "1980" },
  { label: "1990s", value: "1990" },
  { label: "2000s", value: "2000" },
  { label: "2010s", value: "2010" },
  { label: "2020s", value: "2020" },
];
const sortingOptions = [
  { label: "Title", value: "title" },
  { label: "Popularity", value: "popularity" },
  { label: "Recently Added", value: "recentlyAdded" },
];

/**
 * Search route page
 */
export function SearchRoute() {
  const criteriaInit = {
    sortingCriteria: "title",
    rtMin: "20",
    rtMax: "90",
    inclNoRt: false,
  };
  const [criteria, setCriteria] = useState(criteriaInit);

  const { register, control, watch, handleSubmit } = useForm({
    defaultValues: criteriaInit,
  });
  const { data: keywordsData } = useQuery(GET_KEYWORDS);

  const keywords = [];
  for (let i = 0; i < keywordsData?.keywords.length; i++) {
    const obj = {};
    obj["label"] = keywordsData?.keywords[i].name;
    obj["value"] = keywordsData?.keywords[i].id;
    keywords.push(obj);
  }

  const onSubmit = useDebounce(setCriteria, 300);

  return (
    <>
      <Header />
      <main className="">
        <form onChange={handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-4 mt-12 w-4/5 mx-auto">
            <div className="w-1/3 flex flex-col gap-4 justify-start">
              <span className="font-bold text-xl">Keywords</span>
              <Controller
                control={control}
                defaultValue={[]}
                name="keywords"
                render={({ field: { onChange, value, ref } }) => {
                  const val = keywords.filter((c) => value.includes(c.value));
                  return (
                    <Select
                      inputRef={ref}
                      value={val}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderColor: "black",
                          padding: ".4rem",
                          fontSize: "18px",
                          borderWidth: "2px",
                          borderRadius: 0,
                        }),
                      }}
                      theme={(theme) => ({
                        ...theme,
                        padding: 0,
                        borderWidth: 0,
                        colors: {
                          ...theme.colors,
                          primary25: "#FFD913",
                          primary: "black",
                        },
                      })}
                      onChange={(val) => {
                        const value = val.map((c) => c.value);
                        onChange(value);
                        setCriteria({
                          ...criteria,
                          keywords: value,
                        });
                      }}
                      options={keywords}
                      isMulti={true}
                    />
                  );
                }}
              />
            </div>
            <div className="w-1/3 flex flex-col gap-4 justify-start">
              <span className="font-bold text-xl">
                Title/Description Search
              </span>
              <TextInput {...register("titleDescription")} />
            </div>
            <div className="w-1/3 flex flex-col gap-4 justify-start">
              <span className="font-bold text-xl">Decades</span>
              <Controller
                control={control}
                defaultValue={[]}
                name="decades"
                render={({ field: { onChange, value, ref } }) => {
                  const val = decades.filter((c) => value.includes(c.value));
                  return (
                    <Select
                      inputRef={ref}
                      value={val}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderColor: "black",
                          padding: ".4rem",
                          fontSize: "18px",
                          borderWidth: "2px",
                          borderRadius: 0,
                        }),
                      }}
                      theme={(theme) => ({
                        ...theme,
                        padding: 0,
                        borderWidth: 0,
                        colors: {
                          ...theme.colors,
                          primary25: "#FFD913",
                          primary: "black",
                        },
                      })}
                      onChange={(val) => {
                        const value = val.map((c) => c.value);
                        onChange(value);
                        setCriteria({
                          ...criteria,
                          decades: value,
                        });
                      }}
                      options={decades}
                      isMulti={true}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="flex justify-start gap-8 mt-12 w-4/5 mx-auto items-center">
            <div className="w-1/4 flex flex-col gap-2">
              <span className="font-bold text-lg pb-5">
                Rotten Tomatoes Score
              </span>
              <Slider
                label="Min"
                min="0"
                max="100"
                watch={watch("rtMin")}
                {...register("rtMin")}
              />
              <Slider
                label="Max"
                min="0"
                max="100"
                watch={watch("rtMax")}
                {...register("rtMax")}
              />
            </div>
            <Controller
              control={control}
              defaultValue="false"
              name="inclNoRt"
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <ControlledCheckbox
                    value={value}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e);
                      setCriteria({
                        ...criteria,
                        inclNoRt: !criteria?.inclNoRt,
                      });
                    }}
                    label="Include movies with no Rotten Tomatoes Score"
                  />
                );
              }}
            />
            <div className="w-1/4"></div>
            <div className="flex flex-col w-1/4 gap-3 ">
              <div className="flex justify-between items-center ">
                <label htmlFor="sortingCriteria" className="font-bold">
                  Sort By
                </label>
                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    defaultValue="false"
                    name="sortDescending"
                    render={({ field: { onChange, value, ref } }) => {
                      return (
                        <ControlledCheckbox
                          value={value}
                          ref={ref}
                          onChange={(e) => {
                            onChange(e);
                            setCriteria({
                              ...criteria,
                              sortDescending: !criteria?.sortDescending,
                            });
                          }}
                          label="Descending"
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <Controller
                control={control}
                defaultValue={sortingOptions[0]}
                name="sortingCriteria"
                render={({ field: { onChange, value, ref } }) => {
                  const val = sortingOptions.find((c) => c.value === value);
                  return (
                    <Select
                      inputRef={ref}
                      value={val}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: "black",
                          padding: ".5rem",
                          fontSize: "18px",
                          borderWidth: "2px",
                          borderRadius: 0,
                        }),
                      }}
                      theme={(theme) => ({
                        ...theme,
                        padding: 0,
                        borderWidth: 0,
                        colors: {
                          ...theme.colors,
                          primary25: "#FFD913",
                          primary: "black",
                        },
                      })}
                      onChange={(val) => {
                        onChange(val.value);
                        setCriteria({
                          ...criteria,
                          sortingCriteria: val.value,
                        });
                      }}
                      options={sortingOptions}
                      isMulti={false}
                    />
                  );
                }}
              />
            </div>
          </div>
        </form>
      </main>
      <div className="flex flex-col mt-20 gap-6 mx-36">
        <p className="font-bold text-4xl">RESULTS</p>
        <FindMovies criteria={criteria} />
      </div>
      <Footer />
    </>
  );
}
function FindMovies({ criteria }) {
  const { data, loading, error } = useQuery(GET_MOVIES, {
    variables: {
      where: {
        status: {
          equals: "published",
        },
      },
    },
  });
  if (error) {
    return (
      <p className="text-center text-3xl font-bold bg-red-500">ERROR!!!</p>
    );
  }
  const rawMovies = Array.from(data?.movies ?? []);
  const sortedMovies = handleMovieSort(rawMovies, criteria);

  if (loading) {
    return (
      <div className="mx-auto py-10">
        <Loading />
      </div>
    );
  }

  if (criteria?.titleDescription) {
    const fuseMovieList = new Fuse(sortedMovies, {
      keys: ["title", "description"],
      threshold: 0.2,
    });
    const searchArr = fuseMovieList.search(criteria?.titleDescription);
    const searchedList = searchArr.map((item) => item.item);
    return <MovieCardList movies={searchedList} />;
  }

  return <MovieCardList movies={sortedMovies} />;
}

/**
 * handleMovieSort - takes in movies and criteria and returns sorted/filtered list
 * @param {Movie[]} - movies - list of movies
 * @param {Object} - criteria - sorting criteria object set in the useState hook
 * @returns {Movie[]} - returns sorted list of movies
 */
function handleMovieSort(movies, criteria) {
  const sortedMovies = sortMovies(movies, criteria);
  const tomatoesRemoved = removeTomatolessFilms(sortedMovies, criteria);
  const filteredByTomatoScore = filterTomatoScore(tomatoesRemoved, criteria);
  const filteredByDecades = filterDecades(filteredByTomatoScore, criteria);
  const filteredByKeyword = keywordSearch(filteredByDecades, criteria);
  const sortedDescending = sortDescending(filteredByKeyword, criteria);

  return sortedDescending;
}
/*
    Relevant functions for sorting movies
    */
function sortMovies(movies, criteria) {
  if (criteria?.sortingCriteria === "title") {
    return movies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (criteria?.sortingCriteria === "popularity") {
    return movies.sort((a, b) => b.popularity - a.popularity);
  } else if (criteria?.sortingCriteria === "recentlyAdded") {
    return movies.sort((a, b) => b.releaseDate - a.releaseDate);
  }
  return movies;
}
function keywordSearch(movies, criteria) {
  const selectedKeywords = criteria?.keywords ?? [];
  if (selectedKeywords.length < 1) {
    return movies;
  }
  const filteredMovies = [];
  for (let i = 0; i < movies.length; i++) {
    for (let j = 0; j < movies[i]?.keywords.length; j++) {
      for (let k = 0; k < selectedKeywords?.length; k++) {
        if (movies[i].keywords[j]?.id == selectedKeywords[k]) {
          filteredMovies.push(movies[i]);
        }
      }
    }
  }
  return filteredMovies;
}

function removeTomatolessFilms(movies, criteria) {
  if (criteria?.inclNoRt) {
    return movies;
  }
  return movies.filter((movie) => typeof movie.tomatoScore === "number");
}

function filterDecades(movies, criteria) {
  const selectedDecades = criteria?.decades ?? [];
  if (selectedDecades.length < 1) {
    return movies;
  }
  const filteredMovies = [];
  for (let i = 0; i < movies.length; i++) {
    for (let j = 0; j < selectedDecades.length; j++) {
      if (
        movies[i].releaseYear >= Number(selectedDecades[j]) &&
        movies[i].releaseYear <= Number(selectedDecades[j]) + 9
      ) {
        filteredMovies.push(movies[i]);
      }
    }
  }
  return filteredMovies;
}

function filterTomatoScore(movies, criteria) {
  if (criteria?.inclNoRt) {
    return movies;
  }
  const filtered = movies.filter(
    (movie) =>
      movie.tomatoScore >= criteria?.rtMin &&
      movie.tomatoScore <= criteria?.rtMax
  );
  return filtered;
}

function sortDescending(movies, criteria) {
  if (!criteria?.sortDescending) {
    return movies;
  }
  return movies.reverse();
}
