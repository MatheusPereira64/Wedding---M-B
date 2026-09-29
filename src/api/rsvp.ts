import type { RsvpPayload } from "../weddingData";
import { apiFetch } from "./client";
import { isEmailJsConfigured, sendRsvpEmail } from "./emailjs";

/**
 * Em produção (GitHub Pages) usa EmailJS.
 * Em desenvolvimento, usa EmailJS se as env vars estiverem definidas;
 * caso contrário, cai no Express local (`POST /api/rsvp`).
 */
export async function submitRsvp(payload: RsvpPayload) {
  if (isEmailJsConfigured()) {
    await sendRsvpEmail(payload);
    return { id: "emailjs", createdAt: new Date().toISOString() };
  }

  if (import.meta.env.PROD) {
    throw new Error(
      "Confirmação indisponível: configure as variáveis VITE_EMAILJS_* no deploy.",
    );
  }

  return apiFetch<{ id: string; createdAt: string }>("/api/rsvp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
