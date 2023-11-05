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
it("Validar listar_enterprise", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/listar_enterprise?id_branch=1&document=&trade_name=&business_name=&address=&status=&id_pais=&id_state=&id_city=&id_town=&id_document=`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toBeGreaterThan(1);
}));
it("validar insertar_enterprise", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .post(`/insertar_enterprise?`)
        .send({
        id_branch: 1,
        id_logo: "",
        document: "12312312",
        trade_name: "EJEMPLO 001",
        business_name: "EJEMPLO 001",
        slogan: "",
        address: "DIRECCION 001",
        status: 1,
        id_pais: 139,
        id_state: 2,
        id_city: 10,
        id_town: 102,
        id_document: 1,
        ic: "",
    })
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
it("Validar ver_enterprise", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/ver_enterprise?id=1`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
it("validar actualizar_enterprise", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .put(`/actualizar_enterprise?`)
        .send({
        id: 1,
        id_logo: "",
        document: "12312312",
        trade_name: "EJEMPLO 001",
        business_name: "EJEMPLO 001",
        slogan: "",
        address: "DIRECCION 001",
        status: 1,
        id_pais: 139,
        id_state: 2,
        id_city: 10,
        id_town: 102,
        id_document: 1,
        ic: "",
    })
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
it("Validar validar_documento_enterprise", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/validar_documento_enterprise?id_document=1&id_branch=1&document=12312315`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
//# sourceMappingURL=enterprise.test.js.map