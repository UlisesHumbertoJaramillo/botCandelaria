const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const logger = require("../services/logger/logger");

const flowDespedida = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "¡Muchas gracias! 🙌",
    "Si  desea obtener otro turno, escriba *turno*",
    "¡Hasta luego! 👋",
  ],
  { delay: 1000 },
  async (_, { endFlow }) => {
    await logger.info(`Usuario ${ctx.from} terminó el flujo`);
    return endFlow(); // Terminar el flujo
  }
);

module.exports = { flowDespedida };
