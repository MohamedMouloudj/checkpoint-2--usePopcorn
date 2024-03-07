import PropTypes from "prop-types";

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  onSelected: PropTypes.func.isRequired,
};

export function MoviesList({ movies, onSelected }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <li key={movie.imdbID} onClick={() => onSelected(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
