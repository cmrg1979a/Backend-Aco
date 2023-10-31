"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
it("Validar listado que trae datos ", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/getQuoteList?id_branch=1&id_marketing=&id_status=&id_entities=&id_modality=&id_shipment=&id_incoterm=&fechainicio=&fechafin=&estado=`)
        .set("auth-token", process.env.authToken); // Usa "auth-token" en lugar de "Authorization"
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toBeGreaterThan(1);
}));
it("Validar listado que no trae datos ", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/getQuoteList?id_branch=3&id_marketing=&id_status=&id_entities=&id_modality=&id_shipment=&id_incoterm=&fechainicio=&fechafin=&estado=`)
        .set("auth-token", process.env.authToken); // Usa "auth-token" en lugar de "Authorization"
    let body = response.body;
    expect(body.estadoflag).toBe(false);
    expect(body.data.length).toBe(1);
}));
//# sourceMappingURL=ejemploTest.js.map