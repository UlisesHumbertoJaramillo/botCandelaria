const { addKeyword } = require("@bot-whatsapp/bot");
const { EVENTS } = require("@bot-whatsapp/bot");

const { flowCetro } = require("./flowCetro");
const { flowCirugia } = require("./flowCirugia");
const { flowDermatologia } = require("./flowDermatologia");
const { flowCardiologia } = require("./flowCardiologia");
const { flowEstetica } = require("./flowEstetica");
const { flowFlebologia } = require("./flowFlebologia");
const { flowFonoaudiologia } = require("./flowFonoaudiologia");
const { flowLaboratorio } = require("./flowLaboratorio");
const { flowClinicaMed } = require("./flowClinicaMed");
const { flowDiabetologia } = require("./flowDiabetologia");
const { flowEcografia } = require("./flowEcografia");
const { flowGineObste } = require("./flowGineObste");
const logger = require("../services/logger/logger");
const { flowHematologia } = require("./flowHematologia");
const { flowGastroenterologia } = require("./flowGastroenterologia");

const flowEspecialidades = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Elija una especialidad de la siguiente lista *escribiendo el número correspondiente*: \n",
    "*1.-* CARDIOLOGÍA",
    "*2.-* CETRO",
    "*3.-* CIRUGÍA",
    "*4.-* CLÍNICA MÉDICA",
    "*5.-* DERMATOLOGÍA",
    "*6.-* DIABETES",
    "*7.-* ECOGRAFÍA",
    "*8.-* ESTÉTICA",
    "*9.-* FLEBOLOGÍA Y CIRUGÍA VASCULAR",
    "*10.-* FONOAUDIOLOGÍA",
    "*11.-* GASTROENTEROLOGÍA",
    "*12.-* GINECOLOGÍA Y OBSTETRICIA",
    "*13.-* HEMATOLOGÍA",
    "*14.-* LABORATORIO",
    "*15.-* VER MÁS ESPECIALIDADES",
  ],
  { capture: true, delay: 2000 }, // Captura la respuesta del usuario
  async (ctx, { gotoFlow, flowDynamic, state, fallBack }) => {
    await logger.info(`Usuario ${ctx.from} seleccionó la opción ${ctx.body}`);
    const option = ctx.body;
    // Guardar la especialidad seleccionada en el state
    switch (option) {
      case "1":
        await state.update({ especialidad: "CARDIOLOGÍA" });
        return gotoFlow(flowCardiologia);
      case "2":
        await state.update({ especialidad: "CETRO" });
        return gotoFlow(flowCetro);
      case "3":
        await state.update({ especialidad: "CIRUGÍA" });
        return gotoFlow(flowCirugia);
      case "4":
        await state.update({ especialidad: "CLÍNICA MÉDICA" });
        return gotoFlow(flowClinicaMed);
      case "5":
        await state.update({ especialidad: "DERMATOLOGÍA" });
        return gotoFlow(flowDermatologia);
      case "6":
        await state.update({ especialidad: "DIABETES" });
        return gotoFlow(flowDiabetologia);
      case "7":
        await state.update({ especialidad: "ECOGRAFÍA" });
        return gotoFlow(flowEcografia);
      case "8":
        await state.update({ especialidad: "ESTÉTICA" });
        return gotoFlow(flowEstetica);
      case "9":
        await state.update({ especialidad: "FLEBOLOGÍA Y CIRUGÍA VASCULAR" });
        return gotoFlow(flowFlebologia);
      case "10":
        await state.update({ especialidad: "FONOAUDIOLOGÍA" });
        return gotoFlow(flowFonoaudiologia);
      case "11":
        await state.update({ especialidad: "GASTROENTEROLOGÍA" });
        return gotoFlow(flowGastroenterologia);
      case "12":
        await state.update({ especialidad: "GINECOLOGÍA Y OBSTETRICIA" });
        return gotoFlow(flowGineObste);
      case "13":
        await state.update({ especialidad: "HEMATOLOGÍA" });
        return gotoFlow(flowHematologia);
      case "14":
        await state.update({ especialidad: "LABORATORIO" });
        return gotoFlow(flowLaboratorio);
      case "15":
        const {
          flowVerMasEspecialidades,
        } = require("./flowVerMasEspecialidades");
        return gotoFlow(flowVerMasEspecialidades);
      default:
        // Manejo de opción inválida
        await logger.warn(`Usuario seleccionó opción inválida: ${option}`);
        await flowDynamic("*Por favor, elija una opción válida (1 al 14).👇*");
        return fallBack();
    }
  }
);

module.exports = { flowEspecialidades };
