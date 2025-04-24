import { addKeyword, EVENTS } from "@builderbot/bot";
import { logger } from "../services/logger/logger";
import { flowTurno } from "./flowTurno";

export const flowChequeoCompleto = addKeyword(EVENTS.ACTION)
  .addAnswer(
    "*Por favor*, escriba el número correspondiente al *Chequeo* que desea elegir:"
  )
  .addAnswer(
    ["*1.* Chequeo Clínico", "*2.* Prequirúrgico"],
    { capture: true, delay: 1000 },
    async (ctx, { state, fallBack, flowDynamic, gotoFlow }) => {
      await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
      // Mapeo de las opciones de los chequeos
      const opciones = {
        1: "Chequeo Clínico",
        2: "Prequirúrgico",
      };

      // Recupera la elección del usuario
      const eleccion = opciones[ctx.body];

      if (eleccion) {
        // Guarda la elección del profesional en el estado
        await state.update({ profesional: eleccion });
        // Redirige al flujo de turnos
        return gotoFlow(flowTurno);
      } else {
        // Manejo de opciones inválidas: vuelve a preguntar al usuario
        await flowDynamic("*Por favor, elija una opción válida (1 o 2).👇*");
        return fallBack(); // Reinicia el flujo actual
      }
    }
  );
