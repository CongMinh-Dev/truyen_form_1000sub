import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import KiemTraImg from "../pages/KiemTraImg/KiemTraImg";


const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,

    },
    {
      path: "/kiem-tra",
      element: <KiemTraImg />,

    },




  ]);
  return routes;
};

export default useRoutesCustom;




