const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { EVENTS } = require("@bot-whatsapp/bot");

const flowDiabetologia = addKeyword(EVENTS.ACTION).addAnswer(
  "Dra. BENINI Romina (Diabetología) 🩺.",
  { delay: 1000 },
  async (_, { state, gotoFlow }) => {
    await state.update({ profesional: "Dra. BENINI Romina (Diabetología)" });
    return gotoFlow(flowTurno);
  }
);

module.exports = { flowDiabetologia };
