import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";

function App() {
  //return <Home />;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>

        <Route path="/login">
          <Login></Login>
        </Route>

        <Route path="/register">
          <Register></Register>
        </Route>

        <Route path="/profile/:username">
          <Profile></Profile>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
