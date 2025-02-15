const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { EVENTS } = require("@bot-whatsapp/bot");
const logger = require("../services/logger/logger");

const flowNutricion = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "*Por favor*, escriba el número correspondiente al *profesional* que desea elegir:",
    "*1.-* Lic. CHOQUET Barbara 👩‍⚕️",
    "*2.-* Lic. ENEI Agustina 👩‍⚕️",
    "*3.-* Lic. PIERINI Clara 👩‍⚕️",
    "*4.-* Lic. SANDOVAL Natalia 👩‍⚕️",
    "*5.-* Lic. TACCO Giuliana 👩‍⚕️",
    "*6.-* Lic. ZABALZA Gabriela 👩‍⚕️",
    "*7.-* Indistinto",
  ],
  { capture: true, delay: 1000 },
  async (ctx, { state, fallBack, flowDynamic, gotoFlow }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    const opciones = {
      1: "Lic. CHOQUET Barbara",
      2: "Lic. ENEI Agustina",
      3: "Lic. PIERINI Clara",
      4: "Lic. SANDOVAL Natalia",
      5: "Lic. TACCO Giuliana",
      6: "Lic. ZABALZA Gabriela",
      7: "Indistinto",
    };

    const profesional = opciones[ctx.body];
    if (profesional) {
      await state.update({ profesional });
      return gotoFlow(flowTurno);
    } else {
      await flowDynamic("*Por favor, elija una opción válida (1 al 5).👇*");
      return fallBack();
    }
  }
);

module.exports = { flowNutricion };
