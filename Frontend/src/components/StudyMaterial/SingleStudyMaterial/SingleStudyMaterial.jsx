// import React from 'react'

// const SingleStudyMaterial = () => {
//   return (
//     <div>SingleStudyMaterial</div>
//   )
// }

// export default SingleStudyMaterial

import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserAuth } from "../../../Context/UseAuthContext";

const SingleStudyMaterial = () => {
  const {socket}=useUserAuth();
  const { studymaterialID } = useParams();
  console.log(studymaterialID);
  const [singleStudymaterial, setSingleStudymaterial] = useState(null);

  const getSingleStudymaterial = () => {
    fetch(`http://localhost:8080/studymaterial/singlestudymaterial/${studymaterialID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setSingleStudymaterial(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSingleStudymaterial();
  }, [socket]);
  console.log(singleStudymaterial);
  return (
    <div className="single-post-container">
      {/* {singleStudymaterial && (
        <div className="single-Studymaterial-card">
          <h3>StudymaterialName:- {singleStudymaterial.StudymaterialName}</h3>
          <h5>Studymaterial Message:- {singleStudymaterial.StudymaterialMessage}</h5>
          <h5>Main Category:- {singleStudymaterial.mainCategory}</h5>
          <h5>Sub Category:- {singleStudymaterial.subCategory}</h5>
          <h5>Course Category:- {singleStudymaterial.courseCategory}</h5>

          <div className="single-Studymaterial-media">
            <img src={singleStudymaterial.imageUrl} alt={singleStudymaterial.StudymaterialName} />
          </div>
          <div className="single-Studymaterial-media">
            <video controls width="300" height="100" autoPlay>
              <source src={singleStudymaterial.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <Link href={singleStudymaterial.zipUrl} className="single-Studymaterial-link">zipLink</Link>
        </div>
      )} */}
      {singleStudymaterial && (
        <Card >
          <CardContent className="single-post-card" >
          {/* <div className="single-Studymaterial-media">
            <video controls width="300" height="100" autoPlay>
              <source src={singleStudymaterial.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div> */}
          {/* <div className="single-Studymaterial-media">
            <img src={singleStudymaterial.OutputScreens} alt={singleStudymaterial.StudymaterialName} />
          </div> */}
            <Typography variant="h5" component="h3" className="sinlge-project-head">
             {singleStudymaterial.MaterialName}
            </Typography>
            <Typography variant="body1" component="p" className="single-project-description">
              {singleStudymaterial.MaterialDescription}
            </Typography>
            {/* <Typography variant="body1" component="p">
              {singleStudymaterial.TechnologiesUsed.map((e,i)=>(e.text+","))}
            </Typography> */}
            {/* <Typography variant="body1" component="p">
            MainCategory:- {singleStudymaterial.MaterialCategory}
            </Typography> */}
            {/* <Typography variant="body1" component="p">
              SubCategory:- {singleStudymaterial.subCategory}
            </Typography>
            <Typography variant="body1" component="p">
           CourseCategory:-  {singleStudymaterial.courseCategory}
            </Typography> */}
            <Typography variant="body1" component="p" className="single-project-price">
            Price:- ₹{singleStudymaterial.Price}
            </Typography>
          </CardContent>
         
          {/* <CardMedia
            className="single-Studymaterial-media"
            component="img"
            alt={singleStudymaterial.StudymaterialName}
            height="auto"
            image={singleStudymaterial.imageUrl}
          /> */}
          
          {/* <CardMedia
            className="single-Studymaterial-media"
            component="video"
            height="auto"
            autoPlay
            controls
            src={singleStudymaterial.videoUrl}
            type="video/mp4"
          /> */}
          <Link href={singleStudymaterial.MaterialZip} className="single-post-link">
            zipLink
          </Link>
          {/* <Link href={singleStudymaterial.UploadDocumentFile} className="single-Studymaterial-link">
            DocumentLink
          </Link> */}
        </Card>
      )}
    </div>
  );
};

export default SingleStudyMaterial;
