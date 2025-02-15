const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { EVENTS } = require("@bot-whatsapp/bot");

const flowPsiquiatria = addKeyword(EVENTS.ACTION).addAnswer(
  "Dra. ERDOZAIN Fabiana.",
  { delay: 1000 },
  async (_, { state, gotoFlow }) => {
    await state.update({
      profesional: " Dra. ERDOZAIN Fabiana.",
    });
    return gotoFlow(flowTurno);
  }
);

module.exports = { flowPsiquiatria };
