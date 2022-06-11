import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";

const Navbar = () => {
  const [userToken, usetUserToken] = React.useState("");

  const checkLogin = async (e) => {
    const token = await localStorage.getItem("userLogin");
    usetUserToken(token);
  };

  React.useEffect(() => {
    checkLogin();
  });

  const logout = async (e) => {
    await localStorage.setItem("userLogin", 0);
    window.location = "/";
  };

  return (
    <>
      <Nav>
        <Bars />
        {userToken == 1 ? (
          <NavMenu>
            <NavLink to="/" activestyle="true">
              Home
            </NavLink>
            <NavLink to="/profile" activestyle="true">
              Profile
            </NavLink>
            <NavLink to="/product" activestyle="true">
              Add product
            </NavLink>
            <NavLink to="/product_list" activestyle="true">
              Product List
            </NavLink>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </NavMenu>
        ) : (
          <NavMenu>
            <NavLink to="/" activestyle="true">
              Home
            </NavLink>
            <NavLink to="/about" activestyle="true">
              About
            </NavLink>
            <NavLink to="/events" activestyle="true">
              Events
            </NavLink>
            <NavLink to="/annual" activestyle="true">
              Annual Report
            </NavLink>
            <NavLink to="/team" activestyle="true">
              Teams
            </NavLink>
            <NavLink to="/login" activestyle="true">
              Login
            </NavLink>
            <NavLink to="/sign-up" activestyle="true">
              Sign Up
            </NavLink>
          </NavMenu>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
