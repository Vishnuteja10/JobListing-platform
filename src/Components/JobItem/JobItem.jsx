import React from "react";
import style from "./JobItem.module.css";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../Hooks/useUserContext";

export default function JobItem() {
  const { jobsData, setJobItem } = useUserContext();
  const navigate = useNavigate();

  return (
    <div>
      {jobsData !== undefined
        ? jobsData.map((item, index) => (
            <div className={style.jobItem}>
              <div className={style.container}>
                <div className={style.jobDetailsContainer}>
                  <div className={style.logo}>
                    <img src={item.logoUrl} />
                  </div>
                  <div className={style.jobDetails}>
                    <div className={style.jobRole}>{item.jobPosition}</div>
                    <div className={style.jobRoleDetails}>
                      <div className={style.companySize}>50 - 100</div>
                      <div className={style.salaryRange}>
                        &#8377; {item.salary}
                      </div>
                      <div className={style.jobLocation}>
                        {item.jobLocation}
                      </div>
                    </div>
                    <div className={style.jobTypeContainer}>
                      <span className={style.inOffice}>{item.inOffice}</span>{" "}
                      <span className={style.jobType}>{item.jobType}</span>
                    </div>
                  </div>
                </div>

                <div className={style.skills}>
                  <div className={style.skillsList}>
                    {item.skillsRequired !== undefined
                      ? item.skillsRequired.map((skill, index) => (
                          <div className={style.skill}>{skill}</div>
                        ))
                      : ""}
                  </div>
                  <div className={style.viewDetails}>
                    <button
                      onClick={() => {
                        setJobItem(item);
                        navigate(`/${item._id}`);
                      }}
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}
