import { useEffect } from "react";
export function useKEy(key, action) {
  useEffect(
    function () {
      const callBack = (e) =>
        e.code.toLowerCase() === key.toLowerCase() && action?.();
      document.addEventListener("keydown", callBack);
      return () => document.removeEventListener("keydown", callBack);
    },
    [key, action]
  );
}
