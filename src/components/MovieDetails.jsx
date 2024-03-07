import PropTypes from "prop-types";
import { Button } from "./Button";
import { useEffect, useRef } from "react";
import { MOVIE_API_KEY } from "../config";
import { useState } from "react";
import StarRating from "./StarRating";
import { Loader } from "./Loader";
import { Message } from "./Message";

MovieDetails.propTypes = {
  selectedID: PropTypes.string.isRequired,
  onCloseMovie: PropTypes.func.isRequired,
  onAddWatched: PropTypes.func.isRequired,
  watched: PropTypes.arrayOf(Object),
};

export function MovieDetails({
  selectedID,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const {
    imdbID,
    Title,
    Poster,
    imdbRating,
    Runtime,
    Released,
    Actors,
    Genre,
    Plot,
    Director,
  } = movie;
  function handleAddWatched() {
    const movie = {
      imdbID,
      Title,
      Poster,
      imdbRating,
      Runtime,
      userRating,
    };
    onAddWatched(movie);
  }
  const userAddedRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovie() {
        try {
          setLoading(true);
          setError("");
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${MOVIE_API_KEY}&i=${selectedID}`,
            { signal: controller.signal }
          );
          if (!response.ok)
            throw new Error(
              `Something went wrong with fetching movie (${response.status})`
            );
          const data = await response.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovie(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
        return function () {
          controller.abort();
        };
      }
      fetchMovie();
    },
    [selectedID]
  );
  useEffect(
    function () {
      if (!Title) return;
      document.title = `Movie | ${Title}`;
      return function () {
        document.title = "Usepopcorn";
      };
    },
    [Title]
  );
  const counter = useRef(0);
  useEffect(() => {
    if (userRating === 0) return;
    counter.current++;
  }, [userRating]);
  return (
    <>
      {!loading && error && <Message message={`⛔ ${error} ⛔`} />}
      {loading ? (
        <Loader />
      ) : (
        !error && (
          <div className="details">
            <header>
              <Button className="btn-back" onClick={onCloseMovie}>
                <span>&larr;</span>
              </Button>
              <img src={Poster} alt={Title} />
              <div className="details-overview">
                <h2>{Title}</h2>
                <p>
                  {Released} &bull; {Runtime}
                </p>
                <p>{Genre} </p>
                <p>
                  <span>⭐</span>
                  {imdbRating} IMDB Rating
                </p>
              </div>
            </header>

            <section>
              <div className="rating">
                <StarRating
                  size={2.2}
                  maxRating={10}
                  onSetRating={setUserRating}
                />
                {userAddedRating > 0 && (
                  <p>You rated this movie {userAddedRating}</p>
                )}
                {userRating > 0 && (
                  <Button className="btn-add" onClick={handleAddWatched}>
                    + Add to list
                  </Button>
                )}
              </div>

              <p>
                <em>{Plot}</em>
              </p>
              <p>Starring {Actors}</p>
              <p>Directed by {Director} </p>
            </section>
          </div>
        )
      )}
    </>
  );
}
