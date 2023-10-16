import JobItem from "../../Components/JobItem/JobItem";
import style from "./Home.module.css";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import useUserContext from "../../Hooks/useUserContext";


export default function Home() {
  const navigate = useNavigate();
  const [selectedSkill, setSkill] = useState("skills");
  const [skills, setSkills] = useState([]);
  const [searchJob, setSearchJob] = useState("");
  const { jobsData, setJobsData, user, setEditJob } = useUserContext();

  async function getjobs(searchItem, reqSkills) {
    axios
      .get("http://localhost:4000/api/getjobs", {
        params: {
          searchItem,
          skills: reqSkills.join(","),
        },
      })
      .then(
        (response) => {
          const data = response.data.data;
          setJobsData(data);;
        },
        (error) => {
          console.log("error", error);
        }
      );
  }

  // console.log("final job data", jobsData);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getjobs(searchJob, skills);
    if (token) {
      const user = jwt(token);
      
      if (!user) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  }, [searchJob, skills]);

 

  function removeElement(item) {
    const updatedSkills = skills.filter((s) => s !== item);
    setSkills(updatedSkills);
  }

  function handleSearch(e) {
    const value = e.target.value;
    setSearchJob(value);
  }

  function handleChange(e) {
    const skill = e.target.value;
    setSkill(e.target.value);
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  }

  return (
    <div>
      <Header />

      <div>
        <div className={style.searchContainer}>
          <div>
            <input
              className={style.search}
              type="text"
              placeholder="Type any job title"
              onChange={handleSearch}
            />
          </div>

          <div className={style.filterContainer}>
            <div>
              <select value={selectedSkill} onChange={handleChange}>
                <option value={"skills"} disabled hidden>
                  skills
                </option>
                <option value={"html"}>Html</option>
                <option value={"css"}>css</option>
                <option value={"javascript"}>javascript</option>
                <option value={"reactjs"}>reactjs</option>
                <option value={"ProblemSolving"}>ProblemSolving</option>
                <option value={"nodejs"}>nodejs</option>
                <option value={"expressjs"}>expressjs</option>
                <option value={"mongodb"}>mongodb</option>
                <option value={"java"}>reactjs</option>
                <option value={"python"}>reactjs</option>
              </select>
            </div>
            <div className={style.skillsContainer}>
              {skills.map((item, index) => (
                <div className="">
                  <div className={style.skill}>
                    <span className={style.skillName}>{item}</span>
                    <span
                      className={style.remove}
                      onClick={() => {
                        removeElement(item);
                      }}
                    >
                      x
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.clear} onClick={() => setSkills([])}>
              Clear
            </div>
            {user ? (
              <div className={style.addJob}>
                <button
                  onClick={() => {
                    setEditJob(false);
                    navigate("/AddJob");
                  }}
                >
                  +Add Job
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className={style.jobItems}>
        <JobItem />
      </div>
    </div>
  );
}
