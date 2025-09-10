"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const resources_1 = require("./resources");
const qr_1 = require("./qr");
exports.router = (0, express_1.Router)();
exports.router.use('/v1', resources_1.router);
exports.router.use('/v1', qr_1.router);
