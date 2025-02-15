const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { EVENTS } = require("@bot-whatsapp/bot");
const { flowDespedida } = require("./flowDespedida");
const logger = require("../services/logger/logger");

const flowCetro = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Elija una opción, por favor:",
    "*1.* Ver número de teléfono de CETRO.", // Usando un solo asterisco para negrita
    "*2.* Solicitar un turno con CETRO.", // Usando un solo asterisco para negrita
  ],
  { capture: true, delay: 2000 },
  async (ctx, { flowDynamic, gotoFlow, state, fallBack }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    if (ctx.body === "2") {
      // Guarda la elección en el estado antes de ir al flujo de turno
      await state.update({ profesional: "CETRO" });
      return gotoFlow(flowTurno); // Redirige al flujo de turno
    } else if (ctx.body === "1") {
      await flowDynamic("El número de teléfono de CETRO es: *2996725770*"); // Resaltado el teléfono
      return gotoFlow(flowDespedida); // Redirige al flujo de despedida
    } else {
      // Manejo de una opción inválida: vuelve a iniciar el flujo actual
      await flowDynamic("*Por favor, elija una opción válida (1 o 2).👇*");
      return fallBack(); // Reinicia el flujo actual
    }
  }
);

module.exports = { flowCetro };
