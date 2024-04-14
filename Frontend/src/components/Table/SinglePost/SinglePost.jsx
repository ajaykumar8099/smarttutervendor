import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserAuth } from "../../../Context/UseAuthContext";

const SinglePost = () => {
  const {socket}=useUserAuth();
  const { postID } = useParams();
  const [singlePost, setSinglePost] = useState(null);

  const getSinglePost = () => {
    fetch(`http://localhost:8080/post/singlePost/${postID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setSinglePost(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSinglePost();
  }, [socket]);
  console.log(singlePost);
  return (
    <div className="single-post-container">
      {/* {singlePost && (
        <div className="single-post-card">
          <h3>PostName:- {singlePost.postName}</h3>
          <h5>Post Message:- {singlePost.postMessage}</h5>
          <h5>Main Category:- {singlePost.mainCategory}</h5>
          <h5>Sub Category:- {singlePost.subCategory}</h5>
          <h5>Course Category:- {singlePost.courseCategory}</h5>

          <div className="single-post-media">
            <img src={singlePost.imageUrl} alt={singlePost.postName} />
          </div>
          <div className="single-post-media">
            <video controls width="300" height="100" autoPlay>
              <source src={singlePost.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <Link href={singlePost.zipUrl} className="single-post-link">zipLink</Link>
        </div>
      )} */}
      {singlePost && (
        <Card >
          <CardContent className="single-post-card" >
          <div className="single-post-media">
            <video controls width="400" height="400" autoPlay className="video-height">
              <source src={singlePost.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="single-post-media">
            {/* <img src={singlePost.imageUrl} alt={singlePost.postName} /> */}
          </div>
            <Typography variant="h5" component="h3" className="single-project-head">
             {singlePost.postName}
            </Typography>
            <Typography variant="body1" component="p" className="single-project-description">
              {singlePost.postMessage}
            </Typography>
            <Typography variant="body1" component="p" className="single-project-technologies">
              {singlePost.tags.map((e,i)=>(e.text+","))}
            </Typography>
            {/* <Typography variant="body1" component="p">
            MainCategory:- {singlePost.mainCategory}
            </Typography>
            <Typography variant="body1" component="p">
              SubCategory:- {singlePost.subCategory}
            </Typography>
            <Typography variant="body1" component="p">
           CourseCategory:-  {singlePost.courseCategory}
            </Typography> */}
            <Typography variant="body1" component="p" className="single-project-price">
            Price:- ₹{singlePost.price}
            </Typography>
          </CardContent>
         
          {/* <CardMedia
            className="single-post-media"
            component="img"
            alt={singlePost.postName}
            height="auto"
            image={singlePost.imageUrl}
          /> */}
          
          {/* <CardMedia
            className="single-post-media"
            component="video"
            height="auto"
            autoPlay
            controls
            src={singlePost.videoUrl}
            type="video/mp4"
          /> */}
          <Link href={singlePost.zipUrl} className="single-post-link">
            zipLink
          </Link>
        </Card>
      )}
    </div>
  );
};

export default SinglePost;
