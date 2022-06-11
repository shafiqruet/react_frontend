import React from "react";
import AuthService from "../api/api";

const Profile = () => {
  const [message, setMessage, errormessage, setErrorMessage] = React.useState("");
  const checkLogin = async (e) => {
    const token = await localStorage.getItem("userLogin");
  };

  const fetchUserData = async (e) => {
    const userId = await localStorage.getItem("userId");
    await AuthService.userInfo(userId, success, failed, (text) => {
      setMessage(text);
    });
  };

  const failed = async (text) => {
    setErrorMessage(text);
  };

  const success = async (text) => {
    setMessage(text);
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  React.useEffect(() => {
    checkLogin();
  });

  return (
    <div>
      <div style={{ width: "1000px", margin: "auto", marginTop: "10px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em" }}>
        <span className="user-info">User Information</span> <br /> <br />
        <div className="content-area">
          <span className="label-area">
            Name: {message.first_name} {message.last_name}
          </span>{" "}
          <br />
          <span className="label-area">Email: {message.email}</span>
          <br />
          <span className="label-area">Phone: {message.phone}</span>
          <br />
          <span className="label-area">Address: {message.address}</span>
          <br />
          <span className="label-area">City: {message.city}</span>
          <br />
          <span className="label-area">Country: {message.country}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
