import React, { useState } from "react";

import "./auth.css";
import Login from "./Login/login";
import Signin from "./Signin/signin";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <div className="container vh-100">
        <div className="h-50 d-flex align-items-center justify-content-center">
          Auth
          {isLogin ? <Login /> : <Signin />}
        </div>
      </div>
    </>
  );
};

export default Auth;
