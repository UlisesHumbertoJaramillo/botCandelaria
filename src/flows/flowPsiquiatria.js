import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowTurno } from "./flowTurno";

export const flowPsiquiatria = addKeyword(EVENTS.ACTION).addAnswer(
  "Dra. ERDOZAIN Fabiana.",
  { delay: 1000 },
  async (_, { state, gotoFlow }) => {
    await state.update({
      profesional: " Dra. ERDOZAIN Fabiana.",
    });
    return gotoFlow(flowTurno);
  }
);
