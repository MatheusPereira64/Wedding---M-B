import { randomUUID } from "node:crypto";
import { RSVPS_FILE } from "../paths";
import { readJson, writeJson } from "../store/jsonStore";
import type { RsvpPayload, RsvpRecord } from "../types";

export async function listRsvps() {
  return readJson<RsvpRecord[]>(RSVPS_FILE, []);
}

export async function createRsvp(payload: RsvpPayload) {
  const current = await listRsvps();
  const digits = (phone: string) => phone.replace(/\D/g, "");
  // Sem e-mail, o telefone identifica quem já respondeu.
  const duplicate = current.find((item) =>
    payload.email ? item.email === payload.email : digits(item.phone) === digits(payload.phone),
  );

  if (duplicate) {
    const error = new Error(
      payload.email
        ? "Este e-mail já confirmou presença."
        : "Este telefone já confirmou presença.",
    );
    error.name = "DuplicateRsvp";
    throw error;
  }

  const record: RsvpRecord = {
    ...payload,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  await writeJson(RSVPS_FILE, [...current, record]);
  return record;
}
