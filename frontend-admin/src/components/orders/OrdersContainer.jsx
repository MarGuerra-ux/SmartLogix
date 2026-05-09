import { useState } from "react";
import OrdersList from "./OrdersList";
import mockData from "../../data/mockData.json";

function OrdersContainer() {
  const [orders, setOrders] = useState(mockData.orders);

  const handleAdd = (newOrder) => {
    const id = `PED-${Date.now()}`;
    setOrders([...orders, { id, ...newOrder }]);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  const handleChangeStatus = (id, newStatus) => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <OrdersList
      orders={orders}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChangeStatus={handleChangeStatus}
    />
  );
}

export default OrdersContainer;