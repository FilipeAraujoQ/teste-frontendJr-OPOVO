import Cast from "./components/Cast";
import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails";
import Review from "./components/Review";

export const App = () => {
  return (
    <div className="bg-f8f0e5">
      <Header />
      <MovieDetails />
      <Cast />
      <Review />
    </div>
  );
};
