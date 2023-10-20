"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
const pg = __importStar(require("pg"));
require("dotenv").config();
const { Pool } = pg;
const corsOptions = {
    origin: "*",
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization",
};
const corsMiddleware = (0, cors_1.default)(corsOptions);
if (process.env.ENV === "development") {
    console.log('development');
}
else if (process.env.ENV === "production") {
    console.log('production');
}
/**PROUCCIÓN */
// const pool = new Pool({
//   host: "10.116.0.2",
//   // host: "157.230.14.98",//// remoto
//   user: "postgres",
//   password: "@Developer2021Pic",
//   port: "5432",
//   database: "db_op_main_01",
// });
/** DESARROLLO */
// Cache de opciones de cors
const pool = new Pool({
    host: "67.205.129.62",
    user: "chainsolver",
    password: "Fr3sc0l1t4+",
    port: "5432",
    // database: "db_op_main_dev",
    // database: "db_op_main_01",
    database: "db_op_main_qa",
});
const app = (0, express_1.default)();
const auth_1 = __importDefault(require("./routes/auth"));
const pais_1 = __importDefault(require("./routes/pais"));
const modules_1 = __importDefault(require("./routes/modules"));
const entities_1 = __importDefault(require("./routes/entities"));
const documents_1 = __importDefault(require("./routes/documents"));
const state_1 = __importDefault(require("./routes/state"));
const city_1 = __importDefault(require("./routes/city"));
const town_1 = __importDefault(require("./routes/town"));
const sex_1 = __importDefault(require("./routes/sex"));
const role_entitie_1 = __importDefault(require("./routes/role_entitie"));
const modality_1 = __importDefault(require("./routes/modality"));
const shipment_1 = __importDefault(require("./routes/shipment"));
const port_1 = __importDefault(require("./routes/port"));
const incoterms_1 = __importDefault(require("./routes/incoterms"));
const itemsServices_1 = __importDefault(require("./routes/itemsServices"));
const containers_1 = __importDefault(require("./routes/containers"));
const bitacoraList_1 = __importDefault(require("./routes/bitacoraList"));
const airlines_1 = __importDefault(require("./routes/airlines"));
const motonave_1 = __importDefault(require("./routes/motonave"));
const fleteCon_1 = __importDefault(require("./routes/fleteCon"));
const coins_1 = __importDefault(require("./routes/coins"));
const nroMaster_1 = __importDefault(require("./routes/nroMaster"));
const master_1 = __importDefault(require("./routes/master"));
const master_containers_1 = __importDefault(require("./routes/master_containers"));
const house_1 = __importDefault(require("./routes/house"));
const nroHouse_1 = __importDefault(require("./routes/nroHouse"));
const begend_1 = __importDefault(require("./routes/begend"));
const services_1 = __importDefault(require("./routes/services"));
const bitacora_1 = __importDefault(require("./routes/bitacora"));
const reports_1 = __importDefault(require("./routes/reports"));
const role_1 = __importDefault(require("./routes/role"));
const multiplicador_1 = __importDefault(require("./routes/multiplicador"));
const ControlGastos_1 = __importDefault(require("./routes/ControlGastos"));
const pricing_1 = __importDefault(require("./routes/pricing"));
const deposito_1 = __importDefault(require("./routes/deposito"));
const enterprise_1 = __importDefault(require("./routes/enterprise"));
const account_1 = __importDefault(require("./routes/account"));
const banks_1 = __importDefault(require("./routes/banks"));
const files_1 = __importDefault(require("./routes/files"));
const spayment_1 = __importDefault(require("./routes/spayment"));
const version_1 = __importDefault(require("./routes/version"));
const modulesPays_1 = __importDefault(require("./routes/modulesPays"));
const perfomance_1 = __importDefault(require("./routes/perfomance"));
const month_1 = __importDefault(require("./routes/month"));
const year_1 = __importDefault(require("./routes/year"));
const ProgrammedPaymentRoute_1 = __importDefault(require("./routes/ProgrammedPaymentRoute"));
const calculadora_1 = __importDefault(require("./routes/calculadora"));
const factura_1 = __importDefault(require("./routes/factura"));
const invoice_1 = __importDefault(require("./routes/invoice"));
const consolidation_1 = __importDefault(require("./routes/consolidation"));
const balance_1 = __importDefault(require("./routes/balance"));
const proyeccion_1 = __importDefault(require("./routes/proyeccion"));
const onedriver_1 = __importDefault(require("./routes/onedriver"));
const masterusuario_1 = __importDefault(require("./routes/masterusuario"));
const marketing_1 = __importDefault(require("./routes/marketing"));
const type_phone_1 = __importDefault(require("./routes/type_phone"));
const groupservices_1 = __importDefault(require("./routes/groupservices"));
const transport_1 = __importDefault(require("./routes/transport"));
const gasto_1 = __importDefault(require("./routes/gasto"));
// settings
app.set("port", 9200);
// middlewares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use(express_1.default.static("files"));
app.use(body_parser_1.default.json({ limit: "1000mb" }));
app.use(body_parser_1.default.urlencoded({
    limit: "1000mb",
    extended: true,
    parameterLimit: 1000000,
}));
var ruta;
var type;
var size;
var fileName;
var newName;
var storage = multer_1.default.diskStorage({
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
var upload = (0, multer_1.default)({ storage: storage }).single("file");
// app.post("/uploadFilesSingle", function (req, res) {
//   upload(req, res, function (err) {
//     if (err) {
//       return res.end("Error uploading file.");
//     }
//     pool.query(
//       "select * from Table_Path_insertar_q($1,$2,$3,null,$4)",
//       [req.body.id_quote, req.body.name, type, ruta],
//       (err, response, fields) => {
//         if (!err) {
//           let rows = response.rows;
//           if (!!rows[0].estadoflag) {
//             res.json({
//               status: 200,
//               statusBol: true,
//               data: {
//                 ruta: "https://api-general.qreport.site/uploads/" + ruta,
//                 name: ruta,
//               },
//             });
//           } else {
//             res.json({
//               status: 200,
//               statusBol: true,
//               mensaje: rows[0].mensaje,
//             });
//           }
//         } else {
//           console.log(err);
//         }
//       }
//     );
//   });
// });
var uploads = (0, multer_1.default)({ storage: storage }).single("file");
app.post("/uploadAllPath", function (req, res) {
    uploads(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        pool.query("select * from Table_AllPath_insertar($1,$2,$3,$4,$5,$6 )", [newName, type, size, process.env.RUTA_FILE + ruta, fileName[0], 1], (err, response, fields) => {
            if (!err) {
                let rows = response.rows;
                if (!!rows[0].estadoflag) {
                    res.json({
                        status: 200,
                        statusBol: true,
                        data: rows,
                    });
                }
                else {
                    res.json({
                        status: 200,
                        statusBol: true,
                        mensaje: rows[0].mensaje,
                    });
                }
            }
            else {
                console.log(err);
            }
        });
    });
});
app.use("/uploads", express_1.default.static(path_1.default.resolve("uploads")));
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
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.use(auth_1.default);
app.use(pais_1.default);
app.use(modules_1.default);
app.use(entities_1.default);
app.use(documents_1.default);
app.use(state_1.default);
app.use(city_1.default);
app.use(town_1.default);
app.use(sex_1.default);
app.use(role_entitie_1.default);
app.use(modality_1.default);
app.use(shipment_1.default);
app.use(port_1.default);
app.use(incoterms_1.default);
app.use(itemsServices_1.default);
app.use(containers_1.default);
app.use(bitacoraList_1.default);
app.use(airlines_1.default);
app.use(motonave_1.default);
app.use(fleteCon_1.default);
app.use(coins_1.default);
app.use(nroMaster_1.default);
app.use(master_1.default);
app.use(master_containers_1.default);
app.use(house_1.default);
app.use(nroHouse_1.default);
app.use(begend_1.default);
app.use(services_1.default);
app.use(bitacora_1.default);
app.use(reports_1.default);
app.use(role_1.default);
app.use(multiplicador_1.default);
app.use(ControlGastos_1.default);
app.use(pricing_1.default);
app.use(deposito_1.default);
app.use(enterprise_1.default);
app.use(account_1.default);
app.use(banks_1.default);
app.use(files_1.default);
app.use(spayment_1.default);
app.use(version_1.default);
app.use(modulesPays_1.default);
app.use(perfomance_1.default);
app.use(month_1.default);
app.use(year_1.default);
app.use(ProgrammedPaymentRoute_1.default);
app.use(calculadora_1.default);
app.use(factura_1.default);
app.use(invoice_1.default);
app.use(consolidation_1.default);
app.use(balance_1.default);
app.use(proyeccion_1.default);
app.use(onedriver_1.default);
app.use(masterusuario_1.default);
app.use(marketing_1.default);
app.use(type_phone_1.default);
app.use(groupservices_1.default);
app.use(transport_1.default);
<<<<<<< HEAD
app.use(gasto_1.default);
=======
>>>>>>> 1607fa76259a8a0b5cf2ee9fffb1da2c1219f54c
exports.default = app;
//# sourceMappingURL=app.js.map