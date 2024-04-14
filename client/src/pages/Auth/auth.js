import React, { useEffect, useState } from "react";

import { useHistory, useLocation } from "react-router-dom";

import "../../components/Auth/auth.css";
import LogIn from "../../components/Auth/Login/login";
import SignUp from "../../components/Auth/SignUp/signUp";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Auth = ({ isAuth, setIsAuth }) => {
  const query = useQuery();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));

  if (user) {
    history.push("/");
  }
  useEffect(() => {
    if (query.get("new") === "true") setIsLogin(false);
    else setIsLogin(true);
  }, [history]);

  return (
    <>
      <div className="container auth">
        {/* d-flex align-items-center justify-content-center */}
        <div>
          {isLogin ? (
            <LogIn
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              isLoginLoading={isLoginLoading}
              setIsLoginLoading={setIsLoginLoading}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
          ) : (
            <SignUp
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              isLoginLoading={isLoginLoading}
              setIsLoginLoading={setIsLoginLoading}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
