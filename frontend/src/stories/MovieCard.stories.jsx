import MovieCard from "../components/MovieCard";
import { movieInfo, sizes } from "../utils/constants";

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

// export const SmallMovieCard = () => (
//   <MovieCard size={sizes.small} movieInfo={movieInfo} className="" />
// );

// export const MediumMovieCard = () => (
//   <MovieCard size={sizes.medium} movieInfo={movieInfo} className="" />
// );

// export const LargeMovieCard = () => (
//   <MovieCard size={sizes.medium} movieInfo={movieInfo} className="" />
// );
