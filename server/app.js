"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Server {
    static bootstrap() {
        return new Server();
    }
    config() {
        const t1 = 2;
    }
    constructor() {
        this.app = express();
        this.config();
    }
}
