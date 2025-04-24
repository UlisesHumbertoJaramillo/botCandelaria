import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowDespedida } from "./flowDespedida"; // Importar flowDespedida

export const flowFlebologia = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Para comunicarse con *Dr. ROMÁN Martín*, por favor comuníquese con el siguiente número:",
    "👉 *2995128383* - Dr. Román 👨‍⚕️",
  ],
  { delay: 1000 },
  async (_, { gotoFlow }) => {
    return gotoFlow(flowDespedida); // Redirigir al flujo flowDespedida
  }
);
