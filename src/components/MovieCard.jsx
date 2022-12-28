import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";
import axios from "axios";

export const MovieCard = () => {
  const location = useLocation();
  const { search } = queryString.parse(location.search);
  const [estado, setEstado] = useState(false);

  const [movie, setMovie] = useState({});

  useEffect(() => {
    const movieId = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${search}?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }&language=en-US`
      );
      setEstado(true);
      setMovie(data);
    };

    if (search) {
      movieId();
    }
  }, [search]);

  return (
    <div className="flex  gap-4 justify-center  items-center container">
      {estado ? (
        <div className="lg:shadow-2xl flex flex-col lg:flex-row  gap-6 items-center p-10 rounded-2xl">
          <div>
            <img
              className=" h-72 rounded-2xl"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            />
          </div>

          <div className="w-96">
            <h1 className="text-indigo-500 text-center font-semibold my-3">
              {movie.title}
            </h1>
            <p className="text-sm text-justify">{movie.overview}</p>
            <p className="text-sm">
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <div className="flex gap-4 justify-center lg:justify-start items-center mt-3">
              <p className="rounded-full w-16 h-16 bg-indigo-400 text-white text-sm flex items-center justify-center">
                {movie.popularity}
              </p>
              <p>{movie.status}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>Has una busqueda</div>
      )}
    </div>
  );
};
