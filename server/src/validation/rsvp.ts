import type { RsvpPayload } from "../types";

export type FieldErrors = Partial<Record<keyof RsvpPayload, string>>;

export function parseRsvp(input: unknown): { data?: RsvpPayload; errors: FieldErrors } {
  if (!input || typeof input !== "object") {
    return { errors: { name: "Dados inválidos." } };
  }

  const body = input as Record<string, unknown>;
  const errors: FieldErrors = {};

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const notes = String(body.notes ?? "").trim();
  const guests = Number(body.guests);
  const attending = body.attending;

  if (name.length < 3) errors.name = "Informe seu nome completo.";
  if (name.length > 120) errors.name = "Nome muito longo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "E-mail inválido.";
  if (email.length > 180) errors.email = "E-mail muito longo.";
  if (phone.replace(/\D/g, "").length < 10) errors.phone = "Telefone inválido.";
  if (phone.length > 30) errors.phone = "Telefone inválido.";
  if (!Number.isInteger(guests) || guests < 0 || guests > 10) {
    errors.guests = "Informe de 0 a 10 acompanhantes.";
  }
  if (attending !== "yes" && attending !== "no") {
    errors.attending = "Selecione uma opção.";
  }
  if (notes.length > 800) errors.notes = "Observação muito longa.";

  if (Object.keys(errors).length || (attending !== "yes" && attending !== "no")) {
    return { errors };
  }

  return {
    data: {
      name,
      email,
      phone,
      guests,
      attending,
      notes,
    },
    errors: {},
  };
}
