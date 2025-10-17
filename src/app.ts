import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import multer from "multer";
import bodyParser from "body-parser";
import * as pg from "pg";
import { createServer } from "http";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";

import { initWhatsapp } from "./services/whatsapp";
require("dotenv").config();
const { Pool } = pg;

const corsOptions = {
  origin: "*",
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};

const corsMiddleware = cors(corsOptions);

/**PROUCCIÓN */
let cado = {};
if (process.env.NODE_ENV === "production") {
  console.log("NODE_ENV", process.env.NODE_ENV);
  global.path_url = "https://aco.agentedecargaonline.com/";
  cado = {
    host: "10.116.0.15",
    user: "postgres",
    password: "@Developer2021Pic",
    port: "5432",
    database: "db_op_main_01",
  };
} else {
  global.path_url = "https://devapigeneral.piccargo.com/";
  cado = {
    host: "143.244.169.120",
    user: "postgres",
    password: "@Developer2021Pic",
    port: "5432",
    database: "db_op_main_02",
  };
}
const pool = new Pool(cado);

const app: Application = express();

const httpServer: HTTPServer = createServer(app);
const io = new IOServer(httpServer);

app.use("/files", express.static(path.join(__dirname, "../files")));

import authRoutes from "./routes/auth";
import paisRoutes from "./routes/pais";
import PlanesRoutes from "./routes/planes";
import paymentRoutes from "./routes/payment";
import modulesRoutes from "./routes/modules";
import entitiesRoutes from "./routes/entities";
import documentsRoute from "./routes/documents";
import stateRoute from "./routes/state";
import cityRoute from "./routes/city";
import townRoute from "./routes/town";
import sexRoute from "./routes/sex";
import entitieRoleRoute from "./routes/role_entitie";
import modalityRoute from "./routes/modality";
import shipmentRoute from "./routes/shipment";
import portRoute from "./routes/port";
import incotermsRoute from "./routes/incoterms";
import itemsServicesRoute from "./routes/itemsServices";
import containersRoute from "./routes/containers";
import bitacoraListRoute from "./routes/bitacoraList";
import airlinesRoute from "./routes/airlines";
import motonaveRoute from "./routes/motonave";
import fleteConRoute from "./routes/fleteCon";
import coinsRoute from "./routes/coins";
import nroMasterRoute from "./routes/nroMaster";
import masterRoute from "./routes/master";
import masterContainersRoute from "./routes/master_containers";
import houseRoute from "./routes/house";
import nroHouseRoute from "./routes/nroHouse";
import begendRoute from "./routes/begend";
import servicesRoute from "./routes/services";
import bitacoraRoute from "./routes/bitacora";
import reportsRoute from "./routes/reports";
import roleRoute from "./routes/role";
import multiplicadorRoute from "./routes/multiplicador";
import ControlGastosRoute from "./routes/ControlGastos";
import pricingRoute from "./routes/pricing";
import depositoRoute from "./routes/deposito";
import enterpriseRoute from "./routes/enterprise";
import accountRoute from "./routes/account";
import banksRoute from "./routes/banks";
import filesRoute from "./routes/files";
import spaymentRoute from "./routes/spayment";
import versionRoute from "./routes/version";
import modulesPaysRoutes from "./routes/modulesPays";
import perfomanceRoutes from "./routes/perfomance";
import monthRoutes from "./routes/month";
import yearRoutes from "./routes/year";
import ProgrammedPaymentRoutes from "./routes/ProgrammedPaymentRoute";
import Calculadora from "./routes/calculadora";
import Factura from "./routes/factura";
import Invoice from "./routes/invoice";
import Consolidation from "./routes/consolidation";
import balance from "./routes/balance";
import proyeccion from "./routes/proyeccion";
import onedrive from "./routes/onedriver";
import masterusuario from "./routes/masterusuario";
import marketingRoutes from "./routes/marketing";
import typePhoneRoutes from "./routes/type_phone";
import groupservicesRoutes from "./routes/groupservices";
import transport from "./routes/transport";
import gasto from "./routes/gasto";
import ingreso from "./routes/ingreso";
import tipocostos from "./routes/tipocosto";
import comentariosRoute from "./routes/comentarios";
import stateQuote from "./routes/stateQuote";
import typepayments from "./routes/typepayments";
import users from "./routes/users";
import position from "./routes/position";
import configuracionInicial from "./routes/configuracionInicial";
import seguridad from "./routes/seguridad";
import config from "./routes/configEmpresa";
import StatusHouse from "./routes/StatusHouse";
import configAvisos from "./routes/configAvisos";
import branch from "./routes/branch";
import aduanas from "./routes/aduanas";
import whatsapp from "./routes/whatsapp";
import { env } from "process";

// settings
app.set("port", 9200);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static("files"));

app.use(bodyParser.json({ limit: "1000mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "1000mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

var ruta;
var type;
var size;
var fileName;
var newName;
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    let fecha = Date.now();
    fileName = file.originalname.split(".");
    type = fileName[fileName.length - 1];
    size = fileName.size;
    ruta = `${fecha}.${type}`;
    newName = `${fecha}.${type}`;
    callback(null, `${fecha}.${type}`);
  },
});

var uploads = multer({ storage: storage }).single("file");

app.post("/uploadAllPath", function (req, res) {
  uploads(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    let protocol = req.protocol; // 'http' o 'https'
    let host = req.get("host"); // El host (dominio o IP con puerto)
    let url = `${protocol}://${host}/uploads/`;
    pool.query(
      "select * from Table_AllPath_insertar($1,$2,$3,$4,$5,$6)",
      [newName, type, size, url + ruta, fileName[0], 1],
      (err, response, fields) => {
        if (!err) {
          let rows = response.rows;
          if (!!rows[0].estadoflag) {
            res.json({
              status: 200,
              statusBol: true,
              data: rows,
            });
          } else {
            res.json({
              status: 200,
              statusBol: true,
              mensaje: rows[0].mensaje,
            });
          }
        } else {
          console.log(err);
        }
      }
    );
  });
});

app.use("/uploads", express.static(path.resolve("uploads")));

const { graphqlHTTP } = require("express-graphql");
const { graphql, buildSchema } = require("graphql");

app.locals.itemsService = [];
app.locals.itemsdp = [];
app.locals.itemsdpa = [];
app.locals.itemsGroupService = [];
app.locals.itemsBitacoraList = [];
app.locals.itemsdeb = [];

app.locals.itemsHouse = [];
app.locals.itemsHouseService = [];
app.locals.itemsHouseMaster = [];
app.locals.itemsHouseMaster2 = [];
// routes
const schema = buildSchema(`
  type Query {
    message: String
  }
`);

const root = {
  message: () => "hello world",
};
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.use(authRoutes);
app.use(paisRoutes);
app.use(PlanesRoutes);
app.use(paymentRoutes);
app.use(modulesRoutes);
app.use(entitiesRoutes);
app.use(documentsRoute);
app.use(stateRoute);
app.use(cityRoute);
app.use(townRoute);
app.use(sexRoute);
app.use(entitieRoleRoute);
app.use(modalityRoute);
app.use(shipmentRoute);
app.use(portRoute);
app.use(incotermsRoute);
app.use(itemsServicesRoute);
app.use(containersRoute);
app.use(bitacoraListRoute);
app.use(airlinesRoute);
app.use(motonaveRoute);
app.use(fleteConRoute);
app.use(coinsRoute);
app.use(nroMasterRoute);
app.use(masterRoute);
app.use(masterContainersRoute);
app.use(houseRoute);
app.use(nroHouseRoute);
app.use(begendRoute);
app.use(servicesRoute);
app.use(bitacoraRoute);
app.use(reportsRoute);
app.use(roleRoute);
app.use(multiplicadorRoute);
app.use(ControlGastosRoute);
app.use(pricingRoute);
app.use(depositoRoute);
app.use(enterpriseRoute);
app.use(accountRoute);
app.use(banksRoute);
app.use(filesRoute);
app.use(spaymentRoute);
app.use(versionRoute);
app.use(modulesPaysRoutes);
app.use(perfomanceRoutes);
app.use(monthRoutes);
app.use(yearRoutes);
app.use(ProgrammedPaymentRoutes);
app.use(Calculadora);
app.use(Factura);
app.use(Invoice);
app.use(Consolidation);
app.use(balance);
app.use(proyeccion);
app.use(onedrive);
app.use(masterusuario);
app.use(marketingRoutes);
app.use(typePhoneRoutes);
app.use(groupservicesRoutes);
app.use(transport);
app.use(gasto);
app.use(ingreso);
app.use(tipocostos);
app.use(comentariosRoute);
app.use(stateQuote);
app.use(typepayments);
app.use(users);
app.use(position);
app.use(configuracionInicial);
app.use(seguridad);
app.use(config);
app.use(StatusHouse);
app.use(configAvisos);
app.use(branch);
app.use(aduanas);
app.use(whatsapp);

initWhatsapp(io);

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
export default app;
