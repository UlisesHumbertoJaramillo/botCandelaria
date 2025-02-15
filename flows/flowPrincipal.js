const { addKeyword } = require("@bot-whatsapp/bot");
const { flowEspecialidades } = require("./flowEspecialidades");
const logger = require("../services/logger/logger");
const { flowOtrasConsultas } = require("./flowOtrasConsultas");

const flowPrincipal = addKeyword([
  "hola",
  "Hola",
  "Buenas",
  "Buenas tardes",
  "Buenas noches",
  "Buen día",
  "Buen dia",
  "ole",
  "alo",
  "buenas",
  "buen día",
  "buen dia",
  "buenas tardes",
  "Turno",
  "turno",
  "buenas noches",
])
  .addAnswer("🙌 Gracias por comunicarse con CMI Candelaria")
  .addAnswer(
    [
      "🏥 El domicilio del CMI es *Tte. Candelaria 50* y los horarios de atención son de *Lunes a Viernes de 8Hs a 20Hs y Sábados de 9Hs a 13Hs*",
    ],
    {
      delay: 1000,
    },
    async (ctx) => {
      await logger.info(
        `Usuario ${ctx.from} inició conversación con mensaje: ${ctx.body}`
      );
    }
  )
  .addAnswer(
    [
      "👇 Por favor seleccione la opción deseada, escribiendo el número de la opción.",
      "*1.-* Solicitar Turno",
      "*2.-* Otras consultas",
    ],
    { capture: true },
    async (ctx, { gotoFlow }) => {
      await logger.info(
        `Usuario ${ctx.from} seleccionó la opción: ${ctx.body}`
      );
      await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
      const option = ctx.body;

      switch (option) {
        case "1":
          return gotoFlow(flowEspecialidades);
        case "2":
          return gotoFlow(flowOtrasConsultas);
        default:
          await flowDynamic("*Por favor, elija una opción válida (1 o 2).👇*");
          return fallBack();
      }
    }
  );

module.exports = { flowPrincipal };
