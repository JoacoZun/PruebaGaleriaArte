import React from "react";
import Sidebar from "../../components/Admin/TempSidebar";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="content">
        <h1>Bienvenido al Panel de Administración</h1>
      </main>
    </div>
  );
};

export default Dashboard;
