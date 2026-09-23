import { Router } from "express";
import { listGifts } from "../services/giftsService";

export const giftsRouter = Router();

giftsRouter.get("/", async (_req, res) => {
  try {
    const gifts = await listGifts();
    res.json({ gifts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Não foi possível carregar as listas de presentes." });
  }
});
