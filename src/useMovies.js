import { useState, useEffect } from "react";
import { MOVIE_API_KEY } from "./config";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      callback?.(null);
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${MOVIE_API_KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!response.ok)
            throw new Error(
              `Something went wrong with fetching movies (${response.status})`
            );
          const data = await response.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovies(data.Search);
          setError("");
        } catch (error) {
          if (error.name !== "AbortError") setError(error.message);
        } finally {
          setLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, loading, error };
}
