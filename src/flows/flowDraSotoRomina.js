import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowDespedida } from "./flowDespedida";

export const flowDraSotoRomina = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Od. SOTO Romina",
    "Para solicitar turnos comunicarse con el siguiente número: *2994087725*. 📞",
  ],
  { delay: 1000 },
  (_, { gotoFlow }) => {
    return gotoFlow(flowDespedida); // Redirigir al flujo flowDespedida
  }
);