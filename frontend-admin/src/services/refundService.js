import { supabase } from "../lib/supabase";

export async function createRefund(refundData) {
  const { data, error } = await supabase
    .from("refunds")
    .insert([refundData])
    .select();

  if (error) {
    console.error("Error creando reembolso:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function createRefundFromShipment(shipment) {
  const refundData = {
    order_id: shipment.order_id || shipment.tracking_code,
    customer_name: shipment.customer_name || "Cliente no registrado",
    customer_email: shipment.customer_email || "Sin correo",
    customer_phone: shipment.customer_phone || "Sin teléfono",
    customer_rut: shipment.customer_rut || "Sin RUT",
    bank_name: shipment.bank_name || "Banco no registrado",
    account_type: shipment.account_type || "Tipo de cuenta no registrado",
    account_number: shipment.account_number || "N° de cuenta no registrado",
    product_name: shipment.product_name || "Producto no registrado",
    reason: "Producto sin stock disponible",
    refund_amount: shipment.price || 0,
    status: "Pendiente",
  };

  const { data, error } = await supabase
    .from("refunds")
    .insert([refundData])
    .select();

  if (error) {
    console.error("Error creando reembolso desde envío:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function getRefunds() {
  const { data, error } = await supabase
    .from("refunds")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error obteniendo reembolsos:", error);
    return [];
  }

  return data;
}