import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowOftalmologia } from "./flowOftalmologia";
import { flowOdontologia } from "./flowOdontologia";
import { flowPediatria } from "./flowPediatria";
import { flowUrologia } from "./flowUrologia";
import { flowNeurologia } from "./flowNeurologia";
import { flowPsicologia } from "./flowPsicologia";
import { flowNutricion } from "./flowNutricion";
import { flowOrtodoncia } from "./flowOrtodoncia";
import { flowTratDolor } from "./flowTratDolor";
import { flowEspecialidades } from "./flowEspecialidades";
import { flowPsiquiatria } from "./flowPsiquiatria";
import { flowNeumonologia } from "./flowNeumonologia";


export const flowVerMasEspecialidades = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Elija una especialidad de la siguiente lista *escribiendo el número correspondiente*: \n",
    "*16.-* NEUROLOGÍA",
    "*17.-* NEUMONOLOGÍA",
    "*18.-* NUTRICIÓN",
    "*19.-* ODONTOLOGÍA",
    "*20.-* OFTALMOLOGÍA",
    "*21.-* ORTODONCIA",
    "*22.-* PEDIATRÍA",
    "*23.-* PSICOLOGÍA Y PSICOPEDAGOGÍA",
    "*24.-* PSIQUIATRÍA",
    "*25.-* TRATAMIENTO DEL DOLOR",
    "*26.-* UROLOGÍA",
    "*27.-* *VOLVER A MENÚ ANTERIOR*",
  ],
  { capture: true, delay: 2000 },
  // Captura la respuesta del usuario
  async (ctx, { gotoFlow, flowDynamic, state, fallBack }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    const option = ctx.body;

    // Redirige al flujo correspondiente según la opción elegida
    switch (option) {
      case "16":
        await state.update({ especialidad: "NEUROLOGÍA" });
        return gotoFlow(flowNeurologia);
      case "17":
        await state.update({ especialidad: "NEUMONOLOGÍA" });
        return gotoFlow(flowNeumonologia);
      case "18":
        await state.update({ especialidad: "NUTRICIÓN" });
        return gotoFlow(flowNutricion);
      case "19":
        await state.update({ especialidad: "ODONTOLOGÍA" });
        return gotoFlow(flowOdontologia);
      case "20":
        await state.update({ especialidad: "OFTALMOLOGÍA" });
        return gotoFlow(flowOftalmologia);
      case "21":
        await state.update({ especialidad: "ORTODONCIA" });
        return gotoFlow(flowOrtodoncia);
      case "22":
        await state.update({ especialidad: "PEDIATRÍA" });
        return gotoFlow(flowPediatria);
      case "23":
        await state.update({ especialidad: "PSICOLOGÍA Y PSICOPEDAGOGÍA" });
        return gotoFlow(flowPsicologia);
      case "24":
        await state.update({ especialidad: "PSIQUIATRÍA" });
        return gotoFlow(flowPsiquiatria);
      case "25":
        await state.update({ especialidad: "TRATAMIENTO DEL DOLOR" });
        return gotoFlow(flowTratDolor);
      case "26":
        await state.update({ especialidad: "UROLOGÍA" });
        return gotoFlow(flowUrologia);
      case "27":
        return gotoFlow(flowEspecialidades); // Vuelve al flujo anterior
      default:
        // Manejo de opción inválida
        await flowDynamic("*Por favor, elija una opción válida (16 al 27).👇*");
        return fallBack();
    }
  }
);
