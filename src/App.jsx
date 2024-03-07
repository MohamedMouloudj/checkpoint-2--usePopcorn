/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { Box } from "./components/Box";
import { Main } from "./components/MainContainer";
import { NavBar } from "./components/NavBar";
import { MoviesList } from "./components/MoviesList";
import PropeType from "prop-types";
import { WatchedMoviesHeader } from "./components/WatchedMoviesHeader";
import { WatchedMoviesList } from "./components/WatchedMoviesList";
import { MovieDetails } from "./components/MovieDetails";
import { Loader } from "./components/Loader";
import { Message } from "./components/Message";
import { useMovies } from "./useMovies";
import { useLocaleStorage } from "./useLocalStorage";
import { useKEy } from "./useKey";

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

SearchBar.propTypes = {
  query: PropeType.string.isRequired,
  setQuery: PropeType.func.isRequired,
};

function SearchBar({ query, setQuery }) {
  const inputElement = useRef(null);
  useKEy("Enter", () => {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}

function NumberFound({ foundNum }) {
  return (
    <p className="num-results">
      Found <strong>{foundNum}</strong> results
    </p>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const { movies, loading, error } = useMovies(query, handleSelected);
  const [selectedID, setSelectedID] = useState(null);
  const [watched, setWatched] = useLocaleStorage([], "watched");

  useKEy("Escape", () => setSelectedID(null));

  function handleSelected(imdbID) {
    setSelectedID((ID) => (imdbID === ID ? null : imdbID));
  }
  function handleAddWatched(movie) {
    let movieExists;
    setWatched((prev) => {
      movieExists = prev.find((m) => m.imdbID === movie.imdbID);
      if (movieExists && movie.userRating !== movieExists.userRating) {
        const newArr = prev.filter((mv) => mv.imdbID !== movieExists.imdbID);
        // localStorage.setItem("watched", JSON.stringify([...newArr, movie]));
        return [...newArr, movie];
      }
      if (movieExists) return prev;
      // localStorage.setItem("watched", JSON.stringify([...prev, movie]));
      return [...prev, movie];
    });
  }

  function handleRemoveWatched(imdbID) {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== imdbID));
  }
  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumberFound foundNum={movies.length} />
      </NavBar>
      <Main>
        <Box>
          {query.length <= 1 ? (
            <Message message="Search for a movie..." />
          ) : loading ? (
            <Loader />
          ) : error ? (
            <Message message={`⛔ ${error.message} ⛔`} />
          ) : (
            <MoviesList movies={movies} onSelected={handleSelected} />
          )}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onCloseMovie={() => setSelectedID(null)}
              onAddWatched={handleAddWatched}
              watched={watched}
              key={selectedID}
            />
          ) : (
            <>
              <WatchedMoviesHeader watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onSelected={handleSelected}
                onRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
