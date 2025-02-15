import React from "react";
import Sidebar from "../../components/Admin/TempSidebar";

const OrdenesAdmin = () => {
  return (
    <div className="admin-page">
      <Sidebar />
      <main className="content">
        <h1>Gestión de Órdenes de Compra</h1>
      </main>
    </div>
  );
};

export default OrdenesAdmin;
