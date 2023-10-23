import "./login.scss";
import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { LoginStart, LoginSuccess } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function Login() {
  const userRef = useRef<any>();
  const passwordRef = useRef<any>();
  const isFetching = useSelector((state: any) => state.isFetching);
  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(LoginStart());
    try {
      const res = await axios.post("api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch(LoginSuccess(res.data))
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <h2>Sign in to account</h2>
          <p>Enter email and password to login</p>
        </div>
        <div className="form">
          <div className="input-field">
            <label htmlFor="text">Username</label>
            <input type="text"
              ref={userRef}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password"
              ref={passwordRef}

            />
          </div>
          <div className="input">
            <input type="checkbox" name="" id="remember" />
            <label htmlFor="remember">Remember Password</label>
          </div>
          <button className="button p-btn loginButton" type="submit"
            disabled={isFetching}
          >Login</button>
          <div className="form-action">
            <span>Or Sign in with</span>
            <div className="option-container">
              <div className="option-box">
                <button>
                  <i className="fab fa-google "></i>
                  Google
                </button>
              </div>
              <div className="option-box">
                <button>
                  <i className="fa fa-facebook-square"></i>
                  Facebook
                </button>
              </div>
            </div>
            <div className="form-text">
              <p>
                Don't have account?{" "}
                <a href="../../register" className="loginRegisterButton">
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
