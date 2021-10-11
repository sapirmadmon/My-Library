import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
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
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              maxLength="20"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit">
              {isFetching ? (
                <CircularProgress color="white" size="25px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>

            <Link to="/register" className="btn btn-success toRegisterButton">
              Create a New Account
            </Link>

            {/*<button className="loginRegisterButton">
              Create a New Account
            </button>*/}
          </form>
        </div>
      </div>
    </div>
  );
}
