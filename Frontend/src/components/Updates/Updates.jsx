import React, { useRef, useState } from "react";
import "./Updates.css";
import profie from "../../imgs/profile.png";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import { ColorRing } from "react-loader-spinner";
const Updates = ({ user ,getUserData}) => {
  // console.log(user);
  const [loading, setLoading] = useState(false);

  const fileInputRef=useRef(null);
  const [updatevalue, setUpdatevalue] = useState("");
  const [showProfile, setProfileShowing] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateNumber, setUpdateNumber] = useState("");
  const [profileUrl,setProfileUrl]=useState("");
  const handleEditName = (v) => {
    setUpdatevalue(v);
  };
const handleUpdate=()=>{
  const id=user._id;
  let payload;
  if(updatevalue==="name")
{
  payload={"name":updateName}
}  else if(updatevalue==="email"){
  payload={"email":updateEmail}
}else if(updatevalue==="number"){
  payload={"number":updateNumber}
}else{
  payload={"profileUrl":profileUrl}
}
 
  fetch(`http://localhost:8080/subadmin/edit/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUpdatevalue("");
        getUserData();
        getUserData();

      })
      .catch((err) => console.log(err));
};
const handleImageChange = async(event) => {
  setLoading(true);
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
    setLoading(false);
  } else {
    console.error("Error uploading file:", response.statusText);
    throw new Error("Upload failed");
  }
  // Handle the selected file (e.g., upload or display it)
};
  // console.log(updatevalue, updateName);
  return (
    <div className="Updates">
        {loading && (
        <div className="loading-overlay">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      {/* {UpdatesData.map((update) => {
        return ( */}
      <div className="update" onClick={() => setProfileShowing(true)}>
        <img src={user.profileUrl?user.profileUrl:profie} alt="profile" />
        <div className="noti">
          <div style={{ marginBottom: "0.5rem" }}>
            {/* <span>{user.name}</span> */}
          </div>
        </div>
      </div>
      {/* );
      })} */}
      {/* profile showing detail and edit */}
      <Dialog
        open={showProfile}
        onClose={() => {
          setProfileShowing(false);
          setUpdatevalue("");
        }}
      >
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: "0.5rem", display: "grid" }}>
          <span>
          <img
        src={user.profileUrl!==""?user.profileUrl:profie}
        style={{height:"50px",width:"50px",margin:"auto",alignItems:"center",display:"flex"}}
        alt="Profile"
        className="profile-image"
        onClick={()=>fileInputRef.current.click()}
      />
          <input type="file" accept="image/*"   ref={fileInputRef}
        style={{ display: "none" }} onChange={handleImageChange} />
                {profileUrl&& <Button onClick={handleUpdate}>Update</Button>}

            </span>

            <span>
              Name:-
              {updatevalue === "name" ? (
                <>
                  <Input
                    placeholder="Enter Your Name"
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                  <Button onClick={handleUpdate}>Update</Button>
                </>
              ) : (
                <>
                  {user.name}
                  <Button onClick={() => handleEditName("name")}>Edit</Button>
                </>
              )}
            </span>

            <span>
              Email:-
              {updatevalue === "email" ? (
                <>
                  <Input
                    placeholder="Enter Your Email"
                    onChange={(e) => setUpdateEmail(e.target.value)}
                  />
                  <Button onClick={handleUpdate}>Update</Button>
                </>
              ) : (
                <>
                  {user.email}
                  <Button onClick={() => handleEditName("email")}>Edit</Button>
                </>
              )}
            </span>

            <span>
              Number:-
              {updatevalue === "number" ? (
                <>
                  <Input
                    placeholder="Enter Your Number"
                    onChange={(e) => setUpdateNumber(e.target.value)}
                  />
                  <Button onClick={handleUpdate}>Update</Button>
                </>
              ) : (
                <>
                  {user.number}
                  <Button onClick={() => handleEditName("number")}>Edit</Button>
                </>
              )}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Updates;
