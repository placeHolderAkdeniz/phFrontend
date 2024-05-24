import * as React from "react";
import styles from "./footer.module.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";

interface iRoute {
  label: string;
  path: string;
}
const navItems = ['About', 'Privacy Policy', 'Licensing' ,'Contact'];

const logo =
  "src/assets/images/phlogo.png";

export function Footer() {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState<string>(
    location.pathname.split("/").pop() || ""
  );
 
  return (
    <div className={styles.container}>
        <div className={styles.content}>
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
            <a>placeHolder</a>
            </div>
            
            <div className={styles.right}>
                    {navItems.map((item) => (
                    <button key={item}>
                    {item}
                    </button>
                ))}
                
            </div>

        </div>
        <div className={styles.bottom}>
        <Divider />
        <h6>© 2024 placeHolder</h6></div>
        
    </div>
  );
}




  