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
it("Validar getPerfomance", () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        id_shipment: 1,
        containers: "",
        id_branch: 1,
    };
    const response = yield (0, supertest_1.default)(app_1.default)
        .post(`/getPerfomance`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true); // valida que traiga el estadoflag como true
    expect(body.data.length).toBeGreaterThan(1); // valida que traiga más de un registro
}));
it("Validar getListPerformance", () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        id_shipment: 1,
        containers: "",
        id_branch: 1,
    };
    const response = yield (0, supertest_1.default)(app_1.default)
        .post(`/getListPerformance?id_branch=1&code=&description=&status`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true); // valida que traiga el estadoflag como true
    expect(body.data.length).toBeGreaterThan(1); // valida que traiga más de un registro
}));
it("Validar readPerformance", () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        id_shipment: 1,
        containers: "",
        id_branch: 1,
    };
    const response = yield (0, supertest_1.default)(app_1.default)
        .post(`/readPerformance?id=1`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true); // valida que traiga el estadoflag como true
    expect(body.data.length).toEqual(1); // valida que traiga más de un registro
}));
//# sourceMappingURL=performance.test.js.map