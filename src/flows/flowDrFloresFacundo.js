import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowTurno } from "./flowTurno";
import { flowDespedida } from "./flowDespedida";

export const flowDrFloresFacundo = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "*Elija una opción*, por favor:",
    "*1.* Solicitud de recetas o Derivaciones 📄",
    "*2.* Solicitud de turno 📅",
  ],
  { capture: true, delay: 1000 },
  async (ctx, { state, fallBack, flowDynamic, gotoFlow }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    const option = ctx.body;

    // Guardar el nombre del especialista en el state
    await state.update({ profesional: "Dr. Flores Facundo" });

    switch (option) {
      case "1":
        // Mensajes para la opción 1
        await flowDynamic([
          "*Para realizar la solicitud de recetas / derivaciones,* por favor comuníquese con el siguiente número: 2993332300 📞",
        ]);
        return gotoFlow(flowDespedida);

      case "2":
        // Redirige al flujo de turnos
        return gotoFlow(flowTurno);

      default:
        // Manejo de opción inválida
        await flowDynamic("*Por favor, elija una opción válida (1 o 2).👇*");
        return fallBack();
    }
  }
);
