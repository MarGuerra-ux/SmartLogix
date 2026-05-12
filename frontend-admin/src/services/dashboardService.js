import { supabase } from "../lib/supabase";

export async function getDashboardData() {
  const { data: orders = [] } = await supabase
    .from("orders")
    .select("*");

  const { data: products = [] } = await supabase
    .from("products")
    .select("*");

  const { data: shipments = [] } = await supabase
    .from("shipping_quotes")
    .select("*");

  const today = new Date().toISOString().split("T")[0];

  const ordersToday = orders.filter((order) =>
    order.created_at?.startsWith(today)
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pendiente"
  );

  const completedOrders = orders.filter(
    (order) => order.status === "Aprobado"
  );

  const inTransitShipments = shipments.filter(
    (shipment) => shipment.status === "En tránsito"
  );

  const totalSales = orders.reduce(
    (sum, order) => sum + Number(order.total_amount || 0),
    0
  );

  const dailyCash = ordersToday.reduce(
    (sum, order) => sum + Number(order.total_amount || 0),
    0
  );

  const salesMap = {};

  orders.forEach((order) => {
    const product = products.find(
      (item) => item.id === Number(order.product_id)
    );

    const productName = product?.name || "Producto desconocido";
    const quantity = Number(order.quantity || 1);
    const total = Number(order.total_amount || 0);

    if (!salesMap[productName]) {
      salesMap[productName] = {
        name: productName,
        quantity: 0,
        total: 0,
      };
    }

    salesMap[productName].quantity += quantity;
    salesMap[productName].total += total;
  });

  const topSales = Object.values(salesMap)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return {
    ordersToday: ordersToday.length,
    pendingOrders: pendingOrders.length,
    completedOrders: completedOrders.length,
    totalSales,
    dailyCash,
    inTransitShipments: inTransitShipments.length,
    topSales,
  };
}