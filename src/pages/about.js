import React from "react";

const About = () => {
  const checkLogin = async (e) => {
    const token = await localStorage.getItem("userLogin");
  };

  React.useEffect(() => {
    checkLogin();
  });

  return (
    <div style={{ width: "1000px", margin: "auto", marginTop: "10px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em" }}>
      <h1>This is about page.</h1>
    </div>
  );
};

export default About;
