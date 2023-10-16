import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import style from "./JobDetails.module.css";
import { useLocation, useParams } from "react-router-dom";
import useUserContext from "../../Hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setEditJob, jobItem } = useUserContext();
  const [data, setJobData] = useState(null);

  useEffect(() => {
    getJobDetails();
  }, []);

  const getJobDetails = async (req, res) => {
    axios.get(`http://localhost:4000/api/getjobs/` + id).then(
      (response) => {
        if (response.data.success) {
          setJobData(response.data.jobDetails);
        } else {
          console.log(response);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  function handleEditJob() {
    setEditJob(true);
    navigate("/addjob");
  }
  return (
    <div className={style.main}>
      <div className={style.headerContainer}>
        <Header />
        <div className={style.header}>
          <div className={style.title}>
            <span>{data?.jobPosition}</span>{" "}
            <span>
              {data?.inOffice === "remote"
                ? "Work From Home"
                : "Work From Office"}
            </span>{" "}
            <span>{data?.jobType}</span>
            <span style={{ marginLeft: "5px" }}>at</span>{" "}
            <span>{data?.companyName} </span>
          </div>
        </div>
      </div>

      <div className={style.jobDetailsContainer}>
        <div className={style.jobDetails}>
          <div className={style.dateOfPublish}>
            <span>1w ago</span> <span>{data?.jobType}</span>
          </div>

          <div className={style.jobHeader}>
            <div className={style.jobtitle}>
              <h3>{data?.jobPosition}</h3>
              <p className={style.location}>{data?.jobLocation} | india</p>
            </div>
            {user ? (
              <div>
                <button
                  className={style.Edit}
                  onClick={() => {
                    handleEditJob();
                  }}
                >
                  Edit Job
                </button>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className={style.stipendDetails}>
            <div>
              <div>Stipend</div>
              <div>{data?.salary}</div>
            </div>
            <div className={style.duration}>
              <div>Duration</div>
              <div>6 months</div>
            </div>
          </div>

          <div className={style.companyDetails}>
            <h3>About the company</h3>
            <div className={style.aboutCompany}>{data?.aboutCompany}</div>
          </div>

          <div className={style.aboutJob}>
            <h3>About the job/internship</h3>
            <div className={style.jobDesription}>{data?.jobDesription}</div>
          </div>

          <div className={style.skillsRequired}>
            <h3>skill(s) required</h3>
            <div className={style.skills}>
              {/* <div style={{ display: "none" }}>
                {(skills = data.skillsRequired.split(","))}
              </div> */}
              {data?.skillsRequired !== undefined
                ? data?.skillsRequired.map((skill, index) => (
                    <span>{skill}</span>
                  ))
                : ""}
            </div>
          </div>

          <div className={style.additionalInfo}>
            <h3>Additional Information</h3>
            <div>{data?.information}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
