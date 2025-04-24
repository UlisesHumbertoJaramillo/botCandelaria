import { addKeyword, EVENTS } from "@builderbot/bot";
import { logger } from "../services/logger/logger";

import { flowCetro } from "./flowCetro";
import { flowCirugia } from "./flowCirugia";
import { flowDermatologia } from "./flowDermatologia";
import { flowCardiologia } from "./flowCardiologia";
import { flowEstetica } from "./flowEstetica";
import { flowFlebologia } from "./flowFlebologia";
import { flowFonoaudiologia } from "./flowFonoaudiologia";
import { flowLaboratorio } from "./flowLaboratorio";
import { flowClinicaMed } from "./flowClinicaMed";
import { flowDiabetologia } from "./flowDiabetologia";
import { flowEcografia } from "./flowEcografia";
import { flowGineObste } from "./flowGineObste";
import { flowHematologia } from "./flowHematologia";
import { flowGastroenterologia } from "./flowGastroenterologia";
import { flowVerMasEspecialidades } from "./flowVerMasEspecialidades";
import { flowChequeoCompleto } from "./flowChequeoCompleto";
import { flowChequeoGinecologico } from "./flowChequeoGinecologico";

export const flowEspecialidades = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Elija una especialidad de la siguiente lista *escribiendo el número correspondiente*: \n",
    "*1.-* CARDIOLOGÍA",
    "*2.-* CETRO",
    "*3.-* CHEQUEO GINECOLÓGICO",
    "*4.-* CHEQUEO MÉDICO",
    "*5.-* CIRUGÍA",
    "*6.-* CLÍNICA MÉDICA",
    "*7.-* DERMATOLOGÍA",
    "*8.-* DIABETES",
    "*9.-* ECOGRAFÍA",
    "*10.-* ESTÉTICA",
    "*11.-* FLEBOLOGÍA Y CIRUGÍA VASCULAR",
    "*12.-* FONOAUDIOLOGÍA",
    "*13.-* GASTROENTEROLOGÍA",
    "*14.-* GINECOLOGÍA Y OBSTETRICIA",
    "*15.-* HEMATOLOGÍA",
    "*16.-* LABORATORIO",
    "*17.-* *VER MÁS ESPECIALIDADES*",
  ],
  { capture: true, delay: 2000 }, // Captura la respuesta del usuario
  async (ctx, { gotoFlow, flowDynamic, state, fallBack }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    const option = ctx.body;
    // Guardar la especialidad seleccionada en el state
    switch (option) {
      case "1":
        await state.update({ especialidad: "CARDIOLOGÍA" });
        return gotoFlow(flowCardiologia);
      case "2":
        await state.update({ especialidad: "CETRO" });
        return gotoFlow(flowCetro);
      case "3":
        await state.update({ especialidad: "CHEQUEO MÉDICO" });
        return gotoFlow(flowChequeoGinecologico);
      case "4":
        await state.update({ especialidad: "CHEQUEO MÉDICO" });
        return gotoFlow(flowChequeoCompleto);
      case "5":
        await state.update({ especialidad: "CIRUGÍA" });
        return gotoFlow(flowCirugia);
      case "6":
        await state.update({ especialidad: "CLÍNICA MÉDICA" });
        return gotoFlow(flowClinicaMed);
      case "7":
        await state.update({ especialidad: "DERMATOLOGÍA" });
        return gotoFlow(flowDermatologia);
      case "8":
        await state.update({ especialidad: "DIABETES" });
        return gotoFlow(flowDiabetologia);
      case "9":
        await state.update({ especialidad: "ECOGRAFÍA" });
        return gotoFlow(flowEcografia);
      case "10":
        await state.update({ especialidad: "ESTÉTICA" });
        return gotoFlow(flowEstetica);
      case "11":
        await state.update({ especialidad: "FLEBOLOGÍA Y CIRUGÍA VASCULAR" });
        return gotoFlow(flowFlebologia);
      case "12":
        await state.update({ especialidad: "FONOAUDIOLOGÍA" });
        return gotoFlow(flowFonoaudiologia);
      case "13":
        await state.update({ especialidad: "GASTROENTEROLOGÍA" });
        return gotoFlow(flowGastroenterologia);
      case "14":
        await state.update({ especialidad: "GINECOLOGÍA Y OBSTETRICIA" });
        return gotoFlow(flowGineObste);
      case "15":
        await state.update({ especialidad: "HEMATOLOGÍA" });
        return gotoFlow(flowHematologia);
      case "16":
        await state.update({ especialidad: "LABORATORIO" });
        return gotoFlow(flowLaboratorio);
      case "17":
        return gotoFlow(flowVerMasEspecialidades);
      default:
        // Manejo de opción inválida
        await logger.warn(`Usuario seleccionó opción inválida: ${option}`);
        await flowDynamic("*Por favor, elija una opción válida (1 al 17).👇*");
        return fallBack();
    }
  }
);
