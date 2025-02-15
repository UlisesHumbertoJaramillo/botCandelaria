const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { flowDraSelmanSoledad } = require("./flowDraSelmanSoledad");
const { flowDrFloresFacundo } = require("./flowDrFloresFacundo");
const { EVENTS } = require("@bot-whatsapp/bot");
const logger = require("../services/logger/logger");

const flowClinicaMed = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "*Por favor*, escriba el número correspondiente al *profesional* que desea elegir:",
    "*1.* Dr. FLORES Facundo 👨‍⚕️",
    "*2.* Dra. GARAVAGLIA Fabiana (Medicina general y transgénero) 👩‍⚕️",
    "*3.* Dra. ROCCIA María Laura 👩‍⚕️",
    "*4.* Dra. SELMAN Soledad 👩‍⚕️",
    "*5.* Indistinto",
  ],
  { capture: true },
  async (ctx, { flowDynamic, fallBack, gotoFlow, state }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);

    if (ctx.body === "1") {
      await state.update({ profesional: "Dr. FLORES Facundo" });
      return gotoFlow(flowDrFloresFacundo);
    } else if (ctx.body === "2") {
      await state.update({ profesional: "Dra. GARAVAGLIA Fabiana" });
      return gotoFlow(flowTurno);
    } else if (ctx.body === "3") {
      await state.update({ profesional: "Dra. ROCCIA María Laura" });
      return gotoFlow(flowTurno);
    } else if (ctx.body === "4") {
      await state.update({ profesional: "Dra. SELMAN Soledad" });
      return gotoFlow(flowDraSelmanSoledad);
    } else if (ctx.body === "5") {
      await state.update({ profesional: "Indistinto" });
      return gotoFlow(flowTurno);
    } else {
      await flowDynamic("*Por favor, elija una opción válida (1 al 5).👇*");
      return fallBack();
    }
  }
);

module.exports = { flowClinicaMed };
