import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import Button from "./Button";

const Media = () => {
  const [videos, setVideos] = useState([]);
  const [posters, setPosters] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MOVIE_ID = "1184918";
  const API_BASE_URL = "https://api.themoviedb.org/3/movie";
  const token = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    async function fetchMedias() {
      try {
        const videosResponse = await fetch(
          `${API_BASE_URL}/${MOVIE_ID}/videos?language=pt-BR`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const imagesResponse = await fetch(
          `${API_BASE_URL}/${MOVIE_ID}/images`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!videosResponse.ok || !imagesResponse.ok) {
          throw new Error("Erro ao buscar mídias");
        }

        const videosData = await videosResponse.json();
        const imagesData = await imagesResponse.json();

        setVideos(videosData.results.slice(0, 3));
        setPosters(imagesData.posters.slice(0, 4));
        setBackdrops(imagesData.backdrops.slice(0, 2));

        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar mídias: " + error.message);
        setLoading(false);
      }
    }

    fetchMedias();
  }, [token]);

  if (loading) return <p>Carregando mídias...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container py-5 mt-3">
      <h1 className="fw-bold mb-5" style={{ fontSize: "36px" }}>
        Mídias
      </h1>

      {/* Seção de Vídeos */}
      <div className="mb-1">
        <div className="d-flex align-items-center mb-2">
          <h2 className="fw-bold me-3" style={{ fontSize: "24px" }}>
            Vídeos ({videos.length})
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
        <div className="row g-3">
          {videos.map((video) => (
            <div key={video.id} className="col-12 col-md-4">
              <div
                style={{
                  width: "100%",
                  height: "225px", 
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Posters */}
      <div className="mt-5">
        <div className="d-flex align-items-center mb-2">
          <h2 className="fw-bold me-3" style={{ fontSize: "24px" }}>
            Posters ({posters.length})
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
        <div className="row g-3">
          {posters.map((poster) => (
            <div key={poster.file_path} className="col-12 col-md-3">
              <div
                style={{
                  width: "100%",
                  height: "450px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}
                  alt="Poster"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Imagens de Fundo */}
      <div className="mt-5 mb-5">
        <div className="d-flex align-items-center mb-2">
          <h2 className="fw-bold me-3" style={{ fontSize: "24px" }}>
            Imagens de Fundo ({backdrops.length})
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
        <div className="row g-3">
          {backdrops.map((backdrop) => (
            <div key={backdrop.file_path} className="col-12 col-md-6">
              <div
                style={{
                  width: "100%",
                  height: "350px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
                  alt="Backdrop"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;
