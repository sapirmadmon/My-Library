import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const email = useRef();
  const username = useRef();
  const city = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("passwords don't match!");
    } else {
      const user = {
        userName: username.current.value,
        email: email.current.value,
        password: password.current.value,
        city: city.current.value,
      };
      try {
        await axios.post("/api/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">My Library</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on MyLibrary
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              type="text"
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="City"
              type="text"
              ref={city}
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              type="email"
              ref={email}
              className="registerInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              ref={password}
              minLength="6"
              maxLength="20"
              className="registerInput"
            />
            <input
              placeholder="Confirm Password"
              type="password"
              required
              ref={passwordAgain}
              minLength="6"
              maxLength="20"
              className="registerInput"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <Link to="/login" className="btn btn-success toLoginButton">
              Log into Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
