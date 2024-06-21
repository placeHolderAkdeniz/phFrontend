import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
interface WidgetProps {
  type: "active customer" | "reserv" | "earning" | "average star";
}

const Widget: React.FC<WidgetProps> = ({ type }) => {
  let data;

  // temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "active customer":
      data = {
        title: "Active Customer",
        isMoney: false,
        link: "See all Customer",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "reserv":
      data = {
        title: "Rezervations",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2)",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Earnings",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "average star":
      data = {
        title: "Average Star",
        isMoney: false,
        link: "See details",
        icon: (
          <StarOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218, 165, 32, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">
          {data?.isMoney && "$"} {amount}
        </span>
        <span className="link">{data?.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data?.icon}
      </div>
    </div>
  );
};

export default Widget;
