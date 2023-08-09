import React from "react";

import { Navbar, NavItem, Nav } from "reactstrap";
import store from "../stores/store";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NavbarComp = () => {
  const Store = store();

  const navOpen = Store.navOpen;
  const setNavOpen = Store.setNavOpen;

  const navDocked = Store.navDocked;
  const navAnimate = Store.navAnimate;

  const icon = navOpen ? "⬅️" : "➡️";

  return (
    <div>
    <Navbar color="light">
      <Nav>
        <NavItem
          className="mx-1"
          onClick={() => {
            setNavOpen(!navOpen)
            console.log("Clicked")
        }}
          style={{ cursor: "pointer" }}
        >
          {icon}
        </NavItem>
      </Nav>
      <Nav>
        <NavItem
          className="mx-1"
          style={{ cursor: "pointer" }}
        >
          <Link to={"/graph"}>Fund Trail</Link>
        </NavItem>
      </Nav>
      <Nav className="text-muted">
        <NavItem className="mx-1">NavOpen: {JSON.stringify(navOpen)}</NavItem>
        <NavItem className="mx-1">
          NavDocked: {JSON.stringify(navDocked)}
        </NavItem>
        <NavItem className="mx-1">
          NavAnimate: {JSON.stringify(navAnimate)}
        </NavItem>
      </Nav>
    </Navbar>
    </div>
  );
};

export default NavbarComp;
