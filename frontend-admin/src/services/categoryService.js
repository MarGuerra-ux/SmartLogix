import { supabase } from "../lib/supabase";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error obteniendo categorías:", error);
    return [];
  }

  return data;
}

export async function createCategory(category) {
  const { data, error } = await supabase
    .from("categories")
    .insert([category])
    .select();

  if (error) {
    console.error("Error creando categoría:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function updateCategory(id, category) {
  const { data, error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error actualizando categoría:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function deleteCategory(id) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error eliminando categoría:", error);
    return { success: false, error };
  }

  return { success: true };
}