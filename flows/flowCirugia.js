const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { EVENTS } = require("@bot-whatsapp/bot");
const logger = require("../services/logger/logger");

const flowCirugia = addKeyword(EVENTS.ACTION)
  .addAnswer(
    "*Por favor*, escriba el número correspondiente al *profesional* que desea elegir:",
    {
      delay: 1000,
    }
  )
  .addAnswer(
    [
      "*1.* Dra. AVALOS Nadia 👩‍⚕️",
      "*2.* Dr. ACEVEDO José A. 👨‍⚕️",
      "*3.* Dr. DOFFO Hernán (Cirugía General Bariátrica) 👨‍⚕️",
      "*4.* Dr. VERNI Alfredo (General, Obesidad, Endoscopía) 👨‍⚕️",
      "*5.* Indistinto",
    ],
    { capture: true, delay: 2000 },
    async (ctx, { state, fallBack, flowDynamic, gotoFlow }) => {
      await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
      // Mapeo de las opciones de los profesionales (orden alfabético)
      const opciones = {
        1: "Dra. AVALOS Nadia",
        2: "Dr. ACEVEDO José A.",
        3: "Dr. DOFFO Hernán (Cirugía General Bariátrica)",
        4: "Dr. VERNNI Alfredo (General, Obesidad, Endoscopía)",
        5: "Indistinto",
      };

      // Recupera la elección del usuario
      const eleccion = opciones[ctx.body];

      if (eleccion) {
        // Guarda la elección del profesional en el estado
        await state.update({ profesional: eleccion });
        // Redirige al flujo de turnos
        return gotoFlow(flowTurno);
      } else {
        // Manejo de opciones inválidas: vuelve a preguntar al usuario
        await flowDynamic("*Por favor, elija una opción válida (1 al 4).👇*");
        return fallBack(); // Reinicia el flujo actual
      }
    }
  );

module.exports = { flowCirugia };
