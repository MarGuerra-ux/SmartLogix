const DEFAULT_POLICY = {

  /**
   * automatic
   * custom
   */
  assignmentMode: "automatic",

  /**
   * Solo aplica para modo custom
   */
  enabledCarriers: [
    "Chilexpress",
    "Blue Express"
  ]
};

export function getCarrierPolicy() {

  const saved = localStorage.getItem(
    "smartlogix_carrier_policy"
  );

  if (!saved) {
    return DEFAULT_POLICY;
  }

  try {

    const parsed =
      JSON.parse(saved);

    return {
      ...DEFAULT_POLICY,
      ...parsed
    };

  } catch {

    return DEFAULT_POLICY;
  }
}

export function saveCarrierPolicy(
  policy
) {

  localStorage.setItem(
    "smartlogix_carrier_policy",
    JSON.stringify(policy)
  );

  return true;
}

/*

=========================================
FUTURA IMPLEMENTACIÓN SUPABASE
=========================================

export async function getCarrierPolicy() {

  const { data } = await supabase
    .from("carrier_policy")
    .select("*")
    .single();

  return data;
}

export async function saveCarrierPolicy(
  policy
) {

  return await supabase
    .from("carrier_policy")
    .upsert(policy);
}

=========================================
FIN IMPLEMENTACIÓN SUPABASE
=========================================

*/