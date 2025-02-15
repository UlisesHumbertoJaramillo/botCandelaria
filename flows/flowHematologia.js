const { addKeyword } = require("@bot-whatsapp/bot");
const { EVENTS } = require("@bot-whatsapp/bot");
const { flowDespedida } = require("./flowDespedida");

const flowHematologia = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Dra. ARNAIZ Costansa 👩‍⚕️",
    "Para solicitar turnos comunicarse con el siguiente número: *2995975077*. 📞",
  ],
  { delay: 1000 },
  async (_, { gotoFlow }) => {
    // Finaliza el flujo
    return gotoFlow(flowDespedida);
  }
);

module.exports = { flowHematologia };
