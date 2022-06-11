import React from "react";

const About = () => {
  const checkLogin = async (e) => {
    const token = await localStorage.getItem("userLogin");
  };

  React.useEffect(() => {
    checkLogin();
  });

  return (
    <div>
      <h1>This is about page.</h1>
    </div>
  );
};

export default About;
