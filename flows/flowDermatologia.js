const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { EVENTS } = require("@bot-whatsapp/bot");

const flowDermatologia = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Será atendido por la *Dra. RANGONE Natalia* 👩‍⚕️",
    "Se comunica que para solicitar un *turno* deberá abonar un *coseguro* que le será informado por las *secretarias* 🗣️.",
  ],
  { delay: 1000 },
  async (_, { gotoFlow, state }) => {
    // Guardar el dato del profesional en el estado
    await state.update({ profesional: "Dra. RANGONE Natalia" });
    // Dirigir al flujo de turno
    return gotoFlow(flowTurno);
  }
);

module.exports = { flowDermatologia };
