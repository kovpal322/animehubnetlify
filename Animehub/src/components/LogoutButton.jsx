import { useUserContext } from "../hooks/useUserContext.jsx";

const LogoutButton = () => {
  const { dispatch } = useUserContext();
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "logout_user" });
    window.location.assign("/");
  };
  return (
    <div>
      <button onClick={handleLogout} className="btn btn-primary m-2">
        logout
      </button>
    </div>
  );
};

export default LogoutButton;
