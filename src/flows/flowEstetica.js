import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowDespedida } from "./flowDespedida"; // Importar flowDespedida

export const flowEstetica = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Para solicitar turnos en la especialidad estética, puede comunicarse con los siguientes números:",
    "👉 *+5491176347751* - Dr. Gustavo Silva 👨‍⚕️",
    "👉 *2994089145* - Dr. Paillacar 👨‍⚕️",
    "👉 *2995940153* - Ortepal 👨‍⚕️",
    "👉 *2995182826* - LPEquipos 📱",
  ],
  { delay: 1000 },
  async (_, { gotoFlow }) => {
    return gotoFlow(flowDespedida); // Redirigir al flujo flowDespedida
  }
);
