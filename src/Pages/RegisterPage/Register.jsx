import React, { useEffect, useState } from "react";
import style from "./Register.module.css";
import logo from "../../Assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("All fields are required!");

  function Register(e) {
    e.preventDefault();

    if (!name || !email || !phoneNumber || !password) {
      setError(true);
      setErrorMessage("All fields are required!");
    } else {
      setError(false);
      const data = {
        name,
        email,
        phoneNumber,
        password,
      };
      const options = {
        headers: { "content-type": "application/json" },
      };

      axios.post("http://localhost:4000/api/register", data, options).then(
        (response) => {
       
          if (response.data.success) {
            setError(false);
            alert("registration success");
            localStorage.setItem("user", name);
            navigate("/");
          } else {
            setError(true);
            setErrorMessage("something went wrong!");
          }
        },
        (error) => {
          
          setError(true);
          setErrorMessage(error.response.data.errorMessage);
        }
      );
    }
  }

  return (
    <div>
      <div className={style.main}>
        <div className={style.register}>
          <div className={style.formContainer}>
            <form onSubmit={Register}>
              <div className={style.formHeader}>
                <h2>Create an account</h2>
                <span>Your Personal Job Finder is here</span>
              </div>

              <div className={style.inputContainer}>
                <input
                  placeholder="Name"
                  type="text"
                  className={style.input}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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
                  placeholder="Mobile"
                  type="number"
                  className={style.input}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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

              <div>
                <p className={style.errorMessage}>
                  {error && JSON.stringify(errorMessage)}
                </p>
              </div>

              <div className={style.inputContainer}>
                <input type="checkbox" />
                <span>
                  By creating an accout i agree to terms of use and privacy
                  policy
                </span>
              </div>

              <div>
                <button className={style.registerButton}>
                  {" "}
                  create account
                </button>
              </div>

              <div className={style.signIn}>
                <span>Already have an account?</span>
                <span>
                  <a href="/login">SignIn</a>
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
