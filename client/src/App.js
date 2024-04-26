import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar/navBar";
import MobileNavigationBar from "./components/Shared/MobileNavigationBar/mobileNavigationBar";

import Auth from "./pages/Auth/auth";
import NotFound from "./components/NotFound/notFound";
import LandingPage from "./pages/LandingPage/landingPage";
import ProtectedRoute from "./components/Shared/utils/protectedRoute";

import routesAndComponents from "./utils/routesList";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword/forgotPassword";
import PasswordConfirmation from "./pages/ForgotPassword/passwordConfirmation";
import ReportPasswordRequest from "./pages/ForgotPassword/reportPasswordRequest";

const App = () => {
  let user = JSON.parse(localStorage.getItem("profile"));
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    if (user) setIsAuth(false);
    else setIsAuth(true);
  }, [user]);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route
            path="/auth"
            exact
            component={() => <Auth isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route path="/reset-account" exact component={ForgotPassword} />
          <Route
            path="/reset-password"
            exact
            component={PasswordConfirmation}
          />
          <Route
            path="/report-password"
            exact
            component={ReportPasswordRequest}
          />
          {routesAndComponents.map((rc, index) => (
            <Route
              key={index}
              path={rc.path}
              exact
              component={ProtectedRoute(rc.component)}
            />
          ))}
          <Route path="*" exact component={NotFound} />
        </Switch>
        {!isAuth && <MobileNavigationBar />}
      </BrowserRouter>
    </>
  );
};

export default App;
