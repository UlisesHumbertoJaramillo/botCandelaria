import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowTurno } from "./flowTurno";

export const flowNeumonologia = addKeyword(EVENTS.ACTION).addAnswer(
  "Dr. LAVACCARA Damián",
  { delay: 1000 },
  async (_, { state, gotoFlow }) => {
    await state.update({
      profesional: " Dr. LAVACCARA Damián",
    });
    return gotoFlow(flowTurno);
  }
);
