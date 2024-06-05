import * as React from "react";
import styles from "./s-top-bar.module.scss";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccountMenu from "../menu/account-menu";

interface iRoute {
  label: string;
  path: string;
}

const logo = "src/assets/images/phlogo.png";

export function STopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState<string>(
    location.pathname.split("/").pop() || ""
  );

  const handleLogoClick = () => {
    setActiveRoute("signedLand");
    navigate("/signedLand");
  };

  const handlePlaceholderClick = () => {
    navigate("/signedLand");
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img
          src={logo}
          alt="Logo"
          className={styles.logo}
          onClick={handleLogoClick}
        />
      </div>
      <div className={styles.center}>
        <a href="#" onClick={handlePlaceholderClick}>placeHolder</a>
      </div>
      <div className={styles.right}>
        <AccountMenu />
      </div>
    </div>
  );
}

export default STopBar;
