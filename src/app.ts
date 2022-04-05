import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import multer from "multer";
import bodyParser from "body-parser";

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "157.230.14.98",
  user: "admin",
  password: "@Developer2021Pic",
  database: "db_op_main_01",
});
//con.connect();
const app: Application = express();

import authRoutes from "./routes/auth";
import paisRoutes from "./routes/pais";
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
import { addPath } from "graphql/jsutils/Path";
import filesRoute from "./routes/files";
import spaymentRoute from "./routes/spayment";
import { connect } from "routes/database";
import versionRoute from "./routes/version";
import modulesPaysRoutes from "./routes/modulesPays";
import perfomanceRoutes from "./routes/perfomance";

// settings
app.set("port", 9200);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static("files"));


app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true, parameterLimit: 1000000 }));

var ruta;
var type;
var size;
var fileName;
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
    ruta = file.originalname;
    fileName = file.originalname.split(".");
    type = fileName[fileName.length - 1];
    size = fileName.size;
  },
});

var upload = multer({ storage: storage }).single("file");

app.post("/uploadFilesSingle", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }

    console.log("Connected!");
    var sql =
      'INSERT INTO Table_Path (id_quote, name, type, size, path, status) VALUES ("' +
      req.body.id_quote +
      '","' +
      req.body.name +
      '","' +
      type +
      '","' +
      size +
      '","https://api-general.qreport.site/uploads/' +
      ruta +
      '","' +
      1 +
      '")';
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });

    res.json({
      status: 200,
      statusBol: true,
      data: {
        ruta: "https://api-general.qreport.site/uploads/" + ruta,
        name: ruta,
      },
    });
  });
});

var uploads = multer({ storage: storage }).single("file");

app.post("/uploadAllPath", function (req, res) {
  uploads(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }

    console.log("Connected!");
    var sql =
      'INSERT INTO Table_AllPath (originalname, type, size, path, name, hash, status) VALUES ("' +
      fileName +
      '","' +
      type +
      '","' +
      size +
      '","https://api-general.qreport.site/uploads/' +
      ruta +
      '","' +
      req.body.name +
      '",MD5("https://api-general.qreport.site/uploads/' +
      ruta +
      '"),"' +
      req.body.status +
      '")';
    con.query(sql, function (err, result: any) {
      if (err) throw err;
      console.log("1 record inserted");
      res.json({
        status: 200,
        statusBol: true,
        data: {
          ruta: "https://api-general.qreport.site/uploads/" + ruta,
          name: ruta,
          data: result,
        },
      });
    });
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

export default app;
