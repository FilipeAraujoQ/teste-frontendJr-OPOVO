import { useEffect, useState } from "react";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://api.themoviedb.org/3/movie/1184918?language=pt-BR";
  const token = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do filme");
        }

        const movieData = await response.json();
        const releaseYear = movieData.release_date.split("-")[0];

        setMovie({
          ...movieData,
          releaseYear,
        });
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar detalhes do filme: " + error.message);
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [token]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container">
      <div className="row fs-3 py-4 bg-eadbc8">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded mb-3"
          />
        </div>
        <div className="col-md-8">
          <h2 className="mb-3 fs-1">
            {movie.title} ({movie.releaseYear})
          </h2>
          <p>
            <strong>Gêneros:</strong>
            <br />
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Sinopse:</strong>
            <br />
            {movie.overview}
          </p>
          <div className="row">
            <div className="col-6">
              <p>
                <strong>Situação:</strong>
                <br />
                {movie.status}
              </p>
              <p>
                <strong>Idioma Original:</strong>
                <br />
                {movie.original_language.toUpperCase()}
              </p>
            </div>
            <div className="col-6">
              <p>
                <strong>Orçamento:</strong>
                <br />
                R${movie.budget.toLocaleString("pt-BR")}
              </p>
              <p>
                <strong>Receita:</strong>
                <br />
                R${movie.revenue.toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;