import PropType from "prop-types";
import { Button } from "./Button";

WatchedMoviesList.propTypes = {
  watched: PropType.array.isRequired,
  onSelected: PropType.func.isRequired,
  onRemoveWatched: PropType.func.isRequired,
};

export function WatchedMoviesList({ watched, onSelected, onRemoveWatched }) {
  return (
    <ul className="list list-watched">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <div
            className="info-container"
            onClick={() => onSelected(movie.imdbID)}
          >
            <img src={movie.Poster} alt={`${movie.Title} poster`} />

            <div className="list-watche-div">
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>⭐️</span>
                  <span>{movie.imdbRating}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{movie.userRating}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{parseInt(movie.Runtime)} min</span>
                </p>
              </div>
            </div>
          </div>
          <Button
            className="btn-delete"
            onClick={() => onRemoveWatched(movie.imdbID)}
          >
            X
          </Button>
        </li>
      ))}
    </ul>
  );
}
