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
  const attending = body.attending;

  if (name.length < 2) errors.name = "Informe seu nome.";
  if (name.length > 120) errors.name = "Nome muito longo.";
  // E-mail é opcional; só é validado quando preenchido.
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Confira o e-mail ou deixe o campo em branco.";
  }
  if (email.length > 180) errors.email = "E-mail muito longo.";
  if (phone.replace(/\D/g, "").length < 10) errors.phone = "Informe o telefone com DDD.";
  if (phone.length > 30) errors.phone = "Telefone inválido.";
  if (attending !== "yes" && attending !== "no") {
    errors.attending = "Escolha se você vai ou não.";
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
      attending,
      notes,
    },
    errors: {},
  };
}
