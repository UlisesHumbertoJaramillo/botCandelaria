import { addKeyword, EVENTS } from "@builderbot/bot";
import { logger } from "../services/logger/logger";
import { flowTurno } from "./flowTurno";

export const flowChequeoGinecologico = addKeyword(EVENTS.ACTION).addAnswer(
  ["Seleccionó chequeo ginecológico."],
  { delay: 1000 },
  async (ctx, { state, flowDynamic, gotoFlow }) => {
    // Guardar el profesional en el estado
    await state.update({ profesional: "Chequeo ginecológico" });

    // Redirigir al flujo de turnos
    return gotoFlow(flowTurno);
  }
);
