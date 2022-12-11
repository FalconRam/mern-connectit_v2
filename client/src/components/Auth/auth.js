import React, { useState } from "react";

import "./auth.css";
import LogIn from "./Login/logIn";
import SignUp from "./SignUp/signUp";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <div className="container auth">
        {/* d-flex align-items-center justify-content-center */}
        <div className="">
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
