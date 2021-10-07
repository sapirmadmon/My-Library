import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";

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
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">My Library</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on MyLibrary
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              type="text"
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="City"
              type="text"
              ref={city}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              type="email"
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              ref={password}
              minLength="6"
              maxLength="20"
              className="loginInput"
            />
            <input
              placeholder="Confirm Password"
              type="password"
              required
              ref={passwordAgain}
              minLength="6"
              maxLength="20"
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
