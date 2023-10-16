import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import style from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please enter eamil and password"
  );

  function Login(e) {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
      setErrorMessage("please enter eamil and password");
    } else {
      setError(false);
      axios.post("http://localhost:4000/api/login", { email, password }).then(
        (response) => {
          if (response.data !== undefined) {
            if (response.data.success) {
              alert("login success");
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("user", response.data.existingUser.name);
              navigate("/");
            }
          } else {
            alert("login failed");

            setError(true);
            setErrorMessage(response.data.errorMessage);
          }
        },
        (error) => {
          setError(true);

          setErrorMessage(error.response.data.errorMessage || error.message);
        }
      );
    }
  }

  return (
    <div>
      <div className={style.main}>
        <div className={style.register}>
          <div className={style.formContainer}>
            <form onSubmit={Login}>
              <div className={style.formHeader}>
                <h2>Already have an account</h2>
                <span>Your Personal Job Finder is here</span>
              </div>
              <div className={style.inputs}>
                <div className={style.inputContainer}>
                  <input
                    placeholder="Email"
                    type="email"
                    className={style.input}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={style.inputContainer}>
                  <input
                    placeholder="Password"
                    type="password"
                    className={style.input}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <div>
                    <p className={style.errorMessage}>{errorMessage}</p>
                  </div>
                )}
              </div>
              <div>
                <button className={style.signInButton}> Sign in</button>
              </div>

              <div className={style.signIn}>
                <span>Dont have an account?</span>
                <span>
                  <a href="/register">SignUp</a>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className={style.logoContainer}>
          <h3 className={style.header}>Your Personal Job Finder</h3>
          <img className={style.logo} src={logo}></img>
        </div>
      </div>
    </div>
  );
}
