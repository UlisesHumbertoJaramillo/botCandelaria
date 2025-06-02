import { addKeyword, EVENTS } from "@builderbot/bot";
import { logger } from "../services/logger/logger";
import { flowTurno } from "./flowTurno";
import { flowDraSotoRomina } from "./flowDraSotoRomina";
import { flowDraMoralesAndrea } from "./flowDraMoralesAndrea";

export const flowOrtodoncia = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "*Por favor*, escriba el número correspondiente al *profesional* que desea elegir: 🦷",
    "*1.-* Od. FITTIPALDI Patricia (Ortodoncia y Estética) 👩‍⚕️",
    "*2.-* Od. MORALES Andrea J. (Esp. Ortodoncia y Ortopedia Maxilar) 👩‍⚕️",
    "*3.-* Od. SOTO Romina (Esp. Ortodoncia y Ortopedia) 👩‍⚕️",
    "*4.-* Od. VITALE Pablo (Ortodoncia y ATM) 👨‍⚕️",
    "*5.-* Indistinto",
  ],
  { capture: true, delay: 1000 },
  async (ctx, { state, fallBack, flowDynamic, gotoFlow }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    const opciones = {
      1: "Od. FITTIPALDI Patricia (Ortodoncia y Estética)",
      2: "Od. MORALES Andrea J. (Esp. Ortodoncia y Ortopedia Maxilar)",
      3: "Od. SOTO Romina (Esp. Ortodoncia y Ortopedia)",
      4: "Od. VITALE Pablo (Ortodoncia y ATM)",
      5: "Indistinto",
    };

    const profesional = opciones[ctx.body];

    if (profesional === "Od. SOTO Romina (Esp. Ortodoncia y Ortopedia)") {
      return gotoFlow(flowDraSotoRomina);
    }

    if (
      profesional ===
      "Od. MORALES Andrea J. (Esp. Ortodoncia y Ortopedia Maxilar)"
    ) {
      await state.update({
        profesional:
          "Od. MORALES Andrea J. (Esp. Ortodoncia y Ortopedia Maxilar)",
      });
      return gotoFlow(flowDraMoralesAndrea);
    }

    if (profesional) {
      await state.update({ profesional });
      return gotoFlow(flowTurno);
    } else {
      await flowDynamic("*Por favor, elija una opción válida (1 al 4).👇*");
      return fallBack();
    }
  }
);
