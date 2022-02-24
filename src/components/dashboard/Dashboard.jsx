import React from "react";
import NexusNav from "../layout/common/navbar/NexusNav";
import Footer from "../layout/common/footer/Footer";
import User from "./User";
import Card from "./Card";

import { BarChart } from "./BarChart.jsx";

const Styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 50,
    marginLeft: 360,
    width: 1200,
  },
  chartContainer: {
    width: 1200,
    marginTop: 50,
    marginLeft: 360,
  },
};

const Dashboard = () => {
  return (
    <>
      <NexusNav />
      <User />
      <div style={Styles.container}>
        <Card title="Total Posts" subtitle="20" />
        <Card title="Total Reports" subtitle="10" />
        <Card title="Total Requests" subtitle="5" />
        <Card title="Total Records" subtitle="120" />
      </div>
      <div style={Styles.chartContainer}>
        <BarChart />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
