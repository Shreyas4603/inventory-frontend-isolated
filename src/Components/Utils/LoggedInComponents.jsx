import React from "react";
import { useSelector } from "react-redux";
const LoggedInComponents = ({children}) => {
  const { userInfo } = useSelector((state) => state.auth);

  return <div className={`${userInfo ? "block" : "hidden"}`}>{children}</div>;
};

export default LoggedInComponents;
