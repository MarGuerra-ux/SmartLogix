import { useState } from "react";
import ShippingList from "./ShippingList";
import mockData from "../../data/mockData.json";

function ShippingContainer() {
  const [shipments, setShipments] = useState(mockData.shipping);

  const handleAdd = (newShipment) => {
    setShipments([...shipments, { id: `ENV-${Date.now()}`, ...newShipment }]);
  };

  const handleDelete = (id) => {
    setShipments(shipments.filter((s) => s.id !== id));
  };

  const handleChangeStatus = (id, newStatus) => {
    setShipments(
      shipments.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  const handleUpdateTracking = (id, newTracking) => {
    setShipments(
      shipments.map((s) => (s.id === id ? { ...s, tracking: newTracking } : s))
    );
  };

  return (
    <ShippingList
      shipments={shipments}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChangeStatus={handleChangeStatus}
      onUpdateTracking={handleUpdateTracking}
    />
  );
}

export default ShippingContainer;