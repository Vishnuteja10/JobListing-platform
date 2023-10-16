import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import useUserContext from "../../Hooks/useUserContext";

export default function () {
  const navigate = useNavigate();
  const { user, setUser, setUserLogin } = useUserContext();
 

  useEffect(() => {
    const userName = localStorage.getItem("user");
    setUser(userName);
  }, [user]);

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUserLogin(false);
    setUser("");
  }

  return (
    <div>
      <div className={style.header}>
        <div className={style.titleContainer}>
          <h3>Jobfinder</h3>
        </div>
        {user ? (
          <div className={style.buttonContainer}>
            <button className={style.logout} onClick={logout}>
              Logout
            </button>
            <span className={style.userName}>Hello! {user}</span>
            <span>
              <img src={logo} />
            </span>
          </div>
        ) : (
          <div className={style.buttonContainer}>
            <button className={style.login} onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              className={style.register}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
