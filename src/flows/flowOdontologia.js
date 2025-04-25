import { addKeyword, EVENTS } from "@builderbot/bot";
import { logger } from "../services/logger/logger";
import { flowTurno } from "./flowTurno";
import { flowDrCamachoMartin } from "./flowDrCamachoMartin";
import { flowDraSotoRomina } from "./flowDraSotoRomina";
import { flowDraMoralezAndrea } from "./flowDraMoralezAndrea";

export const flowOdontologia = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "*Por favor*, escriba el número correspondiente al *profesional* que desea elegir:🦷",
    "*1.-* Od. ALVEAR Nicolás 👨‍⚕️",
    "*2.-* Od. CAMACHO IRAIZOZ Martin S. 👨‍⚕️",
    "*3.-* Od. ESQUIVEL María Cecilia (General y Prótesis) 👩‍⚕️",
    "*4.-* Od. FAVA María Josefina (General e Implantes) 👩‍⚕️",
    "*5.-* Od. CIFUENTES Mariela (General y Cirugía) 👩‍⚕️",
    "*6.-* Od. LEONELLI Pablo (Implantes y Prótesis) 👨‍⚕️",
    "*7.-* Od. MORA FLORES Julieta (General y Endodoncia) 👩‍⚕️",
    "*8.-* Od. MORALES  Andrea 👩‍⚕️",
    "*9.-* Od. NADORNI María Florencia (Ortodoncia y ortopedia maxilar / odontología general) 👩‍⚕️",
    "*10.-* Od. Od. ROJIDO Brenda 👩‍⚕️",
    "*11.-* Od. SERRAIOTTO M. Celeste (General y Ortodoncia) 👩‍⚕️",
    "*12.-* Od. SOTO Romina 👩‍⚕️",
    "*13.-* Od. URIBE Claudia (Integral y Estética) 👩‍⚕️",
    "*14.-* Od. VEGA Luciana (Implantes y Estética) 👩‍⚕️",
    "*15.-* Od. ZUÑIGA Marianela (General y Niños) 👩‍⚕️",
    "*16.-* Indistinto",
  ],
  { capture: true, delay: 2000 },
  async (ctx, { state, fallBack, flowDynamic, gotoFlow }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    const opciones = {
      1: "Od. Od. ALVEAR Nicolás",
      2: "Od. CAMACHO IRAIZOZ Martin S.",
      3: "Od. ESQUIVEL María Cecilia (General y Prótesis)",
      4: "Od. FAVA María Josefina (General e Implantes)",
      5: "Od. CIFUENTES Mariela (General y Cirugía)",
      6: "Od. LEONELLI Pablo (Implantes y Prótesis)",
      7: "Od. MORA FLORES Julieta (General y Endodoncia)",
      8: "Od. MORALEZ  Andrea",
      9: "Od. NADORNI María Florencia (Ortodoncia y ortopedia maxilar / odontología general)",
      10: "Od. Od. ROJIDO Brenda",
      11: "Od. SERRAIOTTO M. Celeste (General y Ortodoncia)",
      12: "Od. SOTO Romina",
      13: "Od. URIBE Claudia (Integral y Estética)",
      14: "Od. VEGA Luciana (Implantes y Estética)",
      15: "Od. ZUÑIGA Marianela (General y Niños)",
      16: "Indistinto",
    };

    const profesional = opciones[ctx.body];
    if (profesional) {
      await state.update({ profesional });
      if (profesional === "Od. CAMACHO IRAIZOZ Martin S.") {
        return gotoFlow(flowDrCamachoMartin);
      }
      if (profesional === "Od. SOTO Romina") {
        return gotoFlow(flowDraSotoRomina);
      }
      if (profesional === "Od. MORALEZ  Andrea") {
        return gotoFlow(flowDraMoralezAndrea);
      }
      return gotoFlow(flowTurno);
    } else {
      await flowDynamic("*Por favor, elija una opción válida (1 al 16).👇*");
      return fallBack();
    }
  }
);
