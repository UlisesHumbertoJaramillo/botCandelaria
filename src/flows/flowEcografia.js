import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowTurno } from "./flowTurno";

export const flowEcografia = addKeyword(EVENTS.ACTION)
  .addAnswer(
    "*Por favor*, escriba el número correspondiente al *profesional* que desea elegir:",
    {
      delay: 1000,
    }
  )
  .addAnswer(
    ["*1.* Dr. PUGLIESE Carlos. 👨‍⚕️", "*2.* Dra. PUGLIESE Paula. 👩‍⚕️"],
    { capture: true, delay: 1000 },
    async (ctx, { state, fallBack, flowDynamic, gotoFlow }) => {
      await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
      // Mapeo de las opciones de los profesionales
      const opciones = {
        1: "Dr. PUGLIESE Carlos.",
        2: "Dra. PUGLIESE Paula.",
      };

      // Recupera la elección del usuario
      const eleccion = opciones[ctx.body];

      if (eleccion) {
        // Guarda la elección del profesional en el estado
        await state.update({ profesional: eleccion });
      } else {
        // Manejo de opciones inválidas: vuelve a preguntar al usuario
        await flowDynamic("*Por favor, elija una opción válida (1 o 2).👇*");
        return fallBack(); // Reinicia el flujo actual
      }
    }
  )
  .addAnswer(["*Por favor*, envíe una foto de la orden médica 📸."], {
    capture: true,
    delay: 1000,
  })
  .addAnswer(
    [
      "Se comunica que para solicitar un turno deberá abonar un *coseguro* cuyo valor será indicado posteriormente por el Área de secretaría 🗣️.",
    ],
    { capture: false, delay: 1000 },
    async (_, { gotoFlow }) => {
      // Redirigir al flowTurno
      return gotoFlow(flowTurno);
    }
  );
