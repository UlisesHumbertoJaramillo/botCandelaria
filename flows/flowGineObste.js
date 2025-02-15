const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { EVENTS } = require("@bot-whatsapp/bot");
const logger = require("../services/logger/logger");

const flowGineObste = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "*Por favor*, escriba el número correspondiente al *profesional* que desea elegir:",
    "*1.-* Dr. AGUIRRE Edgar Adrián (Tocoginecólogo, Esp. TGI y Colposcopia)",
    "*2.-* Dr. DI FIORE Hugo (Ginecología, Ginecología Oncológica)",
    "*3.-* Dra. FEMENIA Rosa (Eco gineco-obstétrica 5D)",
    "*4.-* Dra. GONZÁLEZ Lucia (Ginecología Integral, Regenerativa y Estética)",
    "*5.-* Dr. ORTEGA César (Eco gineco-obstétrica 5D)",
    "*6.-* Indistinto",
  ],
  { capture: true, delay: 1000 },
  async (ctx, { state, fallBack, flowDynamic, gotoFlow }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    const option = ctx.body;

    switch (option) {
      case "1":
        await state.update({
          profesional:
            "Dr. AGUIRRE Edgar Adrián (Tocoginecólogo, Esp. TGI y Colposcopia)",
        });
        break;
      case "2":
        await state.update({
          profesional:
            "Dr. DI FIORE Hugo (Ginecología, Ginecología Oncológica)",
        });
        break;
      case "3":
        await state.update({
          profesional: "Dra. FEMENIA Rosa (Eco gineco-obstétrica 5D)",
        });
        break;
      case "4":
        await state.update({
          profesional:
            "Dra. GONZÁLEZ Lucia (Ginecología Integral, Regenerativa y Estética)",
        });
        break;
      case "5":
        await state.update({
          profesional: "Dr. ORTEGA César (Eco gineco-obstétrica 5D)",
        });
        break;
      case "6":
        await state.update({
          profesional: "Indistinto",
        });
        break;
      default:
        await flowDynamic("*Por favor, elija una opción válida (1 al 6).👇*");
        return fallBack();
    }

    // Redirigir al flowTurno
    return gotoFlow(flowTurno);
  }
);

module.exports = { flowGineObste };
