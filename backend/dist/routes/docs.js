"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ayurvedic Traceability API',
            version: '1.0.0'
        }
    },
    apis: []
};
const spec = (0, swagger_jsdoc_1.default)(options);
exports.router = (0, express_1.Router)();
exports.router.use('/', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
