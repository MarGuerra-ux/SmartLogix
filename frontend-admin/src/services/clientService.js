import { supabase } from "../lib/supabase";

/* GET ALL CLIENTS */

export async function getClients() {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error obteniendo clientes:", error);
    return [];
  }

  return data;
}

/* GET CLIENT BY ID */

export async function getClientById(id) {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error obteniendo cliente:", error);
    return null;
  }

  return data;
}

/* CREATE CLIENT */

export async function createClient(client) {
  const { data, error } = await supabase
    .from("clients")
    .insert([client])
    .select();

  if (error) {
    console.error("Error creando cliente:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

/* UPDATE CLIENT */

export async function updateClient(id, client) {
  const { data, error } = await supabase
    .from("clients")
    .update(client)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error actualizando cliente:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

/* DELETE CLIENT */

export async function deleteClient(id) {
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error eliminando cliente:", error);
    return { success: false, error };
  }

  return { success: true };
}

/* VERIFY CLIENT ORDERS */

export async function getOrdersByClientId(clientId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("client_id", clientId);

  if (error) {
    console.error(
      "Error verificando pedidos del cliente:",
      error
    );

    return [];
  }

  return data;
}