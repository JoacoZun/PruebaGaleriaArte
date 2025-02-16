import { useEffect, useState } from "react";
import fetchWithAuth from "../../helpers/fetchHelper";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchWithAuth("/api/orders");
        setOrders(data);
      } catch (error) {
        console.error("Error al cargar órdenes:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await fetchWithAuth(`/api/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error al actualizar orden:", error);
    }
  };

  return (
    <div className="orders-management">
      <h1>Gestión de Órdenes de Compra</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userEmail}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => updateOrderStatus(order.id, "Enviado")}>
                  Marcar Enviado
                </button>
                <button onClick={() => updateOrderStatus(order.id, "Entregado")}>
                  Marcar Entregado
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersManagement;
