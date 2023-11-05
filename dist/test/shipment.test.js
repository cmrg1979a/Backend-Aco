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
it("Validar listar_shipment", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/listar_shipment?id_branch=1&id_transport=1&name=&description=&status=`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toBeGreaterThan(1);
}));
it("validar insertar_shipment", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .post(`/insertar_shipment?`)
        .send({
        id_branch: 1,
        code: "et1",
        name: "EJEMPLO TEST 0123",
        id_transport: 1,
        description: "EJEMPLO TEST 0123",
        status: 1,
    })
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
it("Validar ver_shipment", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/ver_shipment?id=1`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
it("validar actualizar_shipment", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .put(`/actualizar_shipment?`)
        .send({
        id: 1,
        name: "EJEMPLO TEST 0123",
        description: "EJEMPLO TEST 0123",
        id_transport: 1,
        status: 1,
    })
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
it("Validar cargar_transports", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/cargar_transports?id_branch=1`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toBeGreaterThan(1);
}));
//# sourceMappingURL=shipment.test.js.map