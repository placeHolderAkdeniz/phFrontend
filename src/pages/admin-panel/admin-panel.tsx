import Sidebar from "../../components/admin-components/sidebar/sidebar";
import Navbar from "../../components/admin-components/navbar/navbar";
import "./admin-panel.scss";
import Widget from "../../components/admin-components/widget/widget";
import Featured from "../../components/admin-components/featured/featured";
import Chart from "../../components/admin-components/chart/chart";
import Table from "../../components/admin-components/table/table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="active customer" />
          <Widget type="reserv" />
          <Widget type="earning" />
          <Widget type="average star" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Comment)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Comments</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
