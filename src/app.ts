import {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  utils,
} from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";

// Importaciones de los flujos
import { flowPrincipal } from "./flows/flowPrincipal";
import { flowTurno } from "./flows/flowTurno";
import { flowCetro } from "./flows/flowCetro";
import { flowCirugia } from "./flows/flowCirugia";
import { flowOftalmologia } from "./flows/flowOftalmologia";
import { flowOdontologia } from "./flows/flowOdontologia";
import { flowPediatria } from "./flows/flowPediatria";
import { flowUrologia } from "./flows/flowUrologia";
import { flowNeurologia } from "./flows/flowNeurologia";
import { flowDermatologia } from "./flows/flowDermatologia";
import { flowPsicologia } from "./flows/flowPsicologia";
import { flowCardiologia } from "./flows/flowCardiologia";
import { flowEstetica } from "./flows/flowEstetica";
import { flowFlebologia } from "./flows/flowFlebologia";
import { flowFonoaudiologia } from "./flows/flowFonoaudiologia";
import { flowLaboratorio } from "./flows/flowLaboratorio";
import { flowClinicaMed } from "./flows/flowClinicaMed";
import { flowDiabetologia } from "./flows/flowDiabetologia";
import { flowDraSelmanSoledad } from "./flows/flowDraSelmanSoledad";
import { flowDrFloresFacundo } from "./flows/flowDrFloresFacundo";
import { flowEcografia } from "./flows/flowEcografia";
import { flowNutricion } from "./flows/flowNutricion";
import { flowOrtodoncia } from "./flows/flowOrtodoncia";
import { flowTratDolor } from "./flows/flowTratDolor";
import { flowGineObste } from "./flows/flowGineObste";
import { flowEspecialidades } from "./flows/flowEspecialidades";
import { flowVerMasEspecialidades } from "./flows/flowVerMasEspecialidades";
import { flowOtrasConsultas } from "./flows/flowOtrasConsultas";
import { flowPsiquiatria } from "./flows/flowPsiquiatria";
import { flowGastroenterologia } from "./flows/flowGastroenterologia";
import { flowHematologia } from "./flows/flowHematologia";
import { flowNeumonologia } from "./flows/flowNeumonologia";
import { flowDrCamachoMartin } from "./flows/flowDrCamachoMartin";
import { flowDraSotoRomina } from "./flows/flowDraSotoRomina";
import { flowDraMoralezAndrea } from "./flows/flowDraMoralezAndrea";
import { flowChequeoCompleto } from "./flows/flowChequeoCompleto";
import { flowChequeoGinecologico } from "./flows/flowChequeoGinecologico";
import { flowChoquetBarbara } from "./flows/flowChoquetBarbara";
import { flowSandovalNatalia } from "./flows/flowSandovalNatalia";
import { flowHermosillaEliana } from "./flows/flowHermosillaEliana";
import { flowDraBoveRomina } from "./flows/flowDraBoveRomina";
import { flowLicRodriguezLaura } from "./flows/flowLicRodriguezLaura";

const PORT = process.env.PORT ?? 3008;

const main = async () => {
  const adapterFlow = createFlow([
    flowPrincipal,
    flowTurno,
    flowCetro,
    flowCirugia,
    flowOftalmologia,
    flowOdontologia,
    flowPediatria,
    flowUrologia,
    flowNeurologia,
    flowDermatologia,
    flowPsicologia,
    flowCardiologia,
    flowEstetica,
    flowFlebologia,
    flowFonoaudiologia,
    flowLaboratorio,
    flowClinicaMed,
    flowDiabetologia,
    flowDraSelmanSoledad,
    flowDrFloresFacundo,
    flowEcografia,
    flowNutricion,
    flowOrtodoncia,
    flowTratDolor,
    flowGineObste,
    flowEspecialidades,
    flowVerMasEspecialidades,
    flowOtrasConsultas,
    flowPsiquiatria,
    flowGastroenterologia,
    flowHematologia,
    flowNeumonologia,
    flowDrCamachoMartin,
    flowDraSotoRomina,
    flowDraMoralezAndrea,
    flowChequeoCompleto,
    flowChequeoGinecologico,
    flowChoquetBarbara,
    flowSandovalNatalia,
    flowHermosillaEliana,
    flowDraBoveRomina,
    flowLicRodriguezLaura,
  ]);

  const adapterProvider = createProvider(Provider);
  const adapterDB = new Database();

  const { handleCtx, httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  adapterProvider.server.post(
    "/v1/messages",
    handleCtx(async (bot, req, res) => {
      const { number, message, urlMedia } = req.body;
      await bot.sendMessage(number, message, { media: urlMedia ?? null });
      return res.end("sended");
    })
  );

  adapterProvider.server.post(
    "/v1/register",
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body;
      await bot.dispatch("REGISTER_FLOW", { from: number, name });
      return res.end("trigger");
    })
  );

  adapterProvider.server.post(
    "/v1/samples",
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body;
      await bot.dispatch("SAMPLES", { from: number, name });
      return res.end("trigger");
    })
  );

  adapterProvider.server.post(
    "/v1/blacklist",
    handleCtx(async (bot, req, res) => {
      const { number, intent } = req.body;
      if (intent === "remove") bot.blacklist.remove(number);
      if (intent === "add") bot.blacklist.add(number);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ status: "ok", number, intent }));
    })
  );

  httpServer(+PORT);
};

main();
