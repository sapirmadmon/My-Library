import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Book from "./pages/book/Book";
import Favorites from "./pages/favorites/Favorites";

function App() {
  //return <Home />;
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>

        <Route path="/book/:id">{user ? <Book /> : <Register />}</Route>

        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route exact path="/profile/:userName">
          {user ? <Profile /> : <Redirect to="/register" />}
        </Route>

        <Route exact path="/profile/:userName/favorites">
          {user ? <Favorites /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
