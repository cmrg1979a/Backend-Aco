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
// it("Validar getSex", async () => {
//   const data = {
//     id_shipment: 1,
//     containers: "",
//     id_branch: 1,
//   };
//   const response = await request(app)
//     .post(`/getSex`)
//     .set("auth-token", process.env.authToken)
//     .send(data);
//   let body = response.body;
//   expect(body.estadoflag).toBe(true);
//   expect(body.data.length).toBeGreaterThan(1);
// });
it("Validar listar_sex", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/listar_sex?id_branch=1&code=&name=&acronym=&description=&status=`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toBeGreaterThan(1);
}));
it("validar insertar_sex", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .post(`/insertar_sex?`)
        .send({
        id_branch: 1,
        acronym: "IND",
        name: "EJEMPLO TEST 951",
        description: "EJEMPLO TEST 951",
        status: 1,
    })
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
it("Validar ver_sex", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/ver_sex?id=1`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
it("validar actualizar_sex", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .put(`/actualizar_sex?`)
        .send({
        id: 3,
        acronym: "IND",
        name: "EJEMPLO TEST 951",
        description: "EJEMPLO TEST 951",
        status: 1,
    })
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
}));
it("Validar validar_acronimo_sex", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/validar_acronimo_sex?id=0&acronym=IND&id_branch=1`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.status).toBe(200);
    expect(body.data.length).toEqual(1);
}));
//# sourceMappingURL=sex.test.js.map