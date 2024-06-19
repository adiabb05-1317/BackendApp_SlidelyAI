import express, { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fs from "fs";
const dbPath = "/Users/kannetinagaadithya/Desktop/Slidely_AI/BackendApp_SlidelyAI/src/db.json";

const router: Router = express.Router();

const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

const writeDB = (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

router.get(
  "/ping",
  asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    res.send("pong");
  })
);

router.post(
  "/submit",
  asyncHandler(async (req: Request, res: Response) => {
    const { Name, Email, Phone, GithubLink, StopwatchTime } = req.body;
    const newSubmission = { Name, Email, Phone, GithubLink, StopwatchTime };

    let db = readDB();
    db.submissions.push(newSubmission);
    writeDB(db);

    res.json({ success: true, submission: newSubmission });
  })
);

router.get(
  "/read",
  asyncHandler(async (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string, 10);

    const db = readDB();
    if (index >= 0 && index < db.submissions.length) {
      res.json({ success: true, submission: db.submissions[index] });
    } else {
      res.status(404).json({ success: false, message: "Submission not found" });
    }
  })
);

export default router;
