import { Header } from "./components/Header";
import MovieDetails from "./components/MovieDetails";
import Cast from "./components/Cast";

export const App = () => {
  return (
    <div className="bg-f8f0e5">
      <Header />
      <MovieDetails />
      <Cast />
    </div>
  );
};
