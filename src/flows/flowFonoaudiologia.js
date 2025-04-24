import { addKeyword, EVENTS } from "@builderbot/bot";
import { logger } from "../services/logger/logger";
import { flowTurno } from "./flowTurno";

export const flowFonoaudiologia = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "*Por favor*, escriba el *número* correspondiente al *profesional* que desea elegir:",
    "*1.-* Lic. ASTEASUAIN, M. Florencia.",
    "*2.-* Lic. MORENO Mónica",
    "*3.-* Indistinto",
  ],
  { capture: true, delay: 1000 },
  async (ctx, { state, fallBack, flowDynamic, gotoFlow }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    const option = ctx.body;

    switch (option) {
      case "1":
        await state.update({ profesional: "Lic. ASTEASUAIN, M. Florencia." });
        return gotoFlow(flowTurno);
      case "2":
        await state.update({ profesional: "Lic. MORENO Mónica" });
        await flowDynamic([
          "Se comunica que para solicitar un turno deberá realizar un pago por adelantado cuyo monto será indicado luego por una de nuestras **secretarias** 💬.",
          "Igualmente, le solicitaremos sus datos para ir avanzando con el proceso.",
        ]);
        return gotoFlow(flowTurno);
      case "3":
        await state.update({ profesional: "Indistinto" });
        return gotoFlow(flowTurno);
      default:
        await flowDynamic("*Por favor, elija una opción válida (1 al 3).👇*");
        return fallBack();
    }
  }
);
