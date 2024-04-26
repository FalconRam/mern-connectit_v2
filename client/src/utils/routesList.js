import Home from "../pages/Home/home";
import Messages from "../pages/Messages/messages";
import Notification from "../pages/Notification/notification";
import PostDetailsWithProfile from "../pages/PostDetailsWithProfile/postDetailsWithProfile";
import ProfileEdit from "../pages/ProfilePage/ProfileEdit/profileEdit";
import ProfilePage from "../pages/ProfilePage/profilePage";
import Search from "../pages/Search/search";
import Settings from "../pages/Settings/settings";
import UserFollowerFollowing from "../pages/UserFollowerFollowing/userFollowerFollowing";

const routesAndComponents = [
  {
    path: "/feeds",
    component: Home,
  },
  {
    path: "/post",
    component: PostDetailsWithProfile,
  },
  {
    path: "/profile/details",
    component: ProfilePage,
  },
  {
    path: "/profile/edit",
    component: ProfileEdit,
  },
  {
    path: "/profile/following-followers/details",
    component: UserFollowerFollowing,
  },
  {
    path: "/profile/settings",
    component: Settings,
  },
  {
    path: "/chats",
    component: Messages,
  },
  {
    path: "/notification",
    component: Notification,
  },
  {
    path: "/search",
    component: Search,
  },
];

export default routesAndComponents;
