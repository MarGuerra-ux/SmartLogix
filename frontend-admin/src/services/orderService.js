import { supabase } from "../lib/supabase";

/* GET ORDERS */

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error obteniendo pedidos:", error);
    return [];
  }

  return data;
}

/* GET ORDER BY ID */

export async function getOrderById(id) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error obteniendo pedido:", error);
    return null;
  }

  return data;
}

/* CREATE ORDER */

export async function createOrder(order) {
  const { data, error } = await supabase
    .from("orders")
    .insert([order])
    .select();

  if (error) {
    console.error("Error creando pedido:", error);

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

/* UPDATE ORDER STATUS */

export async function updateOrderStatus(
  id,
  status
) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) {
    console.error(
      "Error actualizando pedido:",
      error
    );

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

/* UPDATE ORDER */

export async function updateOrder(id, order) {
  const { data, error } = await supabase
    .from("orders")
    .update(order)
    .eq("id", id)
    .select();

  if (error) {
    console.error(
      "Error actualizando pedido:",
      error
    );

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

/* DELETE ORDER */

export async function deleteOrder(id) {
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Error eliminando pedido:",
      error
    );

    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
  };
}