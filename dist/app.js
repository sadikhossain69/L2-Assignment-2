"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./app/modules/user/user.router");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/api/users', user_router_1.UserRoutes);
app.get('/', (req, res) => {
    const a = "Amader API endpoint e apnake sagotom";
    res.json({
        a,
    });
});
exports.default = app;
