import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowTurno } from "./flowTurno";

export const flowDiabetologia = addKeyword(EVENTS.ACTION).addAnswer(
  "Dra. BENINI Romina (Diabetología) 🩺.",
  { delay: 1000 },
  async (_, { state, gotoFlow }) => {
    await state.update({ profesional: "Dra. BENINI Romina (Diabetología)" });
    return gotoFlow(flowTurno);
  }
);
