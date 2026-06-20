import { useState } from "react";

import "../../styles/CarrierPolicyCard.css";

import {
  getCarrierPolicy,
  saveCarrierPolicy
} from "../../services/carrierPolicyService";

export default function CarrierPolicyCard({
  carriers
}) {

  const [policy, setPolicy] =
    useState(getCarrierPolicy());

  function changeMode(mode) {

    setPolicy((prev) => ({
      ...prev,
      assignmentMode: mode
    }));
  }

  function toggleCarrier(carrierName) {

    const exists =
      policy.enabledCarriers.includes(
        carrierName
      );

    let updated;

    if (exists) {

      updated =
        policy.enabledCarriers.filter(
          (carrier) =>
            carrier !== carrierName
        );

    } else {

      updated = [
        ...policy.enabledCarriers,
        carrierName
      ];
    }

    setPolicy((prev) => ({
      ...prev,
      enabledCarriers: updated
    }));
  }

  function savePolicy() {

    if (
      policy.assignmentMode === "custom" &&
      policy.enabledCarriers.length === 0
    ) {

      alert(
        "Debes seleccionar al menos un transportista."
      );

      return;
    }

    saveCarrierPolicy(policy);

    alert(
      "Configuración guardada correctamente"
    );
  }

  return (
    <div className="policy-card">

      <h2>
        ⚙️ Política de Asignación
      </h2>

      <p>
        Define cómo SmartLogix seleccionará
        automáticamente el transportista más
        conveniente para cada pedido.
      </p>

      <div className="policy-section">

        <label>

          <input
            type="radio"
            checked={
              policy.assignmentMode ===
              "automatic"
            }
            onChange={() =>
              changeMode("automatic")
            }
          />

          🤖 Automático Inteligente

        </label>

        <small>
          SmartLogix evaluará todos los
          transportistas disponibles y
          seleccionará el más conveniente.
        </small>

      </div>

      <div className="policy-section">

        <label>

          <input
            type="radio"
            checked={
              policy.assignmentMode ===
              "custom"
            }
            onChange={() =>
              changeMode("custom")
            }
          />

          🎯 Automático Personalizado

        </label>

        <small>
          SmartLogix evaluará solamente
          los transportistas seleccionados
          por el administrador.
        </small>

      </div>

      {policy.assignmentMode ===
        "custom" && (

        <div className="policy-section">

          <label>
            Transportistas Permitidos
          </label>

          {carriers.map((carrier) => (

            <label
              key={carrier.id}
              className="carrier-checkbox"
            >

              <input
                type="checkbox"
                checked={
                  policy.enabledCarriers.includes(
                    carrier.name
                  )
                }
                onChange={() =>
                  toggleCarrier(
                    carrier.name
                  )
                }
              />

              {carrier.name}

            </label>

          ))}

        </div>
      )}

      <div className="policy-info-box">

        <h4>
          ¿Cómo funciona?
        </h4>

        <p>

          Para envíos normales se prioriza:
          costo, tiempo de entrega,
          incidencias y SLA.

        </p>

        <p>

          Para envíos express se prioriza:
          velocidad de entrega, SLA e
          incidencias por sobre el costo.

        </p>

      </div>

      <button
        className="save-policy-btn"
        onClick={savePolicy}
      >
        Guardar Configuración
      </button>

    </div>
  );
}