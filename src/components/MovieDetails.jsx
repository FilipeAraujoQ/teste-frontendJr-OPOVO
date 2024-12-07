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
    <div className="container-xl">
      <div className="row fs-3 py-4">
        <div className="col-12 col-lg-4 text-center text-lg-start">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded mb-3"
          />
        </div>
        <div className="col-12 col-lg-8">
          <h1 className="mb-3 text-center text-lg-start w-100">
            {movie.title} <span className="text-dac0a3">({movie.releaseYear})</span>
          </h1>
          {/* Gêneros */}
          <div className="mb-3">
            <h3 className="mb-2">Gêneros</h3>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
          {/* Sinopse */}
          <div className="mb-3">
            <h3 className="mb-2" style={{ fontSize: "1.25rem" }}>
              Sinopse
            </h3>
            <p>{movie.overview}</p>
          </div>
          {/* Informações adicionais */}
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#555",
                    marginBottom: "0.25rem",
                  }}
                >
                  Situação
                </h3>
                <p>{movie.status}</p>
              </div>
              <div className="mb-3">
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#555",
                    marginBottom: "0.25rem",
                  }}
                >
                  Idioma Original
                </h3>
                <p>{movie.original_language.toUpperCase()}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#555",
                    marginBottom: "0.25rem",
                  }}
                >
                  Orçamento
                </h3>
                <p>R${movie.budget.toLocaleString("pt-BR")}</p>
              </div>
              <div className="mb-3">
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#555",
                    marginBottom: "0.25rem",
                  }}
                >
                  Receita
                </h3>
                <p>R${movie.revenue.toLocaleString("pt-BR")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
