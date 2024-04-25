import { useReducer, createContext } from "react";
import { useState, useLayoutEffect } from "react";

import axios from "axios";
export const animeContext = createContext();
export const animeReducer = (state, action) => {
  switch (action.type) {
    case "GET_ANIMES":
      return { animes: action.payload };
    case "DELETE_ANIME":
      return {
        animes: state.animes.filter((anime) => anime._id !== action.payload),
      };

    case "FILTER_ANIMES":
      return { filteredAnimes: [...action.payload] };

    case "UPLOAD_ANIMES":
      return { animes: [...state.animes, action.payload] };
  }
};

export const AnimeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(animeReducer, {
    animes: [],
    filteredAnimes: [],
  });

  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/get/animes/?q="
        );

        dispatch({ type: "GET_ANIMES", payload: response.data });
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };
    fetchAnimes();
  }, [dispatch]);

  return (
    <animeContext.Provider value={{ ...state, dispatch, error }}>
      {children}
    </animeContext.Provider>
  );
};
