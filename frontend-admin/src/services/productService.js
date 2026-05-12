import { supabase } from "../lib/supabase";

/* GET ALL PRODUCTS */

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error obteniendo productos:", error);
    return [];
  }

  return data;
}

/* GET PRODUCT BY ID */

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error obteniendo producto:", error);
    return null;
  }

  return data;
}

/* CREATE PRODUCT */

export async function createProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select();

  if (error) {
    console.error("Error creando producto:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

/* UPDATE PRODUCT */

export async function updateProduct(id, product) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error actualizando producto:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

/* DELETE PRODUCT */

export async function deleteProduct(id) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error eliminando producto:", error);
    return { success: false, error };
  }

  return { success: true };
}

/* PRODUCTS BY CATEGORY */

export async function getProductsByCategoryName(categoryName) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", categoryName);

  if (error) {
    console.error(
      "Error verificando productos por categoría:",
      error
    );

    return [];
  }

  return data;
}

/* VERIFY PRODUCTS INSIDE ORDERS */

export async function getOrderItemsByProductId(productId) {
  const { data, error } = await supabase
    .from("order_items")
    .select("*")
    .eq("product_id", productId);

  if (error) {
    console.error(
      "Error verificando producto en pedidos:",
      error
    );

    return [];
  }

  return data;
}