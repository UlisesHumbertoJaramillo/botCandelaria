const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { EVENTS } = require("@bot-whatsapp/bot");

const flowNeurologia = addKeyword(EVENTS.ACTION).addAnswer(
  ["Será atendido por el Dr. SALMAN José. 👨‍⚕️"],
  { delay: 1000 },
  async (ctx, { state, flowDynamic, gotoFlow }) => {
    // Guardar el profesional en el estado
    await state.update({ profesional: "Dr. SALMAN José" });

    // Mostrar el mensaje con la información sobre el pago
    await flowDynamic([
      "Se se comunica que para solicitar un turno deberá realizar un pago por adelantado, que deberá ser en efectivo en el caso de que resida en la ciudad de Neuquén, en caso contrario podrá ser por transferencia. El valor será informado luego por el área de secretaría.",
    ]);

    // Redirigir al flujo de turnos
    return gotoFlow(flowTurno);
  }
);

module.exports = { flowNeurologia };
