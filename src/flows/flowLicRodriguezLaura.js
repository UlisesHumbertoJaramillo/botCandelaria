import { addKeyword, EVENTS } from "@builderbot/bot";
import { flowDespedida } from "./flowDespedida";

export const flowLicRodriguezLaura = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Lic. RODRIGUEZ Laura.",
    "Para solicitar turnos comunicarse con el siguiente número: *2996334105*. 📞",
  ],
  { delay: 1000 },
  (_, { gotoFlow }) => {
    return gotoFlow(flowDespedida); // Redirigir al flujo flowDespedida
  }
);
