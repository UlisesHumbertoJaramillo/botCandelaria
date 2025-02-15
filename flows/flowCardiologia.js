const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno"); // Importa el flujo de turnos
const { EVENTS } = require("@bot-whatsapp/bot");
const logger = require("../services/logger/logger");

const flowCardiologia = addKeyword(EVENTS.ACTION)
  .addAnswer(
    "*Por favor*, escriba el número correspondiente al *profesional* que desea elegir:",
    {
      delay: 1000,
    }
  )
  .addAnswer(
    [
      "*1.-* Dr. GORDIOLA Mirko", // Opciones resaltadas en negrita
      "*2.-* Dra. WALL Valeria",
      "*3.-* SANTA MARÍA Martín",
      "*4.-* Indistinto",
    ],
    { capture: true, delay: 2000 },
    async (ctx, { state, flowDynamic, gotoFlow, fallBack }) => {
      await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
      if (ctx.body === "1") {
        // Guarda la elección del profesional en el estado
        await state.update({ profesional: "Dr. GORDIOLA Mirko" });
        return gotoFlow(flowTurno); // Redirige al flujo de turnos
      } else if (ctx.body === "2") {
        // Guarda la elección de la Dra. Wall Valeria
        await state.update({ profesional: "Dra. WALL Valeria" });
        return gotoFlow(flowTurno); // Redirige al flujo de turnos
      } else if (ctx.body === "3") {
        // Guarda la elección del Dr. SANTA MARIA Martín
        await state.update({ profesional: "Dr. SANTA MARIA Martín" });
        return gotoFlow(flowTurno); // Redirige al flujo de turnos
      } else if (ctx.body === "4") {
        // Guarda la elección Indistinto
        await state.update({ profesional: "Indistinto" });
        return gotoFlow(flowTurno); // Redirige al flujo de turnos
      } else {
        // Manejo de opción inválida: vuelve a iniciar el flujo actual
        await flowDynamic("*Por favor, elija una opción válida (1 al 4).👇*");
        return fallBack(); // Reinicia el flujo actual
      }
    }
  );

module.exports = { flowCardiologia };
