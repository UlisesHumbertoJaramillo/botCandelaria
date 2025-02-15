const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { EVENTS } = require("@bot-whatsapp/bot");

const flowGastroenterologia = addKeyword(EVENTS.ACTION).addAnswer(
  "Dr. MIODOSKY Alejandro",
  { delay: 1000 },
  async (_, { state, gotoFlow }) => {
    await state.update({
      profesional: "Dr. MIODOSKY Alejandro",
    });
    return gotoFlow(flowTurno);
  }
);

module.exports = { flowGastroenterologia };
