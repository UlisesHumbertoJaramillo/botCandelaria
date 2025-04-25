import { addKeyword, EVENTS } from "@builderbot/bot";
import { flowDespedida } from "./flowDespedida";

export const flowDraBoveRomina = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Lic. BOVE Romina.",
    "Para solicitar turnos comunicarse con el siguiente número: *2994569002*. 📞",
  ],
  { delay: 1000 },
  (_, { gotoFlow }) => {
    return gotoFlow(flowDespedida); // Redirigir al flujo flowDespedida
  }
);
