import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import NavBar from "./components/NavBar/navBar";
import Auth from "./components/Auth/auth";
import Home from "./components/Home/home";

const App = () => {
  let user = false;
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/feeds" />} />
        <Route
          path="/auth"
          exact
          component={() => (!user ? <Auth /> : <Redirect to="/feeds" />)}
        />
        <Route path="/feeds" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
