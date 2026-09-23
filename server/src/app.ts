import cors from "cors";
import express from "express";
import { giftsRouter } from "./routes/gifts";
import { rsvpRouter } from "./routes/rsvp";

export const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  }),
);
app.use(express.json({ limit: "32kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/rsvp", rsvpRouter);
app.use("/api/gifts", giftsRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ error: "JSON inválido." });
    return;
  }
  next(error);
});
