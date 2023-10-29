import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";

import NavBar from "./components/NavBar/navBar";
import Auth from "./components/Auth/auth";
import Home from "./components/Home/home";
import PostDetailsWithProfile from "./components/pages/PostDetailsWithProfile/postDetailsWithProfile";
import ProfilePage from "./components/pages/ProfilePage/profilePage";
import MobileNavigationBar from "./components/Shared/MobileNavigationBar/mobileNavigationBar";
import Settings from "./components/pages/Settings/settings";
import Notification from "./components/pages/Notification/notification";
import Search from "./components/pages/Search/search";
import Messages from "./components/pages/Messages/messages";
import ProfileEdit from "./components/pages/ProfilePage/ProfileEdit/profileEdit";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserFollowerFollowing from "./components/pages/UserFollowerFollowing/userFollowerFollowing";
import { getProfileDetails } from "./actions/profile";

const App = () => {
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("profile"));

  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    user && dispatch(getProfileDetails(user?.id, true));
    window.location.pathname !== "/auth" && setIsAuth(!isAuth);
  }, [window.location]);

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
