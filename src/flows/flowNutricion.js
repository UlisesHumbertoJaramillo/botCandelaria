import { addKeyword, EVENTS } from "@builderbot/bot";
import { logger } from "../services/logger/logger";
import { flowTurno } from "./flowTurno";
import { flowChoquetBarbara } from "./flowChoquetBarbara";
import { flowSandovalNatalia } from "./flowSandovalNatalia";

export const flowNutricion = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "*Por favor*, escriba el número correspondiente al *profesional* que desea elegir:",
    "*1.-* Lic. CHOQUET Barbara 👩‍⚕️",
    "*2.-* Lic. ENEI Agustina 👩‍⚕️",
    "*3.-* Lic. PIERINI Clara 👩‍⚕️",
    "*4.-* Lic. SANDOVAL Natalia 👩‍⚕️",
    "*5.-* Lic. TACCO Giuliana 👩‍⚕️",
    "*6.-* Lic. ZABALZA Gabriela 👩‍⚕️",
    "*7.-* Indistinto",
  ],
  { capture: true, delay: 1000 },
  async (ctx, { state, fallBack, flowDynamic, gotoFlow }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    const opciones = {
      1: "Lic. CHOQUET Barbara",
      2: "Lic. ENEI Agustina",
      3: "Lic. PIERINI Clara",
      4: "Lic. SANDOVAL Natalia",
      5: "Lic. TACCO Giuliana",
      6: "Lic. ZABALZA Gabriela",
      7: "Indistinto",
    };

    const professional = opciones[ctx.body];
    if (professional == "Lic. CHOQUET Barbara") {
      await state.update({ profesional: professional });
      return gotoFlow(flowChoquetBarbara);
    }
    if (professional == "Lic. SANDOVAL Natalia") {
      await state.update({ profesional: professional });
      return gotoFlow(flowSandovalNatalia);
    }
    if (profesional) {
      await state.update({ profesional: professional });
      return gotoFlow(flowTurno);
    } else {
      await flowDynamic("*Por favor, elija una opción válida (1 al 7).👇*");
      return fallBack();
    }
  }
);
