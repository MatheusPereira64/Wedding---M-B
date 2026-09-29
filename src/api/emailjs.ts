import emailjs from "@emailjs/browser";
import type { RsvpPayload } from "../weddingData";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? "";

const PLACEHOLDER = /^YOUR_|^your_|^sua_/i;

export function isEmailJsConfigured(): boolean {
  return Boolean(
    SERVICE_ID &&
      TEMPLATE_ID &&
      PUBLIC_KEY &&
      !PLACEHOLDER.test(SERVICE_ID) &&
      !PLACEHOLDER.test(TEMPLATE_ID) &&
      !PLACEHOLDER.test(PUBLIC_KEY),
  );
}

function attendanceLabel(attending: RsvpPayload["attending"]): string {
  return attending === "yes"
    ? "SIM — estará presente"
    : "NÃO — não poderá comparecer";
}

/** Envia o RSVP por e-mail via EmailJS (uso em GitHub Pages / produção estática). */
export async function sendRsvpEmail(payload: RsvpPayload): Promise<{ method: "emailjs" }> {
  if (!isEmailJsConfigured()) {
    throw new Error(
      "EmailJS não está configurado. Defina VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID e VITE_EMAILJS_PUBLIC_KEY.",
    );
  }

  emailjs.init(PUBLIC_KEY);

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    to_email: "matheuspereira6464@gmail.com",
    guest_name: payload.name.trim(),
    guest_email: payload.email.trim() || "(não informado)",
    guest_phone: payload.phone.trim(),
    attending: payload.attending,
    attendance: attendanceLabel(payload.attending),
    attendance_decision: attendanceLabel(payload.attending),
    notes: payload.notes.trim() || "(sem observações)",
    reply_to: payload.email.trim(),
  });

  return { method: "emailjs" };
}
