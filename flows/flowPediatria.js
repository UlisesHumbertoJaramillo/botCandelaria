const { addKeyword } = require("@bot-whatsapp/bot");
const { EVENTS } = require("@bot-whatsapp/bot");
const { flowDespedida } = require("./flowDespedida");

const flowPediatria = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Será atendido por la Dra. TOGNONATO Sofia. 👩‍⚕️",
    "Por favor comuníquese con el siguiente número: *2996345972*. 📞",
    "¡Muchas gracias! 😊",
  ],
  { delay: 1000 },
  async (_, { gotoFlow }) => {
    // Finaliza el flujo
    return gotoFlow(flowDespedida);
  }
);

module.exports = { flowPediatria };
