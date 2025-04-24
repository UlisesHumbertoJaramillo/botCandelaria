import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowDespedida } from "./flowDespedida";

export const flowOtrasConsultas = addKeyword(EVENTS.ACTION).addAnswer(
  "Por favor, escriba su consulta. Luego, el área de secretaría la responderá en cuanto esté disponible.",
  { capture: true, delay: 1000 },
  async (ctx, { gotoFlow, state, endFlow }) => {
    // 1. Añadir endFlow en los parámetros
    logger.info(`Usuario ${ctx.from} su Consulta es: ${ctx.body}`);
    await state.update({ consulta: ctx.body });
    return gotoFlow(flowDespedida); // 2. Usar await para asegurar la transición
  }
);
