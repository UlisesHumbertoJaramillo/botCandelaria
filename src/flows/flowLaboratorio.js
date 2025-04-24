import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowDespedida } from "./flowDespedida"; // Importar flowDespedida

export const flowLaboratorio = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Laboratorio de Análisis clínicos de Dr. Roberto Raña. Para *consultas e indicaciones* por favor comunicarse al siguiente número de teléfono: 📞 *2995975077*",
    "dentro del horario de atención de *8 a 14hs. Para extracciones de 8 a 11:30hs por orden de llegada*.",
  ],
  { delay: 1000 },
  (_, { gotoFlow }) => {
    return gotoFlow(flowDespedida); // Redirigir al flujo flowDespedida
  }
);
