import { weddingData } from "../weddingData";
import { GROUP_LABEL, SIDE_LABEL, STATUS_LABEL, type Invite } from "./types";

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: weddingData.timezone,
});

export function slug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(iso?: string) {
  return iso ? dateFormat.format(new Date(iso)).replace(".", "") : "";
}

/** Primeiro nome de cada pessoa, em lista natural: "Ana, Bia e Caio". */
export function firstNames(names: string[]) {
  const first = names.map((name) => name.split(" ")[0] ?? name);
  if (first.length <= 1) return first.join("");
  return `${first.slice(0, -1).join(", ")} e ${first.at(-1)}`;
}

export function reminderText(invite: Invite, link: string) {
  const pending = invite.guests.filter((guest) => guest.status === "pending").map((g) => g.name);
  return (
    `Olá, ${firstNames(pending)}! Aqui são Matheus e Brena. ` +
    `Ainda não recebemos a sua confirmação para o nosso casamento em ${weddingData.dateLong}. ` +
    `Você pode confirmar por aqui: ${link}`
  );
}

export function whatsappLink(phone: string, text: string) {
  const digits = phone.replace(/\D/g, "");
  const full = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${full}?text=${encodeURIComponent(text)}`;
}

function csvCell(value: string) {
  return /[",;\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/** CSV com uma linha por pessoa; separador ";" e BOM para abrir certo no Excel. */
export function toCsv(invites: Invite[]) {
  const header = ["Convite", "Pessoa", "Resposta", "Respondido em", "Lado", "Grupo", "Telefone", "Observações"];
  const lines = invites.flatMap((invite) =>
    invite.guests.map((guest) =>
      [
        invite.label,
        guest.name,
        STATUS_LABEL[guest.status],
        formatDate(guest.respondedAt),
        SIDE_LABEL[invite.side],
        GROUP_LABEL[invite.group],
        invite.phone,
        invite.notes,
      ]
        .map(csvCell)
        .join(";"),
    ),
  );
  return `﻿${[header.join(";"), ...lines].join("\n")}`;
}

export function downloadCsv(invites: Invite[]) {
  const blob = new Blob([toCsv(invites)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "convidados-matheus-e-brena.csv";
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Copia texto para a área de transferência. Tenta a API moderna e, se o
 * navegador negar, o método antigo com um campo temporário. Nunca abre
 * janelas que bloqueiam a página.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    field.remove();
    return ok;
  }
}
