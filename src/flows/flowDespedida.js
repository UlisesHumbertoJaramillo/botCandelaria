import { addKeyword,EVENTS} from "@builderbot/bot";
import {logger} from "../services/logger/logger";

export const flowDespedida = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "¡Muchas gracias! 🙌",
    "Si  desea obtener otro turno, escriba *turno*",
    "¡Hasta luego! 👋",
  ],
  { delay: 1000 },
  async (ctx, { endFlow }) => {
    await logger.info(`Usuario ${ctx.from} terminó el flujo`);
    return endFlow(); // Terminar el flujo
  }
);
