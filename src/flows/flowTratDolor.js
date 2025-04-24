import { addKeyword,EVENTS} from "@builderbot/bot"
import {logger} from "../services/logger/logger";
import { flowTurno } from "./flowTurno";

export const flowTratDolor = addKeyword(EVENTS.ACTION).addAnswer(
  "*Dr. BRAVO Daniel* (tratamiento del dolor articular).",
  { delay: 1000 },
  async (_, { state, gotoFlow }) => {
    await state.update({
      profesional: "Dr. BRAVO Daniel",
    });
    return gotoFlow(flowTurno);
  }
);
