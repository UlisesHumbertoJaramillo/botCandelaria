import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowDespedida } from "./flowDespedida";

export const flowDraMoralezAndrea = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Od. MORALEZ  Andrea",
    "Para solicitar turnos comunicarse con el siguiente número: *2995805613*. 📞",
  ],
  { delay: 1000 },
  (_, { gotoFlow }) => {
    return gotoFlow(flowDespedida); // Redirigir al flujo flowDespedida
  }
);