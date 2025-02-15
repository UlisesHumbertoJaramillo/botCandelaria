const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { EVENTS } = require("@bot-whatsapp/bot");

const flowTratDolor = addKeyword(EVENTS.ACTION).addAnswer(
  "*Dr. BRAVO Daniel* (tratamiento del dolor articular).",
  { delay: 1000 },
  async (_, { state, gotoFlow }) => {
    await state.update({
      profesional: "Dr. BRAVO Daniel",
    });
    return gotoFlow(flowTurno);
  }
);

module.exports = { flowTratDolor };
