import { supabase } from "../lib/supabase";

export async function validateOrderStock(order) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("sku", order.productSku)
    .single();

  if (error || !data) {
    return {
      approved: false,
      reason: "Producto no encontrado",
      product: null,
    };
  }

  const availableStock = data.stock_units || 0;

  if (availableStock < order.quantity) {
    return {
      approved: false,
      reason: "Stock insuficiente",
      product: data,
    };
  }

  return {
    approved: true,
    reason: "Stock disponible",
    product: data,
  };
}