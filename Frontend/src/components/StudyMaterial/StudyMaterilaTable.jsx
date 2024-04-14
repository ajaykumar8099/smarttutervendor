// import React from 'react'

// const StudyMaterilaTable = () => {
//   return (
//     <div>StudyMaterilaTable</div>
//   )
// }

// export default StudyMaterilaTable
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UilEditAlt } from "@iconscout/react-unicons";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { UilFilePlus } from "@iconscout/react-unicons";
import { UilCheckCircle } from '@iconscout/react-unicons'
import { UilTimesCircle } from '@iconscout/react-unicons'
import "../ProjectTable/Project.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useUserAuth } from "../../Context/UseAuthContext";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import "./StudyMaterialTable.css"
// function createData(name, trackingId, date, status) {
//   return { name, trackingId, date, status };
// }

// const StudyMaterial = [
//   createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
//   createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
//   createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
//   createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
// ];

const makeStyle = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};
// const DeleteConfirmationPopup = ({ onConfirm, onCancel }) => {
//   return (
//     // <div className="popup">
//     //   <p>Are you sure you want to delete this post?</p>
//     //   <button onClick={onConfirm}>Delete</button>
//     //   <button onClick={onCancel}>Cancel</button>
//     // </div>
//     <Dialog open={onConfirm} onClose={()=>oncancel}>
// <DialogTitle>Are you sure you want to delete this post ?</DialogTitle>
// <DialogActions>
// <Button onClick={onConfirm}>Delete</Button>

//   <Button onClick={onCancel} >Cancel</Button>
// </DialogActions>
//     </Dialog>
//   );
// };
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
const StudyMaterilaTable = () => {
  const isSmallDevice = window.innerWidth <= 766;
  const {
    fetchStudyMaterialData,
    StudyMaterial,
    getCourseCategory,
    getMainCategory,
    getSubCategory,
    courseCategory,
    subCategory,
    mainCategory,
    socket
  } = useUserAuth();
  console.log(StudyMaterial);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  // const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [abstractword, setAbstractword] = useState("");

  const [imageURL, setImage] = useState(null);
  const [pdfURL, setPDFUrl] = useState(null);
  const [zipURL, setZipUrl] = useState(null);
  const [price, setPrice] = useState(0);
  const [singlepost, setsingelPost] = useState("");
  const [tags, setTags] = useState([]);

  const [editName, setEditName] = useState(""); // State to store edited name
  const [editMessage, setEditMessage] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editabstractword, setEditAbstractWord] = useState("");
  const [editTags, setEditTags] = useState([]);
  const [showform, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studymaterialidToDelete, setstudymaterialidToDelete] = useState(null);
  const [mainCategoryselectedOption, setMainCategoryesSelectedOption] =
    useState(null);

  const [subCategoryselectedOption, setSubCategoryesSelectedOption] =
    useState(null);
  const [courseCategoryselectedOption, setCourseCategoryesSelectedOption] =
    useState(null);

    const [smallDevice, setIsSmallDevice] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallDevice(window.innerWidth <= 768);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  

  const handleOptionChangeMainCategory = (e) => {
    setMainCategoryesSelectedOption(e.target.value);
  };
  console.log(mainCategoryselectedOption);
  const handleOptionChangeSubCategory = (e) => {
    setSubCategoryesSelectedOption(e.target.value);
  };
  console.log(subCategoryselectedOption);
  const handleOptionChangeCourseCategory = (e) => {
    setCourseCategoryesSelectedOption(e.target.value);
  };
  console.log(courseCategoryselectedOption);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const handleFileChange = async (event) => {
  //   const selectedImage = event.target.files[0];

  //   // Compress the image using canvas
  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");
  //   const maxSize = 1024; // Maximum width or height
  //   let compressedImage;

  //   const image = new Image();
  //   image.src = URL.createObjectURL(selectedImage);

  //   image.onload = () => {
  //     let width = image.width;
  //     let height = image.height;

  //     if (width > height) {
  //       if (width > maxSize) {
  //         height *= maxSize / width;
  //         width = maxSize;
  //       }
  //     } else {
  //       if (height > maxSize) {
  //         width *= maxSize / height;
  //         height = maxSize;
  //       }
  //     }

  //     canvas.width = width;
  //     canvas.height = height;

  //     ctx.drawImage(image, 0, 0, width, height);

  //     // Convert canvas to Blob
  //     canvas.toBlob((blob) => {
  //       const compressedFile = new File([blob], selectedImage.name, {
  //         type: "image/jpeg", // Adjust image type if needed
  //         lastModified: Date.now(),
  //       });

  //       // Proceed with the compressed file upload
  //       uploadCompressedFile(compressedFile);
  //     }, "image/jpeg"); // Adjust image type if needed
  //   };
  // };

  // const uploadCompressedFile = async (compressedFile) => {
  //   // Upload the compressed file to the server
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", compressedFile);

  //     const response = await fetch("http://localhost:8080/post/uploadimage", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         // Add other necessary headers
  //       },
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setFile(data.imageUrl);
  //       console.log("Image uploaded successfully:", data.imageUrl);
  //     } else {
  //       console.error("Error uploading image:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading image:", error.message);
  //   }
  // };
  const handleFileChange = async (event) => {
    setLoading(true);
    const selectedFile = event.target.files[0];
    console.log(selectedFile)

    try {
      if (selectedFile.type.startsWith("image")) {
        await handleUpload(selectedFile, "image");
      } else if (selectedFile.type.startsWith("application/pdf")) {
        await handleUpload(selectedFile, "pdf");
      } else if (selectedFile.type === "application/zip" || "application/x-zip-compressed") {
        await handleUpload(selectedFile, "zip");
      } else {
        console.error("Unsupported file type",selectedFile);
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  const handleUpload = async (file, fileType) => {
    console.log("file checking",file)
    const formData = new FormData();
    formData.append("file", file);
    console.log("formdata",formData)
    const response = await fetch(
      "http://localhost:8080/studymaterial/uploadstudymaterialfile",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // Add other necessary headers
        },
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      handleUploadSuccess(data.fileUrl, fileType);
    } else {
      console.error("Error uploading file:", response.statusText);
      throw new Error("Upload failed");
    }
  };

  const handleUploadSuccess = (fileUrl, fileType) => {
    console.log(fileUrl, fileType);

    if (fileType === "image") {
      setImage(fileUrl);
      setLoading(false);
    } else if (fileType === "pdf") {
      setPDFUrl(fileUrl);
      setLoading(false);
    } else if (fileType === "zip") {
      setZipUrl(fileUrl);
      setLoading(false);
    } else {
      console.error("Unsupported file type");
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const payload = {
      MaterialName: name,
      MaterialDescription: message,
      MaterialCategory: mainCategoryselectedOption,
      MaterialZip: zipURL,
      MaterialImage:imageURL,
      Price: price,
      approve: false,
    };
    fetch("http://localhost:8080/studymaterial/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // Handle form submission logic here
    // console.log('Name:', name);
    // // console.log('Email:', email);
    // console.log('Message:', message);
    // console.log('File:', file);
    fetchStudyMaterialData();
    fetchStudyMaterialData();

    handleClose();
  };

  const showPostForm = (e) => {
    console.log(e);
    setsingelPost(e);
    setEditName(e.MaterialName); // Populate the name field with the selected e's name
    setEditMessage(e.MaterialDescription);
    setEditPrice(e.Price);

    setShowForm(true);
  };

  const handleDeletepost = (e) => {
    const studymaterialID = e._id;
    setstudymaterialidToDelete(studymaterialID);
    setShowConfirmation(true);
    //   fetch(`http://localhost:8080/post/delete/${postID}`, {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,

    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((res) =>{ console.log(res);
    //  fetchStudyMaterialData();

    //   })
    //     .catch((err) => console.log(err));
  };

  const handleConfirmDelete = () => {
    if (studymaterialidToDelete) {
      fetch(
        `http://localhost:8080/studymaterial/delete/${studymaterialidToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          fetchStudyMaterialData();
        })
        .catch((err) => console.log(err));
    }
    // Close the confirmation popup
    setShowConfirmation(false);
  };

  const handleEditformSubmit = () => {
    // console.log(editName,editMessage,showform);
    setShowForm(false);

    const payload = {
      MaterialName: editName,
      MaterialDescription: editMessage,
      MaterialZip: zipURL,
      MaterialCategory: mainCategoryselectedOption,
      Price: editPrice,
    };
    const studymaterialID = singlepost._id;
    fetch(`http://localhost:8080/studymaterial/update/${studymaterialID}`, {
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

        fetchStudyMaterialData();
      })
      .catch((err) => console.log(err));
  };

  console.log(mainCategory, subCategory, courseCategory);
  useEffect(() => {
    fetchStudyMaterialData();
    getMainCategory();
    // getSubCategory();
    // getCourseCategory();
  }, [socket]);

  //   console.log(tags);
  //   const handletagDelete = (i) => {
  //     setTags(tags.filter((tag, index) => index !== i));
  //   };

  //   const handletagAddition = (tag) => {
  //     setTags([...tags, tag]);
  //   };

  //   const handletagDrag = (tag, currPos, newPos) => {
  //     const newTags = tags.slice();

  //     newTags.splice(currPos, 1);
  //     newTags.splice(newPos, 0, tag);

  //     // re-render
  //     setTags(newTags);
  //   };

  //   const handleTagClick = (index) => {
  //     console.log("The tag at index " + index + " was clicked");
  //   };
  //   const handleEdittagDelete = (i) => {
  //     setEditTags(editTags.filter((tag, index) => index !== i));
  //   };

  //   const handleEdittagAddition = (tag) => {
  //     setEditTags([...editTags, tag]);
  //   };

  //   const handleEdittagDrag = (tag, currPos, newPos) => {
  //     const newTags = editTags.slice();

  //     newTags.splice(currPos, 1);
  //     newTags.splice(newPos, 0, tag);

  //     // re-render
  //     setTags(newTags);
  //   };

  return (
    <div className="Table">
      <div className ="recent-history" >
        <h3 className="recent-history-heading">Recent StudyMaterial</h3>

        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            <UilFilePlus /> Add
          </Button>
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
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Submit Your Information</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill out the form below:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/* <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
              <TextField
                margin="dense"
                id="message"
                label="Description"
                type="text"
                fullWidth
                multiline
                projects={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {/* <TextField
                margin="dense"
                id="message"
                label="Abstract200Words"
                type="text"
                fullWidth
                multiline
                projects={4}
                value={abstractword}
                onChange={(e) => setAbstractword(e.target.value)}
              /> */}
              {/* Tags
              <ReactTags
                tags={tags}
                // suggestions={suggestions}
                delimiters={delimiters}
                handleDelete={handletagDelete}
                handleAddition={handletagAddition}
                handleDrag={handletagDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                autocomplete
                classNames={{
                  tagInputField: "ReactTags__tagInput",
                  tags: "ReactTags__tags",
                  tag: "ReactTags__tag",
                  remove: "ReactTags__remove",
                }}
              /> */}
              {/* upload image
              <TextField
                margin="dense"
                id="image"
                label="Upload Image..."
                type="file"
                fullWidth
                inputProps={{
                  accept: "image/*",
                }}
                onChange={handleFileChange}
              /> */}
              {/* upload video
              <TextField
                margin="dense"
                id="video"
                label="Upload Video..."
                type="file"
                fullWidth
                inputProps={{
                  accept: "video/*",
                }}
                onChange={handleFileChange}
              /> */}
               upload image
              <TextField
                margin="dense"
                id="image"
                label="Upload Image..."
                type="file"
                fullWidth
                inputProps={{
                  accept: "image/*",
                }}
                onChange={handleFileChange}
              />
              upload zip
              <TextField
                margin="dense"
                id="file"
                label="Upload Zip..."
                type="file"
                fullWidth
                inputProps={{
                  accept: ".zip",
                }}
                onChange={handleFileChange}
              />
              {/* upload PDF
              <TextField
                margin="dense"
                id="file"
                label="Upload Pdf..."
                type="file"
                fullWidth
                inputProps={{
                  accept: ".Pdf",
                }}
                onChange={handleFileChange}
              /> */}
              MainCategory
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mainCategoryselectedOption || ""}
                label="Main Category"
                style={{ width: "100%" }}
                onChange={handleOptionChangeMainCategory}
              >
                {mainCategory &&
                  mainCategory.map((el, i) => (
                    <MenuItem key={el._id} value={el.category}>
                      {el.category}
                    </MenuItem>
                  ))}
              </Select>
              {/* SubCategory
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subCategoryselectedOption || ""}
                label="Sub Category"
                style={{ width: "100%" }}
                onChange={handleOptionChangeSubCategory}
              >
                {subCategory &&
                  subCategory.map((el, i) => (
                    <MenuItem key={el._id} value={el.category}>
                      {el.category}
                    </MenuItem>
                  ))}
              </Select> */}
              {/* CourseCategory
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={courseCategoryselectedOption || ""}
                label="Course Category"
                style={{ width: "100%" }}
                onChange={handleOptionChangeCourseCategory}
              >
                {courseCategory &&
                  courseCategory.map((el, i) => (
                    <MenuItem key={el._id} value={el.category}>
                      {el.category}
                    </MenuItem>
                  ))}
              </Select> */}
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Price"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {/* <TextField
  type="file"
  accept="video/*"
  onChange={handleVideoFileChange}
/>

<TextField
  type="file"
  accept=".zip"
  onChange={handleZipFileChange}
/> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {loading ? (
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <TableContainer component={Paper} className="table-container" style={{}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            // style={{ position: "sticky", top: "1%", backgroundColor: "white" }}
            style={{
              position: "sticky",
              top: 0, // Stick the column name row to the top of the table
              zIndex: 1, // Ensure the column name row stays above the scrolling content
              backgroundColor: "white",
            }}
          >
            <TableRow>
              <TableCell>Approval</TableCell>
              <TableCell>Material</TableCell>

              {/* <TableCell align="left">Message</TableCell> */}
              {/* <TableCell align="left">Image</TableCell> */}
              {/* <TableCell align="left">MainCategory</TableCell>
              <TableCell align="left">SubCategory</TableCell>
              <TableCell align="left">CourseCategory</TableCell> */}

              {/* <TableCell align="left">Status</TableCell> */}
              {/* <TableCell align="left">Video</TableCell> */}
              {/* <TableCell align="left">EDIT</TableCell>
              <TableCell align="left">DELETE</TableCell> */}
              {!isSmallDevice && <TableCell align="left">EDIT</TableCell>}
              {!isSmallDevice && <TableCell align="left">DELETE</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody className="tbody" style={{ color: "white" }}>
            {StudyMaterial !== null &&
              StudyMaterial.length > 0 &&
              StudyMaterial.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <div className="large-devices">
                  <TableCell component={"th"} scope="row">
                    {row.approve ? (
                      <Button variant="contained" color="success">
                        APPROVED
                      </Button>
                    ) : (
                      <Button variant="contained" color="error">
                        NOT APPROVED
                      </Button>
                    )}
                  </TableCell>
                  </div>
                  <div className="small-devices">
                  <TableCell component={"th"} scope="row">
                    {row.approve ? (
                      <Button variant="contained" color="success">
                        <UilCheckCircle/>
                      </Button>
                    ) : (
                      <Button variant="contained" color="error">
                        <UilTimesCircle/>
                      </Button>
                    )}
                  </TableCell>
                  </div>
                  <TableCell component="th" scope="row">
                    <Link to={`/studymaterial/${row._id}`}>
                      {row.MaterialName}
                    </Link>
                  </TableCell>
                  {/* <TableCell align="left">{row.postMessage}</TableCell> */}
                  {/* <TableCell align="left">{row.userID}</TableCell> */}
                  {/* <TableCell align="left">
                    <Link to={`/post/${row._id}`}>

                    <img
                      style={{ height: "100px",width:"100px" }}
                      src={row.imageUrl}
                      alt={row.postName}
                    />{" "}
                    </Link>

                  </TableCell> */}
                  {/* <TableCell align="left">{row.mainCategory}</TableCell>
                  <TableCell align="left">{row.subCategory}</TableCell>
                  <TableCell align="left">{row.courseCategory}</TableCell> */}
                  {/* <TableCell align="left">
                    <video controls width="300" height="100" autoPlay>
                      <source src={row.videoUrl} type="video/mp4" />
                     
                      Your bprojectser does not support the video tag.
                    </video>
                  </TableCell> */}
                  {/*ajay commented this two edit and delete cells for responsiveness*/}
                  {/* <TableCell align="left">
                    <Button
                      variant="outlined"
                      onClick={() => showPostForm(row)}
                      disabled={row.approve}
                    >
                      <UilEditAlt /> Edit
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeletepost(row)}
                      disabled={row.approve}
                    >
                      <UilTrashAlt /> Delete
                    </Button>
                  </TableCell> */}
                  {!isSmallDevice && (
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        onClick={() => showPostForm(row)}
                        disabled={row.approve}
                      >
                        <UilEditAlt /> Edit
                      </Button>
                    </TableCell>
                  )}
                    {!isSmallDevice && (
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeletepost(row)}
                          disabled={row.approve}
                        >
                          <UilTrashAlt /> Delete
                        </Button>
                      </TableCell>
                    )}
                  {/* <TableCell align="left">
                  <span className="status" style={makeStyle(row.status)}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell align="left" className="Details">
                  Details
                </TableCell> */}
                </TableRow>
              ))}
            {/* Conditional rendering of the confirmation popup */}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={showform} onClose={() => setShowForm(false)}>
        <DialogTitle>Edit Element</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the selected element:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="editName"
            label="Title"
            type="text"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)} // Update editName state
          />
          <TextField
            margin="dense"
            id="editMessage"
            label="Description"
            type="text"
            fullWidth
            multiline
            projects={4}
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)} // Update editMessage state
          />
          {/* <TextField
            margin="dense"
            id="editAbstract200Words"
            label="Abstract200Words"
            type="text"
            fullWidth
            multiline
            projects={4}
            value={editabstractword}
            onChange={(e) => setEditAbstractWord(e.target.value)} // Update editMessage state
          /> */}
          {/* Tags
          <ReactTags
            tags={editTags}
            // suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleEdittagDelete}
            handleAddition={handleEdittagAddition}
            handleDrag={handleEdittagDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
            classNames={{
              tagInputField: "ReactTags__tagInput",
              tags: "ReactTags__tags",
              tag: "ReactTags__tag",
              remove: "ReactTags__remove",
            }}
          /> */}
          {/* upload image
          <TextField
            margin="dense"
            id="image"
            label="Upload Image..."
            type="file"
            fullWidth
            inputProps={{
              accept: "image/*",
            }}
            onChange={handleFileChange}
          /> */}
          {/* upload video
          <TextField
            margin="dense"
            id="video"
            label="Upload Video..."
            type="file"
            fullWidth
            inputProps={{
              accept: "video/*",
            }}
            onChange={handleFileChange}
          /> */}
          upload zip
          <TextField
            margin="dense"
            id="file"
            label="Upload Zip..."
            type="file"
            fullWidth
            inputProps={{
              accept: ".zip",
            }}
            onChange={handleFileChange}
          />
          {/* upload PDF
          <TextField
            margin="dense"
            id="file"
            label="Upload Pdf..."
            type="file"
            fullWidth
            inputProps={{
              accept: ".pdf",
            }}
            onChange={handleFileChange}
          /> */}
          MainCategory
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mainCategoryselectedOption || ""}
            label="Main Category"
            style={{ width: "100%" }}
            onChange={handleOptionChangeMainCategory}
          >
            {mainCategory &&
              mainCategory.map((el, i) => (
                <MenuItem key={el._id} value={el.category}>
                  {el.category}
                </MenuItem>
              ))}
          </Select>
          {/* SubCategory
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={subCategoryselectedOption || ""}
            label="Sub Category"
            style={{ width: "100%" }}
            onChange={handleOptionChangeSubCategory}
          >
            {subCategory &&
              subCategory.map((el, i) => (
                <MenuItem key={el._id} value={el.category}>
                  {el.category}
                </MenuItem>
              ))}
          </Select>
          CourseCategory
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={courseCategoryselectedOption || ""}
            label="Course Category"
            style={{ width: "100%" }}
            onChange={handleOptionChangeCourseCategory}
          >
            {courseCategory &&
              courseCategory.map((el, i) => (
                <MenuItem key={el._id} value={el.category}>
                  {el.category}
                </MenuItem>
              ))}
          </Select> */}
          <TextField
            autoFocus
            margin="dense"
            id="editName"
            label="Price"
            type="number"
            fullWidth
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)} // Update editName state
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowForm(false)}>Cancel</Button>
          {loading ? (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            <Button onClick={handleEditformSubmit}>Submit</Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      >
        <DialogTitle>Are you sure you want to delete this post ?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default StudyMaterilaTable;
