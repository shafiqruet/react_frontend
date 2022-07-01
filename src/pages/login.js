import React from "react";
import AuthService from "../api/api";
const Login = () => {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const [message, setMessage, errormessage, setErrorMessage] = React.useState("");

  const success = async (text) => {
    //console.log(text);
    await localStorage.setItem("userLogin", 1);
    await localStorage.setItem("userId", text.id);
    window.location = "/profile";
  };

  const userLogin = async (e) => {
    e.preventDefault();
    await AuthService.login(state, success, failed, (text) => {
      setMessage(text);
    });
  };

  const failed = async (text) => {
    setErrorMessage(text);
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  return (

    <div style={{ width: "1000px", margin: "auto", marginTop: "50px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em" }}>
      <div style={{ margin: "1em", color: "green" }}>{message}</div>
      <div style={{ margin: "1em", color: "red" }}>{errormessage}</div>
      <div style={{ width: "500px", margin: "auto", marginTop: "30px", marginBottom: "30px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em" }}>
        <form>
          <div className="mb-3">
            <label>
              Email
              <input type="text" name="email" className="form-control" value={state.email} onChange={handleChange} />
            </label>
          </div>
          <div className="mb-3">
            <label>
              Password
              <input type="password" name="password" className="form-control" value={state.password} onChange={handleChange} />
            </label>
          </div>

          <button type="submit" className="btn btn-primary" onClick={userLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
