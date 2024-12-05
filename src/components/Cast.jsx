import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "./Button";

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    "https://api.themoviedb.org/3/movie/1184918/credits?language=pt-BR";
  const token = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    async function fetchCast() {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar elenco");
        }

        const castData = await response.json();
        setCast(castData.cast.slice(0, 10));
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar elenco: " + error.message);
        setLoading(false);
      }
    }

    fetchCast();
  }, [token]);

  if (loading) return <p>Carregando elenco...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="bg-eadbc8">
      <div className="container py-4">
        <div className="d-flex align-items-center pb-3">
          <h2
            className="fw-bold"
            style={{ fontSize: "36px", marginRight: "15px" }}
          >
            Elenco
          </h2>
          <Button
            style={{
              width: "130px",
              height: "40px",
              borderRadius: "20px",
              fontSize: "24px",
              color: "#F8F0E5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Ver mais
          </Button>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
            1400: { slidesPerView: 6 },
          }}
        >
          {cast.map((actor) => (
            <SwiperSlide key={actor.id}>
              <div className="text-center">
                {actor.profile_path ? (
                  <div
                    style={{
                      width: "190px",
                      height: "190px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 auto",
                      position: "relative",
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: "190px",
                      height: "190px",
                      borderRadius: "50%",
                      backgroundColor: "#ddd",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "0 auto",
                    }}
                  >
                    Sem Foto
                  </div>
                )}
                <p
                  className="fw-bold mb-0 mt-3"
                  style={{
                    fontSize: "16px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {actor.name}
                </p>
                <p
                  className="text-muted"
                  style={{
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {actor.character}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Cast;
