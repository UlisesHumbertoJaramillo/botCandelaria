const { addKeyword } = require("@bot-whatsapp/bot");
const { EVENTS } = require("@bot-whatsapp/bot");
const logger = require("../services/logger/logger");
const { flowOftalmologia } = require("./flowOftalmologia");
const { flowOdontologia } = require("./flowOdontologia");
const { flowPediatria } = require("./flowPediatria");
const { flowUrologia } = require("./flowUrologia");
const { flowNeurologia } = require("./flowNeurologia");
const { flowPsicologia } = require("./flowPsicologia");
const { flowNutricion } = require("./flowNutricion");
const { flowOrtodoncia } = require("./flowOrtodoncia");
const { flowTratDolor } = require("./flowTratDolor");
const { flowEspecialidades } = require("./flowEspecialidades");
const { flowPsiquiatria } = require("./flowPsiquiatria");
const { flowNeumonologia } = require("./flowNeumonoogia");

const flowVerMasEspecialidades = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Elija una especialidad de la siguiente lista *escribiendo el número correspondiente*: \n",
    "*16.-* NEUROLOGÍA",
    "*17.-* NEUMONOLOGÍA",
    "*18.-* NUTRICIÓN",
    "*19.-* ODONTOLOGÍA",
    "*20.-* OFTALMOLOGÍA",
    "*21.-* ORTODONCIA",
    "*22.-* PEDIATRÍA",
    "*23.-* PSICOLOGÍA Y PSICOPEDAGOGÍA",
    "*24.-* PSIQUIATRÍA",
    "*25.-* TRATAMIENTO DEL DOLOR",
    "*26.-* UROLOGÍA",
    "*27.-* VOLVER A EMPEZAR",
  ],
  { capture: true, delay: 2000 },
  // Captura la respuesta del usuario
  async (ctx, { gotoFlow, flowDynamic, state, fallBack }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    const option = ctx.body;

    // Redirige al flujo correspondiente según la opción elegida
    switch (option) {
      case "16":
        await state.update({ especialidad: "NEUROLOGÍA" });
        return gotoFlow(flowNeurologia);
      case "17":
        await state.update({ especialidad: "NEUMONOLOGÍA" });
        return gotoFlow(flowNeumonologia);
      case "18":
        await state.update({ especialidad: "NUTRICIÓN" });
        return gotoFlow(flowNutricion);
      case "19":
        await state.update({ especialidad: "ODONTOLOGÍA" });
        return gotoFlow(flowOdontologia);
      case "20":
        await state.update({ especialidad: "OFTALMOLOGÍA" });
        return gotoFlow(flowOftalmologia);
      case "21":
        await state.update({ especialidad: "ORTODONCIA" });
        return gotoFlow(flowOrtodoncia);
      case "22":
        await state.update({ especialidad: "PEDIATRÍA" });
        return gotoFlow(flowPediatria);
      case "23":
        await state.update({ especialidad: "PSICOLOGÍA Y PSICOPEDAGOGÍA" });
        return gotoFlow(flowPsicologia);
      case "24":
        await state.update({ especialidad: "PSIQUIATRÍA" });
        return gotoFlow(flowPsiquiatria);
      case "25":
        await state.update({ especialidad: "TRATAMIENTO DEL DOLOR" });
        return gotoFlow(flowTratDolor);
      case "26":
        await state.update({ especialidad: "UROLOGÍA" });
        return gotoFlow(flowUrologia);
      case "27":
        return gotoFlow(flowEspecialidades); // Vuelve al flujo anterior
      default:
        // Manejo de opción inválida
        await flowDynamic("*Por favor, elija una opción válida (16 al 27).👇*");
        return fallBack();
    }
  }
);

module.exports = { flowVerMasEspecialidades };
