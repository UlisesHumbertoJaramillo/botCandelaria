const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { EVENTS } = require("@bot-whatsapp/bot");

const flowNeumonologia = addKeyword(EVENTS.ACTION).addAnswer(
  "Dr. LAVACCARA Damián",
  { delay: 1000 },
  async (_, { state, gotoFlow }) => {
    await state.update({
      profesional: " Dr. LAVACCARA Damián",
    });
    return gotoFlow(flowTurno);
  }
);

module.exports = { flowNeumonologia };
