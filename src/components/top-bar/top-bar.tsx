import * as React from "react";
import styles from "./top-bar.module.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {SignInModal} from "../sign-in/sign-in";
import {SignUpModal} from "../sign-up/sign-up";

interface iRoute {
  label: string;
  path: string;
}

const logo =
  "src/assets/images/phlogo.png";

export function TopBar() {
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
            setActiveRoute("");
          }}
        />
      </div>
      <div className={styles.center}>
        <a href="">placeHolder</a>
      </div>
      <div className={styles.right}>
         <SignInModal/>
         <SignUpModal/>
          
      </div>
    </div>
  );
}
