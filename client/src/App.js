import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";

import NavBar from "./components/NavBar/navBar";
import MobileNavigationBar from "./components/Shared/MobileNavigationBar/mobileNavigationBar";

import Home from "./pages/Home/home";
import Auth from "./pages/Auth/auth";
import PostDetailsWithProfile from "./pages/PostDetailsWithProfile/postDetailsWithProfile";
import ProfilePage from "./pages/ProfilePage/profilePage";
import Settings from "./pages/Settings/settings";
import Notification from "./pages/Notification/notification";
import Search from "./pages/Search/search";
import Messages from "./pages/Messages/messages";
import ProfileEdit from "./pages/ProfilePage/ProfileEdit/profileEdit";
import UserFollowerFollowing from "./pages/UserFollowerFollowing/userFollowerFollowing";

import { getProfileDetails } from "./actions/profile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("profile"));

  const [isAuth, setIsAuth] = useState("");
  useEffect(() => {
    user && dispatch(getProfileDetails(user?.id, true));
  }, []);
  useEffect(() => {
    window.location.pathname === "/auth" ? setIsAuth(true) : setIsAuth(false);
  }, [window.location.pathname, user]);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/feeds" />} />
          <Route
            path="/auth"
            exact
            component={() =>
              !user ? (
                <Auth isAuth={isAuth} setIsAuth={setIsAuth} />
              ) : (
                <Redirect to="/feeds" />
              )
            }
          />
          <Route path="/feeds" exact component={Home} />
          <Route path="/post/:id" exact component={PostDetailsWithProfile} />
          <Route path="/profile/details" exact component={ProfilePage} />
          <Route path="/profile/edit/:id" exact component={ProfileEdit} />
          <Route
            path="/profile/following-followers/details"
            exact
            component={UserFollowerFollowing}
          />
          <Route path="/profile/settings" exact component={Settings} />
          <Route path="/chats" exact component={Messages} />
          <Route path="/notification" exact component={Notification} />
          <Route path="/search" exact component={Search} />
        </Switch>
        {!isAuth && <MobileNavigationBar />}
      </BrowserRouter>
    </>
  );
};

export default App;
