import React from "react";

type Props = {};

export default function Login({}: Props) {

  const handleSubmit =(e:any)=>{
    e.preventDefault()
    
  }


  return (
    <div className="login-content ">
      <form className="form-group " onSubmit={handleSubmit}>
        <h3>Sign In to Fiverr</h3>
        <div className="form-input mb-3">
          <p>Email</p>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div className="form-input">
          <p>Password</p>
          <input type="password" name="password" id="password" placeholder="Password"/>
        </div>
        <div className="form-button">
          <button>Register</button>
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
}
