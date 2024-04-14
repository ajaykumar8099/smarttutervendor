import React, { useState } from 'react'

const PasswordReset = () => {
  const [email,setEmail]=useState("");

  const setVal=(e)=>{
    setEmail(e.target.value)

  }
  console.log(email);
  const sendLink=async()=>{
    // e.preventDefault();
    const res=await fetch("http://localhost:8080/subadmin/sendpasswordlink",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({email})
    });

    const data=await res.json();
    if(data.status===201){
      setEmail("");
      alert("Email sent successfully")
    }else{
      alert("Email sent Error")
    }


  }
  return (
    <div className="main_login">
        <div className='login-container'>
        <h1>Password Reset</h1>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={setVal}
          />
        </div>
        <button onClick={sendLink}>Send</button>
        </div>
      {/* <form onSubmit={sendLink}>

      <input type="email" placeholder='Enter Your mail'value={email} onChange={setVal} />
      <button type="submit">Send</button>
      </form> */}
   
    </div>
  )
}

export default PasswordReset