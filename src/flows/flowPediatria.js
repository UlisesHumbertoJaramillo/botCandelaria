import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowDespedida } from "./flowDespedida";

export const flowPediatria = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Será atendido por la Dra. TOGNONATO Sofia. 👩‍⚕️",
    "Por favor comuníquese con el siguiente número: *2996345972*. 📞",
    "¡Muchas gracias! 😊",
  ],
  { delay: 1000 },
  async (_, { gotoFlow }) => {
    // Finaliza el flujo
    return gotoFlow(flowDespedida);
  }
);
