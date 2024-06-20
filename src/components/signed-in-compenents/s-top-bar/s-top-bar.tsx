import * as React from "react";
import styles from "./s-top-bar.module.scss";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import AccountMenu from "../menu/account-menu";

const logo = "src/assets/images/phlogo.png";

export function STopBar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
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
        <a onClick={handleLogoClick}>placeHolder</a>
      </div>
      <div className={styles.right}>
        <AccountMenu />
      </div>
    </div>
  );
}

export default STopBar;
