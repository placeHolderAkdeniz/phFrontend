import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useAuth } from "@/AuthContext";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    logout();
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin-panel" style={{ textDecoration: "none" }}>
          <span className="logo">Booking Admin Panel</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          
          <p className="title">CREATE</p>
          
          <Link to="/new-hotels" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to="/new-rooms" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Rooms</span>
            </li>
          </Link>
          
          <p className="title">REZERVATIONS</p>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Rezervations</span>
          </li>
          <Link to="/comments" style={{ textDecoration: "none" }}>
            <li>
              <CommentOutlinedIcon className="icon" />
              <span>Comments</span>
            </li>
          </Link>
          
          <p className="title">USER</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Back to Landing Page</span>
            </li>
          </Link>
          <Link to="/account" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          
        </ul>
      </div>
      
      {showConfirmation && (
        <div className="confirmationOverlay">
          <div className="confirmationBox">
            <p>Are you sure you want to log out?</p>
            <div className="confirmationButtons">
              <button onClick={confirmLogout}>Yes</button>
              <button onClick={cancelLogout}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
