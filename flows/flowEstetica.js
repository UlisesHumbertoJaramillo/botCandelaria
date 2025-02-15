const { addKeyword } = require("@bot-whatsapp/bot");
const { EVENTS } = require("@bot-whatsapp/bot");
const { flowDespedida } = require("./flowDespedida"); // Importar flowDespedida

const flowEstetica = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Para solicitar turnos en la especialidad estética, puede comunicarse con los siguientes números:",
    "👉 *+5491176347751* - Dr. Gustavo Silva 👨‍⚕️",
    "👉 *2994089145* - Dr. Paillacar 👨‍⚕️",
    "👉 *2995940153* - Ortepal 👨‍⚕️",
    "👉 *2995182826* - LPEquipos 📱",
  ],
  { delay: 1000 },
  async (_, { gotoFlow }) => {
    return gotoFlow(flowDespedida); // Redirigir al flujo flowDespedida
  }
);

module.exports = { flowEstetica };
