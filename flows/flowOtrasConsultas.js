const { addKeyword } = require("@bot-whatsapp/bot");
const { EVENTS } = require("@bot-whatsapp/bot");
const logger = require("../services/logger/logger");
const { flowDespedida } = require("./flowDespedida");

const flowOtrasConsultas = addKeyword(EVENTS.ACTION).addAnswer(
  "Por favor, escriba su consulta. Luego, el área de secretaría la responderá en cuanto esté disponible.",
  { capture: true, delay: 1000 },
  async (ctx, { gotoFlow, state, endFlow }) => {
    // 1. Añadir endFlow en los parámetros
    logger.info(`Usuario ${ctx.from} su Consulta es: ${ctx.body}`);
    await state.update({ consulta: ctx.body });
    return gotoFlow(flowDespedida); // 2. Usar await para asegurar la transición
  }
);

module.exports = { flowOtrasConsultas };
