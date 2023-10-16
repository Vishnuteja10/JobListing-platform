import React, { useEffect, useState } from "react";
import style from "./AddJob.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../Hooks/useUserContext";

export default function AddJob() {
  const navigate = useNavigate();

  const { editJob, jobItem } = useUserContext();
  console.log("item id :", jobItem._id);

  const [jobType, setJobType] = useState("select");
  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [inOffice, setInOffice] = useState("work");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [information, setInformation] = useState("");
  const [token, setToken] = useState("");

  let data = {
    jobType,
    companyName,
    logoUrl,
    jobPosition,
    salary,
    inOffice,
    jobLocation,
    jobDescription,
    aboutCompany,
    skillsRequired,
    information,
  };

  if (editJob) {
    data = jobItem;
  }

  useEffect(() => {
    setJobType(data.jobType);
    setCompanyName(data.companyName);
    setLogoUrl(data.logoUrl);
    setJobPosition(data.jobPosition);
    setSalary(data.salary);
    setInOffice(data.inOffice);
    setJobLocation(data.jobLocation);
    setJobDescription(data.jobDescription);
    setAboutCompany(data.aboutCompany);
    setSkillsRequired(data.skillsRequired);
    setInformation(data.information);
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleCompanyName = () => {};

  function cancel() {
    navigate("/");
  }

  async function updateJobDetails() {
    const headers = {
      token: token,
    };
    console.log(
      jobType,
      companyName,
      logoUrl,
      jobPosition,
      salary,
      inOffice,
      jobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information
    );
    if (
      !jobType ||
      !companyName ||
      !logoUrl ||
      !jobPosition ||
      !salary ||
      !inOffice ||
      !jobLocation ||
      !jobDescription ||
      !aboutCompany ||
      !skillsRequired ||
      !information
    ) {
      alert("all fields are required!");
    } else {
      data.id = jobItem._id;
      const updatedData = {
        jobType,
        companyName,
        logoUrl,
        jobPosition,
        salary,
        inOffice,
        jobLocation,
        jobDescription,
        aboutCompany,
        skillsRequired,
        information,
        id: jobItem._id,
      };

      console.log("data to sen to update", updatedData);
      axios
        .put("http://localhost:4000/api/update-job", updatedData, { headers })
        .then(
          (response) => {
            console.log("response is:", response);
            console.log("response data is:", response.data);
            console.log("response success", response.data.success);
            if (response.data.success) {
              alert("job data updated");
              navigate("/");
            } else {
              alert("failed to add job");
            }
          },
          (error) => {
            console.log(error);
            alert("error something went wrong");
          }
        );
    }
  }

  async function addJob() {
    const headers = {
      token: token,
    };
    console.log(
      jobType,
      companyName,
      logoUrl,
      jobPosition,
      salary,
      inOffice,
      jobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information
    );
    if (
      !jobType ||
      !companyName ||
      !logoUrl ||
      !jobPosition ||
      !salary ||
      !inOffice ||
      !jobLocation ||
      !jobDescription ||
      !aboutCompany ||
      !skillsRequired ||
      !information
    ) {
      alert("all fields are required!");
    } else {
      axios.post("http://localhost:4000/api/job-post", data, { headers }).then(
        (response) => {
          console.log(response);
          console.log(response.data.success);
          if (response.data.success) {
            alert("job added");
            navigate("/");
          } else {
            alert("failed to add job");
          }
        },
        (error) => {
          console.log(error);
          alert("error something went wrong");
        }
      );
    }
  }

  return (
    <div>
      <div className={style.outerContainer}>
        <div className={style.jobDetailsContainer}>
          <div className={style.jobDetails}>
            <h3>Add job description </h3>

            <div className={style.fieldContainer}>
              <div className={style.label}>Company Name</div>
              <div>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Enter your company name here"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className={style.fieldContainer}>
              <div className={style.label}>Add logo URL</div>
              <div>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Enter the Link"
                  value={logoUrl}
                  onChange={(e) => {
                    setLogoUrl(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className={style.fieldContainer}>
              <div className={style.label}>Job Position</div>
              <div>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Enter the position"
                  value={jobPosition}
                  onChange={(e) => {
                    setJobPosition(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className={style.fieldContainer}>
              <div className={style.label}>Monthly Salary</div>
              <div>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Enter amount in rupees"
                  value={salary}
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className={style.fieldContainer}>
              <div className={style.label}>Job type</div>
              <div>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="select" hidden>
                    select
                  </option>
                  <option value="Full time">Full time</option>
                  <option value="Part time">Part time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div className={style.fieldContainer}>
              <div className={style.label}>Remote/Office</div>
              <div>
                <select
                  value={inOffice}
                  onChange={(e) => setInOffice(e.target.value)}
                >
                  <option value="work" hidden>
                    select
                  </option>
                  <option value="Remote">Remote</option>
                  <option value="Office">Office</option>
                </select>
              </div>
            </div>

            <div className={style.fieldContainer}>
              <div className={style.label}>Location</div>
              <div>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Enter Location"
                  value={jobLocation}
                  onChange={(e) => {
                    setJobLocation(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className={style.fieldContainer}>
              <div className={style.label}>Job description</div>
              <div>
                <textarea
                  placeholder="Type the job description"
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className={style.fieldContainer}>
              <div className={style.label}>About Company</div>
              <div>
                <textarea
                  placeholder="Type about the company"
                  value={aboutCompany}
                  onChange={(e) => {
                    setAboutCompany(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className={style.fieldContainer}>
              <div className={style.label}>Skills Required</div>
              <div>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Enter must have skills"
                  value={skillsRequired}
                  onChange={(e) => {
                    const value = e.target.value;
                    const skills = value.split(",");
                    setSkillsRequired(skills);
                  }}
                />
              </div>
            </div>

            <div className={style.fieldContainer}>
              <div className={style.label}>Information</div>
              <div>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Enter additional information"
                  value={information}
                  onChange={(e) => {
                    setInformation(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className={style.buttons}>
            <div>
              <button className={style.cancel} onClick={() => cancel()}>
                cancel
              </button>
            </div>
            {editJob ? (
              <div>
                <button
                  className={style.addJob}
                  onClick={() => {
                    updateJobDetails();
                  }}
                >
                  {" "}
                  + update job
                </button>
              </div>
            ) : (
              <div>
                <button
                  className={style.addJob}
                  onClick={() => {
                    addJob();
                  }}
                >
                  {" "}
                  + Add job
                </button>
              </div>
            )}
          </div>
        </div>

        {/* right div */}
        <div className={style.image}>
          <h3>Recruiter add job details here</h3>
        </div>
      </div>
    </div>
  );
}
