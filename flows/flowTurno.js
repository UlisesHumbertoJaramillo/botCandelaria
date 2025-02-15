const { addKeyword } = require("@bot-whatsapp/bot");
const { EVENTS } = require("@bot-whatsapp/bot");
const { writeToSheet } = require("../services/googleSheets/googleSheets");
const {
  getCurrentDateTime,
  getCurrentDateTimeSheets,
} = require("../services/utils/time");
const { flowDespedida } = require("./flowDespedida");
const logger = require("../services/logger/logger");

const flowTurno = addKeyword(EVENTS.ACTION)
  .addAnswer(
    [
      "A continuación le solicitaremos información personal para comenzar la gestión del turno. 📝",
    ],
    { delay: 1000 },
    null,
    []
  )
  .addAnswer(
    "Dígame su *nombre y Apellido Completo*, por favor. 🧑‍💼",
    { capture: true, delay: 1000 },
    async (ctx, { state }) => {
      await logger.info(`Usuario ${ctx.from} su nombre es: ${ctx.body}`);
      await state.update({ nombreCompleto: ctx.body });
    }
  )
  .addAnswer(
    "Dígame su *DNI*, por favor. 🆔",
    { capture: true, delay: 1000 },
    async (ctx, { state }) => {
      await logger.info(`Usuario ${ctx.from} su DNI: ${ctx.body}`);
      const dni = ctx.body.trim(); // Eliminar espacios en blanco
      await state.update({ dni });
    }
  )
  .addAnswer(
    "Dígame su *obra social*, por favor: 💳",
    { capture: true, delay: 1000 },
    async (ctx, { state }) => {
      await logger.info(`Usuario ${ctx.from} su OS: ${ctx.body}`);
      await state.update({ ooss: ctx.body });
    }
  )
  .addAnswer(
    "Dígame su *Preferencia horaria*, por favor: ⏰",
    { capture: true, delay: 1000 },
    async (ctx, { flowDynamic, state, gotoFlow }) => {
      await logger.info(`Usuario ${ctx.from} su Pref. horaria: ${ctx.body}`);
      await state.update({ preferenciaHoraria: ctx.body });
      const myState = await state.getMyState();
      /*
    try {
      // Grabar en el sheet
      await writeToSheet([
        [
          ctx.from,
          myState.nombreCompleto,
          myState.dni,
          myState.ooss,
          myState.especialidad,
          myState.profesional,
          myState.preferenciaHoraria,
          getCurrentDateTime(),
          getCurrentDateTimeSheets(),
        ],
      ]);
      logger.info(`Usuario ${ctx.from} Grabó en el Sheet.`);
    } catch (error) {
      logger.error(`Usuario ${ctx.from} Error al grabar en el Sheet: ${error}`);
    }
*/
      // Confirmación de que los datos fueron registrados
      await flowDynamic(
        "**SOLICITUD DE TURNO** \n\n" +
          `Nombre: *${myState.nombreCompleto}*\n` +
          `DNI: *${myState.dni}*\n` +
          `Obra Social: *${myState.ooss}*\n` +
          `Consulta: *${myState.especialidad}*\n` +
          `Profesional: *${myState.profesional}*\n` +
          `Horario: *${myState.preferenciaHoraria}*`
      );
      await flowDynamic(
        "Proximamente, una de nuestras secretarias procesará su solicitud y se comunicará con usted. 💁💻📝"
      );
      return gotoFlow(flowDespedida);
    }
  );

module.exports = { flowTurno };
