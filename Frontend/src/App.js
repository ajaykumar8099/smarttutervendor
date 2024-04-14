// import { useEffect } from "react";
// import "./App.css";
// import { AllRoutes } from "./components/AllRoutes";
// import MainDash from "./components/MainDash/MainDash";
// import RightSide from "./components/RigtSide/RightSide";
// import Sidebar from "./components/Sidebar/Sidebar";
// import socketIOClient from 'socket.io-client';
// import { useUserAuth } from "./Context/UseAuthContext";
// const ENDPOINT="http://localhost:8080";

// function App() {
//   const {updateSocket}=useUserAuth();

//   useEffect(() => {
//     const socket=socketIOClient(ENDPOINT);

//     socket.on("dataChange",change=>{
//       console.log('Data change received',change);
//       updateSocket(change)
//     });
//     return ()=>socket.disconnect();
//   }, []);
//   return (
//     <div className="App">
//       <div className="AppGlass">
//         <Sidebar />
//         <MainDash />
//         {/* <RightSide /> */}
//         {/* <AllRoutes/> */}
//       </div>
//     </div>
//   );
// }

// export default App;

import { useEffect } from "react";
import "./App.css";
import { AllRoutes } from "./components/AllRoutes";
import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RigtSide/RightSide";
import Sidebar from "./components/Sidebar/Sidebar";
import socketIOClient from 'socket.io-client';
import { useUserAuth } from "./Context/UseAuthContext";
const ENDPOINT="http://localhost:8080";

function App() {
  const { updateSocket } = useUserAuth();

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("dataChange", change => {
      console.log('Data change received', change);
      updateSocket(change);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDash />
        {/* <RightSide /> */}
        {/* <AllRoutes/> */}
      </div>
    </div>
  );
}

export default App;


