import { useState, useEffect } from "react";
const usegetuserInfo = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = async (id) => {
    try {
      const resp = await fetch("http://localhost:4000/getuser/" + id, {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await resp.json();

      if (!resp.ok) {
        setError("failed to fetch user");
      }

      if (resp.ok) {
        console.log();
        setUserInfo(data);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getUserInfo(user);
  }, []);

  return userInfo, error;
};
export default usegetuserInfo;
