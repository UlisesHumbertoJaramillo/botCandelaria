import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowTurno } from "./flowTurno";

export const flowUrologia = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "*Por favor*, escriba el número correspondiente al *profesional* que desea elegir:",
    "*1.-* Dra. ESTEFANO María Julia",
    "*2.-* Dr. FUENTEALBA Juan",
    "*3.-* Dr. KOLL Eduardo",
    "*4.-* Indistinto",
  ],
  {
    capture: true,
    delay: 1000,
  },
  async (ctx, { state, gotoFlow, flowDynamic, fallBack }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    let profesional = "";

    // Verificación de la opción seleccionada por el usuario
    switch (ctx.body) {
      case "1":
        profesional = "Dra. ESTEFANO María Julia";
        break;
      case "2":
        profesional = "Dr. FUENTEALBA Juan";
        break;
      case "3":
        profesional = "Dr. KOLL Eduardo";
        break;
      default:
        await flowDynamic("*Por favor, elija una opción válida (1 al 4).👇*");
        return fallBack(); // Salir si la opción es inválida
    }

    // Guardar el profesional seleccionado en el estado
    await state.update({ profesional });

    // Continuar con el flujo de solicitud de turno
    return gotoFlow(flowTurno);
  }
);
