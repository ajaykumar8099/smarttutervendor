import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../page/Home";

import { Payment } from "../page/Payment/Payment";
import { Login } from "../page/Authentication/Login";
import { CreatePost } from "../page/Post/CreatePost";
import { Register } from "../page/Authentication/Register";
import Passwordreset from "../page/Authentication/Passwordreset";
import PrivateRotes from "./PrivateRotes";
import ForgotPassword from "../page/Authentication/ForgotPassword";
import SinglePost from "./Table/SinglePost/SinglePost";
import CreateProject from "../page/Project/CreateProject";
import SingleProject from "./ProjectTable/SingleProject/SingleProject";
import StudyMaterial from "../page/StudyMaterial/StudyMaterial";
import SingleStudyMaterial from "./StudyMaterial/SingleStudyMaterial/SingleStudyMaterial";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRotes>
            <Home />
          </PrivateRotes>
        }
      />
      <Route
        path="/createpost"
        element={
          <PrivateRotes>
            <CreatePost />
          </PrivateRotes>
        }
      />
      <Route path="/post/:postID" element={<SinglePost />} />

      <Route
        path="/createproject"
        element={
          <PrivateRotes>
            <CreateProject />
          </PrivateRotes>
        }
      />
      <Route path="/project/:projectID" element={<SingleProject />} />

      <Route
        path="/createstudymaterial"
        element={
          <PrivateRotes>
            <StudyMaterial />
          </PrivateRotes>
        }
      />
      <Route
        path="/studymaterial/:studymaterialID"
        element={<SingleStudyMaterial />}
      />

      <Route
        path="/payment"
        element={
          <PrivateRotes>
            <Payment />
          </PrivateRotes>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/passwordreset" element={<Passwordreset />} />
      <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
    </Routes>
  );
};
