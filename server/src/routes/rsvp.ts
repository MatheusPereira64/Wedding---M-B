import { Router } from "express";
import { createRsvp } from "../services/rsvpService";
import { parseRsvp } from "../validation/rsvp";

export const rsvpRouter = Router();

rsvpRouter.post("/", async (req, res) => {
  const { data, errors } = parseRsvp(req.body);

  if (!data) {
    res.status(400).json({ error: "Verifique os campos e tente novamente.", fields: errors });
    return;
  }

  try {
    const record = await createRsvp(data);
    res.status(201).json({
      id: record.id,
      createdAt: record.createdAt,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "DuplicateRsvp") {
      res.status(409).json({ error: error.message });
      return;
    }

    console.error(error);
    res.status(500).json({ error: "Não foi possível salvar a confirmação." });
  }
});
