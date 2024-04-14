import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserAuth } from "../../Context/UseAuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
const {setUser}=useUserAuth();

  const handleSubmit = () => {
    const payload = {
      email,
      pass,
    };
    // console.log(payload);
    fetch("http://localhost:8080/subadmin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert(res.msg);
        setEmail("");
        setPass("");
        (res.token&& localStorage.setItem("token", res.token));
       
       (res.token&& getUserData());
      })
      .catch((err) => console.log(err));
  };
  const getUserData = () => {
    fetch("http://localhost:8080/subadmin/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
     
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUser(res)
      })
      .catch((err) => console.log(err));
  };
//   useEffect(()=>{
// getUserData()
//   },[])
  return (
    <div className="main_login">
      <div className="login-container">
        <h1>Login</h1>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter Your password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <p>
          <NavLink to={"/passwordreset"} className={"navlink"}>
            Forgot password?
          </NavLink>
        </p>
        <button onClick={handleSubmit}>Login</button>
        <p>
          Don't have an acount?{" "}
          <NavLink className={"navlink"} to={"/register"}>
            SignIn
          </NavLink>{" "}
        </p>
      </div>
    </div>
  );
};
