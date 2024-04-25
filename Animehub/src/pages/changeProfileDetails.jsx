import { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import Header from "../components/header";
import LogoutButton from "../components/LogoutButton";
import axios from "axios";
const ChangeProfileDetails = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
    currentPassword: "",
  });

  const { user } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        "https://animehubproject.onrender.com/update/user/" + user.user,
        {
          method: "PATCH",
          body: JSON.stringify(userDetails),

          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + user.token,
          },
        }
      );
      const data = await resp.json();

      if (!resp.ok) {
        setError(data);
      }

      if (resp.ok) {
        setSuccess(data);
        setError("");

        setUserDetails({
          username: "",
          password: "",
          email: "",
          currentPassword: "",
        });
      }
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div>
      <div>
        <Header>{user && <LogoutButton></LogoutButton>}</Header>
        <div id="login">
          <h3 className="text-center text-white pt-5">Change credentials</h3>
          <div className="container">
            <div
              id="login-row"
              className="row justify-content-center align-items-center"
            >
              <div id="login-column" className="col-md-6">
                <div id="login-box" className="col-md-12">
                  <form
                    id="login-form"
                    className="form"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group">
                      <label htmlFor="email" className="text-white">
                        Email:
                      </label>
                      <br />
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control border-0 search"
                        placeholder="Email"
                        value={userDetails.email}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="new-password" className="text-white">
                        New Password:
                      </label>
                      <br />
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        className="form-control border-0 search"
                        placeholder="New Password"
                        value={userDetails.password}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="text-white">
                        Current Password:
                      </label>
                      <br />
                      <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        className="form-control border-0 search"
                        placeholder="Current Password"
                        value={userDetails.currentPassword}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            currentPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="text" className="text-white">
                        username:
                      </label>
                      <br />
                      <input
                        type="text"
                        name="text"
                        id="text"
                        className="form-control border-0 search"
                        placeholder="username"
                        value={userDetails.username}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <button
                        onClick={handleSubmit}
                        className=" btn btn-primary form-control "
                      >
                        change
                      </button>
                    </div>
                  </form>

                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}
                  {error && <div className="alert alert-danger">{error}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangeProfileDetails;
