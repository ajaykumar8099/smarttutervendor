import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import profileimage from '../../imgs/profile.png';
export const Register = () => {
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [profileUrl,setProfileUrl] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    const payload = {
      email,
      pass,
      name,
      number,
      isVerified: false,
      profileUrl
    };
    console.log(payload);
    fetch("http://localhost:8080/subadmin/register", {
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
        setNumber("");
        setName("");
        (res.msg === "User registered successfully." ||
          res.msg === "User already exists. Please choose a different mail.") &&
          navigate("/login");
        // navigate("/login");
        // localStorage.setItem("token", res.token);
      })
      .catch((err) => console.log(err));
  };
  const handleImageChange = async(event) => {
    const file = event.target.files[0];
    console.log(file);
    const formData=new FormData();
    formData.append("file", file);
    const response = await fetch("http://localhost:8080/enduser/uploadimage", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      setProfileUrl(data.fileUrl);
    } else {
      console.error("Error uploading file:", response.statusText);
      throw new Error("Upload failed");
    }
    // Handle the selected file (e.g., upload or display it)
  };
  return (
    <div className="main_login">
      <div className="login-container">
        <h1>Register</h1>
        <div className="input-group">
           {/* Display default profile image */}
      <img
        src={profileimage}
        style={{height:"50px",width:"50px",margin:"auto",alignItems:"center",display:"flex"}}
        alt="Profile"
        className="profile-image"
        onClick={()=>fileInputRef.current.click()}
      />
          <input type="file" accept="image/*"   ref={fileInputRef}
        style={{ display: "none" }} onChange={handleImageChange} />
        </div>
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
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Number:</label>
          <input
            type="number"
            placeholder="Enter Your Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Register</button>
        <p>
          Already have an account?
          <NavLink className={"navlink"} to="/login">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};
