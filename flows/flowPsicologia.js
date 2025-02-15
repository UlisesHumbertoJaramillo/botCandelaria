const { addKeyword } = require("@bot-whatsapp/bot");
const { flowTurno } = require("./flowTurno");
const { EVENTS } = require("@bot-whatsapp/bot");
const logger = require("../services/logger/logger");

const flowPsicologia = addKeyword(EVENTS.ACTION)
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
      "*7.-* Lic. MOKOREL Gabriela (Niños y Adultos)",
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
        1: "Lic. DE IRAOLA M. Ximena (Adultos)",
        2: "Lic. DEYURKA Anabela (Niños)",
        3: "Lic. GAMARRA Julieta (Psicología Deportiva)",
        4: "Lic. HERMOSILLA Eliana (Adolescentes, Adultos)",
        5: "Lic. JACOBO Julieta (Psicología Deportiva y Clínica)",
        6: "Lic. MOKOREL Gabriela (Niños y Adultos)",
        7: "Lic. NARDONI Ana Belén (Psicopedagogía)",
        8: "Lic. ORDOÑEZ Miriam D.",
        9: "Lic. PATO Federico",
        10: "Lic. RODRIGUEZ Laura",
        11: "Indistinto",
      };

      const professional = professionals[option];

      if (professional) {
        await state.update({ profesional: professional });
        return gotoFlow(flowTurno);
      }

      await flowDynamic("*Por favor, elija una opción válida (1 al 11).👇*");
      return fallBack();
    }
  );

module.exports = { flowPsicologia };
