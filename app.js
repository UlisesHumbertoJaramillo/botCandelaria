const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const logger = require("./services/logger/logger");

// Importaciones de los flujos
const { flowTurno } = require("./flows/flowTurno");
const { flowCetro } = require("./flows/flowCetro");
const { flowCirugia } = require("./flows/flowCirugia");
const { flowOftalmologia } = require("./flows/flowOftalmologia");
const { flowOdontologia } = require("./flows/flowOdontologia");
const { flowPediatria } = require("./flows/flowPediatria");
const { flowUrologia } = require("./flows/flowUrologia");
const { flowNeurologia } = require("./flows/flowNeurologia");
const { flowDermatologia } = require("./flows/flowDermatologia");
const { flowPsicologia } = require("./flows/flowPsicologia");
const { flowCardiologia } = require("./flows/flowCardiologia");
const { flowEstetica } = require("./flows/flowEstetica");
const { flowFlebologia } = require("./flows/flowFlebologia");
const { flowFonoaudiologia } = require("./flows/flowFonoaudiologia");
const { flowLaboratorio } = require("./flows/flowLaboratorio");
const { flowClinicaMed } = require("./flows/flowClinicaMed");
const { flowDiabetologia } = require("./flows/flowDiabetologia");
const { flowDraSelmanSoledad } = require("./flows/flowDraSelmanSoledad");
const { flowDrFloresFacundo } = require("./flows/flowDrFloresFacundo");
const { flowEcografia } = require("./flows/flowEcografia");
const { flowNutricion } = require("./flows/flowNutricion");
const { flowOrtodoncia } = require("./flows/flowOrtodoncia");
const { flowTratDolor } = require("./flows/flowTratDolor");
const { flowGineObste } = require("./flows/flowGineObste");
const { flowPrincipal } = require("./flows/flowPrincipal");
const { flowEspecialidades } = require("./flows/flowEspecialidades");
const {
  flowVerMasEspecialidades,
} = require("./flows/flowVerMasEspecialidades");
const { flowOtrasConsultas } = require("./flows/flowOtrasConsultas");
const { flowPsiquiatria } = require("./flows/flowPsiquiatria");
const { flowGastroenterologia } = require("./flows/flowGastroenterologia");
const { flowHematologia } = require("./flows/flowHematologia");
const { flowNeumonologia } = require("./flows/flowNeumonoogia");

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([
    flowPrincipal,
    flowEspecialidades,
    flowTurno,
    flowCetro,
    flowCirugia,
    flowClinicaMed,
    flowDermatologia,
    flowDiabetologia,
    flowDraSelmanSoledad,
    flowDrFloresFacundo,
    flowEcografia,
    flowEstetica,
    flowFlebologia,
    flowFonoaudiologia,
    flowGineObste,
    flowLaboratorio,
    flowNutricion,
    flowOftalmologia,
    flowOdontologia,
    flowOrtodoncia,
    flowPediatria,
    flowUrologia,
    flowNeurologia,
    flowDermatologia,
    flowPsicologia,
    flowCardiologia,
    flowTratDolor,
    flowOtrasConsultas,
    flowVerMasEspecialidades,
    flowPsiquiatria,
    flowGastroenterologia,
    flowHematologia,
    flowNeumonologia,
  ]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
  logger.info("Iniciando la aplicación...");
};

main();
