import type { RsvpPayload } from "../weddingData";
import { apiFetch } from "./client";

export function submitRsvp(payload: RsvpPayload) {
  return apiFetch<{ id: string; createdAt: string }>("/api/rsvp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
