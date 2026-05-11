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