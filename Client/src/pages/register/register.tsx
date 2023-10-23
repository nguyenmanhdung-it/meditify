import "./register.scss";
import axios from "axios";
import { useState, ChangeEvent } from "react";

export default function register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-header">
          <h2>Register</h2>
          <p>Enter email and password to register</p>
        </div>
        <div className="form">
          <div className="input-field">
            <label htmlFor="UserName">User Name</label>
            <input className="registerInput" 
            type="UserName" 
            onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email Address</label>
            <input className="registerInput" 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Password</label>
            <input className="registerInput" 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input">
            <input type="checkbox" name="" id="remember" />
            <label htmlFor="remember">Remember Password</label>
          </div>
          <button className="button p-btn registerButton" type="submit">register</button>
          {error && <span style={{ color: "red", marginTop: "10px" }}>Tên tài khoản hoặc email phải là duy nhất 🥺</span>}
          
          <div className="form-action">
            <span>Or Sign Up with</span>
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
                Have a account?{" "}
                <a href="../../login" className="registerRegisterButton">
                  Login Now
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}