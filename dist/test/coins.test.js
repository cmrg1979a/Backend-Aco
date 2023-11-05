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
it("Validar getCoinsList", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .post(`/getCoinsList`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toBeGreaterThan(1);
}));
it("Validar listar_coins", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/listar_coins?id_branch=1&code=&symbol=&acronym=&name=&description=&status=`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toBeGreaterThan(1);
}));
it("validar insertar_coins", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .post(`/insertar_coins?`)
        .send({
        id_branch: 1,
        symbol: "EJ1",
        acronym: "EJ1",
        name: "EJEMPLO 123",
        description: "EJEMPLO 123",
        status: 1,
    })
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
it("Validar ver_coins", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/ver_coins?id=1`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
it("validar actualizar_coins", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .put(`/actualizar_coins?`)
        .send({
        id: 1,
        symbol: "EJ1",
        acronym: "EJ01",
        name: "EJEMPLO 1234",
        description: "EJEMPLO 1234",
        status: 1,
    })
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
//# sourceMappingURL=coins.test.js.map