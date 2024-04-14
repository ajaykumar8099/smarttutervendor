import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import "./MainDash.css";
import { AllRoutes } from "../AllRoutes";
const MainDash = () => {
  return (
    <div className="MainDash">
      {/* <h1>Dashboard</h1> */}
      {/* <Cards />
      <Table /> */}
      <div className="maindash-nav">
       <NavbarDashboard/>
       </div>
       <div className="mainDash-two">
      <AllRoutes/>
      </div>
    </div>
  );
};

export default MainDash;
