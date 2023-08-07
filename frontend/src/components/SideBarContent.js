import React from "react";
import store from "../stores/store";

import { Link } from 'react-router-dom';
import { useEffect } from "react";

const SideBarContent = () => {
  const Store = store();

  const navWidth = Store.navWidth;

  useEffect(() => {
    Store.getAccountNum();
  }, []);

  const accNos = Object.keys(Store.data);
  //   console.log(Object.keys(Store.data));

  return (
    <div
      className="bg-light border-right"
      style={{ width: navWidth, height: "100%" }}
    >
      <ul
        style={{
          height: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
          {accNos.length > 0 ?(
            accNos.map((accNo) => {
              return <li key={accNo}><Link to={`/dashboard/${accNo}`}>Account {accNo}</Link></li>;
            })
          ) : (
            <></>
          )}
      </ul>
    </div>
  );
};

export default SideBarContent;
