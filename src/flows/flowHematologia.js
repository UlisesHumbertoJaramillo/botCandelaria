import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowDespedida } from "./flowDespedida";

export const flowHematologia = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Dra. ARNAIZ Costansa 👩‍⚕️",
    "Para solicitar turnos comunicarse con el siguiente número: *2995975077*. 📞",
  ],
  { delay: 1000 },
  async (_, { gotoFlow }) => {
    // Finaliza el flujo
    return gotoFlow(flowDespedida);
  }
);
