import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import useReponsive from "../../hooks/useReponsive";

export const NotifyContext = React.createContext(null);
const UserTemplate = () => {
  const { isMobile, isTablet, isDesktop } = useReponsive();
  // console.log(isMobile);
  // console.log(isTablet);
  // console.log(isDesktop);
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const [closeTime, setCloseTime] = useState(2000);
  const renderNotify = (notify) => {
    return toast(notify);
  };
  // const handleCloseTime = (time) => {
  //   setCloseTime(time);
  // };
  return (
    <NotifyContext.Provider value={renderNotify}>
      {/* {isLoading ? <Loading /> : null} */}
      <Outlet /> 
      <ToastContainer autoClose={closeTime} theme="dark" />
    </NotifyContext.Provider>
  );
};

export default UserTemplate;
