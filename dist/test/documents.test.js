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
it("Validar getDocumentsList", () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        id_pais: 139,
    };
    const response = yield (0, supertest_1.default)(app_1.default)
        .post(`/getDocumentsList`)
        .set("auth-token", process.env.authToken)
        .send(data); // Envia los datos en el cuerpo
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toBeGreaterThan(1);
}));
it("Validar getListDocumentsByBranch", () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        id_pais: 139,
    };
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/getListDocumentsByBranch?code=&name=&description=&status=&id_branch=1`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toBeGreaterThan(1);
}));
it("Validar readDocuments", () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        id_pais: 139,
    };
    const response = yield (0, supertest_1.default)(app_1.default)
        .get(`/readDocuments?id=1`)
        .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toBeGreaterThan(1);
}));
//# sourceMappingURL=documents.test.js.map