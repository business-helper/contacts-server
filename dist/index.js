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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("./config"));
const contact_route_1 = __importDefault(require("./routes/contact.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.static("assets"));
app.use("/contacts", contact_route_1.default);
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "sqlite",
    database: "movies",
    storage: __dirname + "contact.db",
    models: [__dirname + "/models"],
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.sync({ force: false });
}))();
app.listen(config_1.default.port, () => {
    console.log(`The server is running on port ${config_1.default.port}.`);
});
