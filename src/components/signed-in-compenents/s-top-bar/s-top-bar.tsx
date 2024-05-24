import * as React from "react";
import styles from "./s-top-bar.module.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AccountMenu from "../menu/account-menu";

interface iRoute {
  label: string;
  path: string;
}

const logo = "src/assets/images/phlogo.png";

export function STopBar() {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState<string>(
    location.pathname.split("/").pop() || ""
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img
          src={logo}
          alt="Logo"
          className={styles.logo}
          onClick={() => {
            setActiveRoute("signedLand");
          }}
        />
      </div>
      <div className={styles.center}>
        <a href="">placeHolder</a>
      </div>
      <div className={styles.right}>
        <AccountMenu />
      </div>
    </div>
  );
}

export default STopBar;