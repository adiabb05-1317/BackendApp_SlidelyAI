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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const fs_1 = __importDefault(require("fs"));
const dbPath = "/Users/kannetinagaadithya/Desktop/Slidely_AI/BackendApp_SlidelyAI/src/db.json";
const router = express_1.default.Router();
const readDB = () => {
    const data = fs_1.default.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
};
const writeDB = (data) => {
    fs_1.default.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
router.get("/ping", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    res.send("pong");
})));
router.post("/submit", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, Email, Phone, GithubLink, StopwatchTime } = req.body;
    const newSubmission = { Name, Email, Phone, GithubLink, StopwatchTime };
    let db = readDB();
    db.submissions.push(newSubmission);
    writeDB(db);
    res.json({ success: true, submission: newSubmission });
})));
router.get("/read", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const index = parseInt(req.query.index, 10);
    const db = readDB();
    if (index >= 0 && index < db.submissions.length) {
        res.json({ success: true, submission: db.submissions[index] });
    }
    else {
        res.status(404).json({ success: false, message: "Submission not found" });
    }
})));
exports.default = router;
