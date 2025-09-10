"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = require("path");
const db_1 = require("./lib/db");
const routes_1 = require("./routes");
const docs_1 = require("./routes/docs");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '2mb' }));
app.use((0, morgan_1.default)('dev'));
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api', routes_1.router);
app.use('/docs', docs_1.router);
async function start() {
    await (0, db_1.initDatabase)((0, path_1.join)(process.cwd(), 'data', 'app.db'));
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
        console.log(`API docs at http://localhost:${PORT}/docs`);
    });
}
start().catch((err) => {
    console.error('Fatal startup error', err);
    process.exit(1);
});
