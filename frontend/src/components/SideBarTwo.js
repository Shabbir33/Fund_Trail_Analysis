import React, { useEffect } from "react";

import Sidebar from "react-sidebar";
import store from "../stores/store";
import SidebarContent from "./SideBarContent"

const SideBarTwo = ({ children }) => {
  const Store = store()
  
  
  const navAnimate = Store.navAnimate
  const setNavAnimate = Store.setNavAnimate

  const navOpen = Store.navOpen
  const setNavOpen = Store.setNavOpen

  const navDocked = Store.navDocked


  // Allow the sidebar to render without animated. By defualt, it
  // animates when it initially loads, making the page jump around with
  // every page load. This enables it to appear fully in instantly, but
  // then enables animations for menu interactions after the initial
  // load.
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Sidebar
      sidebar={<SidebarContent />}
      open={navOpen}
      docked={navDocked && navOpen}
      onSetOpen={setNavOpen}
      styles={{ sidebar: { background: "white" } }}
      shadow={false}
      transitions={navAnimate}
    >
      {children}
    </Sidebar>
  );
};

export default SideBarTwo;
