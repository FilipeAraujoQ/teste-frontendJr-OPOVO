import { useEffect, useState } from "react";
import CardReview from "./CardReview";
import Button from "./Button";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [displayAllReviews, setDisplayAllReviews] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://api.themoviedb.org/3/movie/1184918/reviews";

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        if (!TOKEN) {
          throw new Error("Token não configurado");
        }

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar resenhas do filme");
        }

        const data = await response.json();
        setReviews(data.results);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar resenhas: " + error.message);
        setLoading(false);
      }
    }

    fetchMovieReviews();
  }, []);

  const handleToggleReviews = () => {
    setDisplayAllReviews(!displayAllReviews);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  const displayReviews = displayAllReviews ? reviews : reviews.slice(0, 2);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center">
        <h2
          className="fw-bold"
          style={{ fontSize: "36px", marginRight: "15px" }}
        >
          Resenhas
        </h2>
        {reviews.length > 2 && (
          <Button
            onClick={handleToggleReviews}
            style={{
              width: "125px",
              height: "40px",
              borderRadius: "20px",
              fontSize: "24px",
              color: "#F8F0E5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {displayAllReviews ? "Ver menos" : "Ver mais"}
          </Button>
        )}
      </div>
      <div className="row">
        {displayReviews.map((review) => (
          <div key={review.id} className="col-md-6 mb-4">
            <CardReview review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;