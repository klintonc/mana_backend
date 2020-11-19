import express from "express";

import { middleware } from "@line/bot-sdk";
import Line from "../controller/line";

// import { lineToken } from "../token/line";

const lineToken = {
  channelSecret: "***REMOVED***",
  channelAccessToken:
    "***REMOVED***",
};

const router = express.Router();

router.post("/callback", middleware(lineToken), Line.lineCallback);

export default router;
