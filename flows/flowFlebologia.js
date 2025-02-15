const { addKeyword } = require("@bot-whatsapp/bot");
const { EVENTS } = require("@bot-whatsapp/bot");
const { flowDespedida } = require("./flowDespedida"); // Importar flowDespedida
const flowFlebologia = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Para comunicarse con *Dr. ROMÁN Martín*, por favor comuníquese con el siguiente número:",
    "👉 *2995128383* - Dr. Román 👨‍⚕️",
  ],
  { delay: 1000 },
  async (_, { gotoFlow }) => {
    return gotoFlow(flowDespedida); // Redirigir al flujo flowDespedida
  }
);

module.exports = { flowFlebologia };
