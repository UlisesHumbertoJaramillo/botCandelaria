const { addKeyword } = require("@bot-whatsapp/bot");
const { EVENTS } = require("@bot-whatsapp/bot");
const { flowDespedida } = require("./flowDespedida"); // Importar flowDespedida

const flowOftalmologia = addKeyword(EVENTS.ACTION)
  .addAnswer(
    [
      "Los profesionales que atienden en Oftalmología son:",
      "👉 *Dr. DAVIL Osvaldo Javier*",
      "👉 *Dra. NUÑEZ Romina*  (Niños y adultos)",
    ],
    { delay: 1000 }
  )
  .addAnswer(
    [
      "Para solicitar turnos para Oftalmología, por favor llame al siguiente número *2996564065*, dentro del horario de atención de *Lunes a Viernes de 9Hs a 15:30Hs*. 📞",
    ],
    { delay: 1000 },
    async (_, { gotoFlow }) => {
      return gotoFlow(flowDespedida); // Redirigir al flujo flowDespedida
    }
  );

module.exports = { flowOftalmologia };
