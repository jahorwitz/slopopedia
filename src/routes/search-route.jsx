import { useQuery } from "@apollo/client";
import Fuse from "fuse.js";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Header, MovieCardList } from "../components";
import Checkbox from "../components/form/advanced-form-inputs/checkbox";
import Slider from "../components/form/advanced-form-inputs/slider";
import TextInput from "../components/form/advanced-form-inputs/textInput";
import { GET_KEYWORDS, GET_MOVIES } from "../graphql";
import useDebounce from "../hooks/use-debounce";

const decades = [
  { label: "1980s", value: "1980" },
  { label: "1990s", value: "1990" },
  { label: "2000s", value: "2000" },
];
const sortingOptions = [
  { label: "Title", value: "title" },
  { label: "Popularity", value: "popularity" },
  { label: "Recently Added", value: "recentlyAdded" },
];

export function SearchRoute() {
  /**
   */
  const [criteria, setCriteria] = useState(null);

  const { register, control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      sortingCriteria: "title",
      rtMin: 20,
      rtMax: 90,
      inclNoRt: true,
    },
  });
  const { data: keywordsData } = useQuery(GET_KEYWORDS);
  const keywords = [];
  keywordsData?.keywords.forEach((item) => {
    for (let i = 0; i < keywords.length; i++) {
      if (item.name === keywords[i].label) {
        return;
      }
    }
    const obj = {};
    obj["label"] = item.name;
    //obj["value"] = camelCase(item.name);
    obj["value"] = item.id;
    keywords.push(obj);
  });

  const onSubmit = useDebounce(setCriteria, 300);

  console.log(criteria);

  return (
    <>
      <Header />
      <main className="">
        <form onChange={handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-4 mt-12 w-4/5 mx-auto">
            <div className="w-1/3 flex flex-col gap-1 justify-between">
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
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? "black" : "black",
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
                        const coolValue = val.map((c) => c.value);
                        onChange(coolValue);
                        setCriteria({
                          ...criteria,
                          keywords: coolValue,
                        });
                      }}
                      options={keywords}
                      isMulti={true}
                    />
                  );
                }}
              />
            </div>
            <div className="w-1/3 flex flex-col gap-4">
              <span className="font-bold text-xl">
                Title/Description Search
              </span>
              <TextInput {...register("titleDescription")} />
            </div>
            <div className="w-1/3 flex flex-col gap-4">
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
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? "black" : "black",
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
                        const coolValue = val.map((c) => c.value);
                        onChange(coolValue);
                        setCriteria({
                          ...criteria,
                          decades: coolValue,
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
            <div className="flex gap-3 w-1/4 items-center">
              <Checkbox {...register("inclNoRt")} />
              <label htmlFor="inclNoRt" className="text-xl">
                Include movies with no Rotten Tomatoes Score
              </label>
            </div>
            <div className="w-1/4"></div>
            <div className="flex flex-col w-1/4 gap-3 ">
              <div className="flex justify-between items-center ">
                <label htmlFor="sortingCriteria" className="font-bold">
                  Sort By
                </label>
                <div className="flex items-center gap-2">
                  <Checkbox {...register("sortDescending")} />
                  <label htmlFor="sortDescending">Descending</label>
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
                          borderColor: state.isFocused ? "black" : "black",
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
      <div className="flex flex-col mt-20 gap-6 mx-8">
        <p className="font-bold text-4xl">RESULTS</p>
        <FindMovies criteria={criteria} />
      </div>
      {/*<Footer />*/}
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
  const rawMovies = Array.from(data?.movies ?? []);
  const sortedMovies = sortMovies(rawMovies, criteria);
  const tomatoesRemoved = removeTomatolessFilms(sortedMovies, criteria);
  const filteredByTomatoScore = filterTomatoScore(tomatoesRemoved, criteria);
  const filteredByDecades = filterDecades(filteredByTomatoScore, criteria);
  const filteredByKeyword = keywordSearch(filteredByDecades, criteria);

  if (loading) {
    return <p className="text-center text-3xl font-bold">Loading...</p>;
  }

  if (criteria?.titleDescription) {
    const fuseMovieList = new Fuse(filteredByKeyword, {
      keys: ["title", "description"],
      threshold: 0.2,
    });
    const searchArr = fuseMovieList.search(criteria?.titleDescription);
    const searchedList = searchArr.map((item) => item.item);
    return <MovieCardList movies={searchedList} />;
  }

  return <MovieCardList movies={filteredByKeyword} />;
}

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
  return movies.filter((movie) => {
    for (let i = 0; i < selectedDecades.length; i++) {
      if (
        movie.releaseYear > selectedDecades[i] &&
        movie.releaseYear < movie.releaseYear + 9
      ) {
        return movie;
      }
    }
  });
}

function filterTomatoScore(movies, criteria) {
  if (criteria?.inclNoRt) {
    return movies;
  }
  return movies.filter((movie) => {
    if (
      movie.tomatoScore > criteria?.rtMin &&
      movie.tomatoScore < criteria?.rtMax
    ) {
      return movie;
    }
  });
}
