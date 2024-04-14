import { createContext, useContext, useEffect, useState } from "react";
const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
  //   const history = useNavigate();
  const token = localStorage.getItem("token");
  const [socket, updateSocket] = useState("");

  // console.log(token);
  const [user, setUser] = useState("");
  const [ws, setWs] = useState(null);
  const [rows, setRows] = useState(null);
  const [projects,setProjectdata]=useState(null);
  const [StudyMaterial,setStudyMaterial] = useState(null);
  const [courseCategory, setCourseCategoryes] = useState(null);
  const [subCategory, setSubCategoryes] = useState(null);
  const [mainCategory, setMainCategoryes] = useState(null);

  useEffect(() => {
  
  }, []);
  const getUserData = () => {
    fetch("http://localhost:8080/subadmin/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setUser(res);
      })
      .catch((err) => console.log(err));
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/post/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        // console.log(jsonData);

        setRows(jsonData);
      } else {
        console.error("Error fetching data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getMainCategory = () => {
    fetch("http://localhost:8080/category/main", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMainCategoryes(res);
      })
      .catch((err) => console.log(err));
  };
  const getSubCategory = () => {
    fetch("http://localhost:8080/category/sub", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setSubCategoryes(res);
      })
      .catch((err) => console.log(err));
  };
  const getCourseCategory = () => {
    fetch("http://localhost:8080/category/course", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCourseCategoryes(res);
      })
      .catch((err) => console.log(err));
  };

  const fetchProjectData = async () => {
    try {
      const response = await fetch("http://localhost:8080/project/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        // console.log(jsonData);

        setProjectdata(jsonData);
      } else {
        console.error("Error fetching data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchStudyMaterialData = async () => {
    try {
      const response = await fetch("http://localhost:8080/studymaterial/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        // console.log(jsonData);

        setStudyMaterial(jsonData);
      } else {
        console.error("Error fetching data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (token) {
      getUserData();
      fetchData();
      getMainCategory();
      getSubCategory();
      getCourseCategory();
      fetchProjectData();
      fetchStudyMaterialData();
     // Define the timeout duration (24 hours in milliseconds)
    const timeoutDuration = 86400000 ; // 24 hours

    // Set a timeout to remove the item after 24 hours
    const timeoutId = setTimeout(() => {
      // Remove item from local storage
      localStorage.removeItem('token');
    }, timeoutDuration);

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);

    }
  }, [token,socket]);
  return (
    <userAuthContext.Provider
      value={{
        user,
        setUser,
        getUserData,
        token,
        rows,
        setRows,
        fetchData,
        getMainCategory,
        getCourseCategory,
        getSubCategory,
        courseCategory,
        subCategory,
        mainCategory,
        projects,
        setProjectdata,
        fetchProjectData,
        StudyMaterial,
        setStudyMaterial,
        fetchStudyMaterialData,
        socket,
        updateSocket
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
