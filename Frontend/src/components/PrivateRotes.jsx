import React from 'react'
import { useUserAuth } from '../Context/UseAuthContext'
import { Navigate } from 'react-router-dom';

const PrivateRotes = ({children}) => {
    const {user,token}=useUserAuth();
 if(!token){
    return<Navigate to={"/login"} />;
 }else if(user.isVerified===false){
   alert("You are no verifying")
   return<Navigate to={"/login"}/>;
 }
 return children;
}

export default PrivateRotes;