import { movieInfo, sizes } from "../../utils/constants";
import { MovieCard } from "./movie-card";

export default {
  title: "Movie Card",
  component: MovieCard,
};

const Template = (args) => <MovieCard {...args} />;

export const SmallMovieCard = Template.bind({});
SmallMovieCard.args = {
  size: sizes.small,
  movieInfo: movieInfo,
  className: "",
};

export const MediumMovieCard = Template.bind({});
MediumMovieCard.args = {
  size: sizes.medium,
  movieInfo: movieInfo,
  className: "",
};

export const LargeMovieCard = Template.bind({});
LargeMovieCard.args = {
  size: sizes.large,
  movieInfo: movieInfo,
  className: "",
};
