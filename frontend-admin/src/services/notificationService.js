import { supabase } from "../lib/supabase";

/* =========================================
   OBTENER NOTIFICACIONES
========================================= */

export async function getNotifications() {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error obteniendo notificaciones:", error);
    return [];
  }

  return data;
}

/* =========================================
   CREAR NOTIFICACIÓN
========================================= */

export async function createNotification(notification) {
  const { data, error } = await supabase
    .from("notifications")
    .insert([notification])
    .select();

  if (error) {
    console.error("Error creando notificación:", error);

    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
}

/* =========================================
   ACTUALIZAR ESTADO
========================================= */

export async function updateNotificationStatus(id, status) {
  const { data, error } = await supabase
    .from("notifications")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error actualizando notificación:", error);

    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
}

/* =========================================
   HELPERS RÁPIDOS
========================================= */

export async function notifyApprovedOrder(order) {
  return createNotification({
    type: "Pedido",
    title: "Pedido aprobado",
    message:
      "El pedido fue aprobado correctamente y enviado al área logística.",

    recipient_name: order.customer_name || "Cliente",
    recipient_email: order.customer_email || "",

    related_module: "Pedidos",
    related_id: order.order_code || order.id,

    status: "Enviado",
  });
}

export async function notifyRejectedOrder(order) {
  return createNotification({
    type: "Reembolso",
    title: "Pedido rechazado",
    message:
      "Se notificó al cliente sobre el rechazo y el proceso de reembolso.",

    recipient_name: order.customer_name || "Cliente",
    recipient_email: order.customer_email || "",

    related_module: "Reembolsos",
    related_id: order.order_code || order.id,

    status: "Pendiente",
  });
}

export async function notifyShipmentCreated(shipment) {
  return createNotification({
    type: "Envío",
    title: "Envío preparado",
    message:
      "El pedido fue derivado al módulo logístico en estado Preparando envío.",

    recipient_name: shipment.customer_name || "Cliente",
    recipient_email: shipment.customer_email || "",

    related_module: "Envíos",
    related_id: shipment.tracking_code || shipment.id,

    status: "Enviado",
  });
}

export async function notifyInvoiceGenerated(sale) {
  return createNotification({
    type: "Boleta",
    title: "Boleta generada",
    message:
      "Se generó correctamente la boleta electrónica asociada a la venta.",

    recipient_name: sale.customer_name || "Cliente",
    recipient_email: sale.customer_email || "",

    related_module: "Ventas",
    related_id: sale.order_code || sale.id,

    status: "Enviado",
  });
}