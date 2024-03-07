import { useState, useEffect } from "react";

export function useLocaleStorage(initState, key) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initState
  );
  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [value, key]
  );
  return [value, setValue];
}
