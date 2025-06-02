import { addKeyword, EVENTS } from "@builderbot/bot";
import { flowDespedida } from "./flowDespedida";

export const flowDraMoralesAndrea = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Od. MORALES Andrea.",
    "Para solicitar turnos comunicarse con el siguiente número: *2995805613*. 📞",
  ],
  { delay: 1000 },
  (_, { gotoFlow }) => {
    return gotoFlow(flowDespedida); // Redirigir al flujo flowDespedida
  }
);
