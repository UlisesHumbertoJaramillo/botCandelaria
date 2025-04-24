import { addKeyword, EVENTS } from "@builderbot/bot";
import { flowTurno } from "./flowTurno";

export const flowDermatologia = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Será atendido por la *Dra. RANGONE Natalia* 👩‍⚕️",
    "Se comunica que para solicitar un *turno* deberá abonar un *plus* que le será informado por el área de secretaría 🗣️.",
  ],
  { delay: 1000 },
  async (_, { gotoFlow, state }) => {
    // Guardar el dato del profesional en el estado
    await state.update({ profesional: "Dra. RANGONE Natalia" });
    // Dirigir al flujo de turno
    return gotoFlow(flowTurno);
  }
);
