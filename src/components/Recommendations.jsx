import { useEffect, useState } from "react";

const Recommendations = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = import.meta.env.VITE_TMDB_TOKEN;
  const recommendedMovieIds = [808, 49013, 862, 954, 34134, 126963];

  useEffect(() => {
    async function fetchRecommendedMovies() {
      try {
        const movieDetails = await Promise.all(
          recommendedMovieIds.map(async (movieId) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              throw new Error(`Erro ao buscar filme ${movieId}`);
            }

            return await response.json();
          })
        );

        setMovies(movieDetails);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar recomendações de filmes: " + error.message);
        setLoading(false);
      }
    }

    fetchRecommendedMovies();
  }, [token]);

  if (loading) {
    return <p className="text-f8f0e5">Carregando recomendações...</p>;
  }

  if (error) {
    return <p className="text-center text-f8f0e5">{error}</p>;
  }

  return (
    <div className="bg-102c57">
      <div className="container-xl pt-4">
        <h2 className="text-f8f0e5 mb-3 pt-2">Recomendações</h2>
        <div className="row pt-1">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-2 text-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="img-fluid rounded mb-2"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
              />
              <p className="fw-bold mb-1 text-f8f0e5">{movie.title}</p>
              <p className="text-f8f0e5">
                {Math.round(movie.vote_average * 10)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
