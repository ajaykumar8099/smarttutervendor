import React from "react";
import CustomerReview from "../CustomerReview/CustomerReview";
import Updates from "../Updates/Updates";
import "./RightSide.css";
import { useUserAuth } from "../../Context/UseAuthContext";

const RightSide = () => {
  const {user,getUserData}=useUserAuth();
  // console.log(user);
  return (
    <div className="RightSide">
      <div>
        {/* <h3>Profile</h3> */}
      {user.isVerified&&<Updates user={user} getUserData={getUserData}/>}
        
      </div>
      <div>
        {/* <h3>Customer Review</h3> */}
        {/* <CustomerReview /> */}
      </div>
    </div>
  );
};

export default RightSide;
