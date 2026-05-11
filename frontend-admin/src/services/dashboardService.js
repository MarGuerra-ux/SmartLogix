import { supabase } from "../lib/supabase";

export async function getDashboardData() {
  const { data: orders } = await supabase.from("orders").select("*");
  const { data: shipments } = await supabase.from("shipments").select("*");

  const { data: orderItems } = await supabase
    .from("order_items")
    .select(`
      quantity,
      subtotal,
      products (
        name
      )
    `);

  const today = new Date().toISOString().split("T")[0];

  const ordersToday = orders?.filter((order) =>
    order.order_date?.startsWith(today)
  ) || [];

  const pendingOrders = orders?.filter(
    (order) => order.status === "Pendiente"
  ) || [];

  const completedOrders = orders?.filter(
    (order) => order.status === "Completado"
  ) || [];

  const totalSales =
    orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

  const dailyCash =
    ordersToday.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

  const inTransitShipments = shipments?.filter(
    (shipment) => shipment.status === "En Tránsito"
  ) || [];

  const salesMap = {};

  orderItems?.forEach((item) => {
    const productName = item.products?.name || "Producto desconocido";

    if (!salesMap[productName]) {
      salesMap[productName] = {
        name: productName,
        quantity: 0,
        total: 0,
      };
    }

    salesMap[productName].quantity += Number(item.quantity);
    salesMap[productName].total += Number(item.subtotal);
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