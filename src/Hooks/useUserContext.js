import { useContext } from "react";
import UserContext from "../context/useContext";

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;
