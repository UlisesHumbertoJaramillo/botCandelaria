import { addKeyword, EVENTS } from "@builderbot/bot";
import { logger } from "../services/logger/logger";
import { flowDespedida } from "./flowDespedida";

export const flowChoquetBarbara = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Para solicitar turnos comunicarse con el siguiente número: *2994184285* 📞",
  ],
  { delay: 1000 },
  async (_, { gotoFlow }) => {
    // Finaliza el flujo
    return gotoFlow(flowDespedida);
  }
);
