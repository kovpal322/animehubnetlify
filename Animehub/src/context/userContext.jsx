import { useReducer, createContext, useEffect } from "react";

export const userContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { user: action.payload };

    case "LOGOUT_USER":
      return { user: null };
  }
};
export const UserContextprovider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN_USER", payload: user });
    }
  }, []);

  return (
    <userContext.Provider value={{ ...state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};
