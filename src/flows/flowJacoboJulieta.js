import { addKeyword, EVENTS } from "@builderbot/bot";
import { flowDespedida } from "./flowDespedida";

export const flowJacoboJulieta = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Lic. JACOBO Julieta.",
    "Para solicitar turnos comunicarse con el siguiente número: *2996326204*. 📞",
  ],
  { delay: 1000 },
  (_, { gotoFlow }) => {
    return gotoFlow(flowDespedida); // Redirigir al flujo flowDespedida
  }
);
