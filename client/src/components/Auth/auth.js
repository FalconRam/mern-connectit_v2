import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import "./auth.css";
import LogIn from "./Login/logIn";
import SignUp from "./SignUp/signUp";

const Auth = () => {
  const history = useHistory();
  
  const [isLogin, setIsLogin] = useState(true);

  const user = JSON.parse(localStorage.getItem("profile"));

  if (user) {
    history.push("/");
  }

  return (
    <>
      <div className="container auth">
        {/* d-flex align-items-center justify-content-center */}
        <div>
          {isLogin ? (
            <LogIn isLogin={isLogin} setIsLogin={setIsLogin} />
          ) : (
            <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
