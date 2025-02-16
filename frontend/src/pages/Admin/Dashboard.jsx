import { useEffect, useState } from "react";
import fetchWithAuth from "../../helpers/fetchHelper";


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    artworks: 0,
    totalSales: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await fetchWithAuth("/api/users/count");
        const orders = await fetchWithAuth("/api/orders/count");
        const artworks = await fetchWithAuth("/api/artworks/count");
        const totalSales = await fetchWithAuth("/api/orders/total-sales");

        setStats({
          users: users.count,
          orders: orders.count,
          artworks: artworks.count,
          totalSales: totalSales.total,
        });
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Dashboard - Bienvenido al Panel de Administración</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Usuarios Registrados</h3>
          <p>{stats.users}</p>
        </div>
        <div className="stat-card">
          <h3>Órdenes Realizadas</h3>
          <p>{stats.orders}</p>
        </div>
        <div className="stat-card">
          <h3>Obras en Venta</h3>
          <p>{stats.artworks}</p>
        </div>
        <div className="stat-card">
          <h3>Ventas Totales</h3>
          <p>${stats.totalSales}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
