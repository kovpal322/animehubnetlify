import { useContext } from "react";
import { animeContext } from "../context/animeContext";
export const useAnimeContext = () => {
  const context = useContext(animeContext);

  if (!context) {
    throw new Error("anime context error");
  }

  return context;
};
