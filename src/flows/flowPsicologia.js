import { addKeyword, EVENTS } from "@builderbot/bot";
import { logger } from "../services/logger/logger";
import { flowTurno } from "./flowTurno";
import { flowHermosillaEliana } from "./flowHermosillaEliana";
import { flowDraBoveRomina } from "./flowDraBoveRomina";
import { flowLicRodriguezLaura } from "./flowLicRodriguezLaura";

export const flowPsicologia = addKeyword(EVENTS.ACTION)
  .addAnswer(
    "*Por favor*, escriba el número correspondiente al *profesional* que desea elegir:"
  )
  .addAnswer(
    [
      "*1.-* Lic. BOVE Romina",
      "*2.-* Lic. DE IRAOLA M. Ximena (Adultos)",
      "*3.-* Lic. DEYURKA Anabela (Niños)",
      "*4.-* Lic. GAMARRA Julieta (Psicología Deportiva)",
      "*5.-* Lic. HERMOSILLA Eliana (Adolescentes, Adultos)",
      "*6.-* Lic. JACOBO Julieta (Psicología Deportiva y Clínica)",
      "*7.-* Lic. MOKOREL Gabriela (Adultos)",
      "*8.-* Lic. NARDONI Ana Belén (Psicopedagogía)",
      "*9.-* Lic. ORDOÑEZ Miriam D.",
      "*10.-* Lic. PATO Federico",
      "*11.-* Lic. RODRIGUEZ Laura",
      "*12.-* Indistinto",
    ],
    { capture: true, delay: 2000 },
    async (ctx, { flowDynamic, fallBack, state, gotoFlow }) => {
      await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
      const option = ctx.body;

      const professionals = {
        1: "Lic. BOVE Romina",
        2: "Lic. DE IRAOLA M. Ximena (Adultos)",
        3: "Lic. DEYURKA Anabela (Niños)",
        4: "Lic. GAMARRA Julieta (Psicología Deportiva)",
        5: "Lic. HERMOSILLA Eliana (Adolescentes, Adultos)",
        6: "Lic. JACOBO Julieta (Psicología Deportiva y Clínica)",
        7: "Lic. MOKOREL Gabriela (Adultos)",
        8: "Lic. NARDONI Ana Belén (Psicopedagogía)",
        9: "Lic. ORDOÑEZ Miriam D.",
        10: "Lic. PATO Federico",
        11: "Lic. RODRIGUEZ Laura",
        12: "Indistinto",
      };

      const professional = professionals[option];

      if (professional == "Lic. BOVE Romina") {
        return gotoFlow(flowDraBoveRomina);
      }

      if (professional == "Lic. HERMOSILLA Eliana (Adolescentes, Adultos)") {
        return gotoFlow(flowHermosillaEliana);
      }

      if (professional == "Lic. RODRIGUEZ Laura") {
        return gotoFlow(flowLicRodriguezLaura);
      }

      if (professional) {
        await state.update({ profesional: professional });
        return gotoFlow(flowTurno);
      }

      await flowDynamic("*Por favor, elija una opción válida (1 al 12).👇*");
      return fallBack();
    }
  );
