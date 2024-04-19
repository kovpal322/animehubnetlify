
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AnimeContextProvider } from "./context/animeContext.jsx";
import {UserContextprovider} from "./context/userContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AnimeContextProvider>
      <UserContextprovider>
    <App />
      </UserContextprovider>
  </AnimeContextProvider>
);
