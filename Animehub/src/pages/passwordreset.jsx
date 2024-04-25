import { useState } from "react";
import Header from "../components/header.jsx";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Reset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const params = useParams();
  const setNewPassword = async (e) => {
    e.preventDefault();
    const { user_id } = params;
    if (password !== confirmPassword) {
      setError("passwords does not match");
      return;
    }

    if (!password || !confirmPassword) {
      setError("fill in all the inputs");
      return;
    }
    try {
      const resp = await axios.patch(
        "https://animehubproject.onrender.com/reset-password/" + user_id,
        { password }
      );
      setMessage(resp.data);
      if (resp.data.includes("password updated")) {
        setTimeout(() => {
          window.location.assign("/login");
        }, 1500);
      }

      setTimeout(() => {
        setMessage("");
        setError("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <>
      <Header>
        <a href="register" className="btn btn-primary">
          register
        </a>
      </Header>
      <div id="login">
        <h3 className="text-center text-white pt-5">New password</h3>
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form" action="" onSubmit="">
                  <div className="form-group">
                    <label htmlFor="password1" className="text-white">
                      Password
                    </label>
                    <br />
                    <input
                      type="password"
                      name="password1"
                      id="password1"
                      className="form-control border-0 search"
                      placeholder="Enter your new password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password2" className="text-white">
                      Password again
                    </label>
                    <br />
                    <input
                      type="password"
                      name="password2"
                      id="password2"
                      className="form-control border-0 search"
                      placeholder="Enter your password again"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-primary mb-3 mt-3"
                      value="submit"
                      onClick={setNewPassword}
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {message && (
                    <div className="alert alert-success">{message}</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
