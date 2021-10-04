import "./register.css";

export default function Register() {
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
          <div className="loginBox">
            <input placeholder="Username" type="text" className="loginInput" />
            <input placeholder="City" type="text" className="loginInput" />
            <input placeholder="Email" type="text" className="loginInput" />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
            />
            <input
              placeholder="Confirm Password"
              type="password"
              className="loginInput"
            />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">Log into Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
