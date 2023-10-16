import { useContext, createContext, useState } from "react";

const UserContext = createContext();

const Provider = ({ children }) => {
  const [userLogin, setUserLogin] = useState();
  const [jobsData, setJobsData] = useState();
  const [user, setUser] = useState();
  const [jobItem, setJobItem] = useState({});
  const [editJob, setEditJob] = useState(false);

  const data = {
    userLogin,
    setUserLogin,
    jobsData,
    setJobsData,
    user,
    setUser,
    jobItem,
    setJobItem,
    editJob,
    setEditJob,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { Provider };

export default UserContext;
