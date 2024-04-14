import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { id, token } = useParams();

  const [pass,setPassword]=useState("");
  // console.log(id,token);

  const userValid = async () => {
    const res = await fetch(
      `http://localhost:8080/subadmin/forgotpassword/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.status == 201) {
      console.log("User Valid");
    } else {
      // navigate("/error");
    }
  };

  const setVal=(e)=>{
    setPassword(e.target.value);
  }

  const sendPassword=async(e)=>{
    e.preventDefault();

    const res = await fetch(
      `http://localhost:8080/subadmin/${id}/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({pass})
      }
    );

    const data = await res.json();
    if (data.status == 201) {
     setPassword("")
     alert("password update sucessfully")
    } else {
      // navigate("/error");
      alert("! Token Expired generate new link")
    }
  }
  useEffect(() => {
    userValid();
  }, []);
  return (
    <div className="main-register">
      <h1>Forgot Password</h1>
      <form onSubmit={sendPassword}>
        <input
          type="password"
          name="pass"
          placeholder="Enter Your new password"
          value={pass}
          onChange={setVal}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
