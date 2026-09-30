import type { RsvpPayload } from "../weddingData";

/** Resposta de cada pessoa: a do RSVP público ou ainda pendente. */
export type GuestStatus = RsvpPayload["attending"] | "pending";

export type Side = "noivo" | "noiva";
export type Group = "familia" | "amigos" | "trabalho";

export type Guest = {
  id: string;
  name: string;
  status: GuestStatus;
  /** ISO da última resposta; ausente enquanto pendente. */
  respondedAt?: string;
  /** Como a resposta chegou: pelo site ou marcada pelos noivos. */
  via?: "site" | "manual";
};

/** Um convite nominal: vale só para as pessoas listadas nele. */
export type Invite = {
  id: string;
  label: string;
  side: Side;
  group: Group;
  phone: string;
  notes: string;
  /** Identificador do link pessoal do convite. */
  token: string;
  guests: Guest[];
};

export type Summary = {
  total: number;
  yes: number;
  no: number;
  pending: number;
  responded: number;
  bySide: Record<Side, { total: number; yes: number; pending: number }>;
  byGroup: Record<Group, { total: number; yes: number; pending: number }>;
};

export const SIDE_LABEL: Record<Side, string> = { noivo: "Matheus", noiva: "Brena" };
export const GROUP_LABEL: Record<Group, string> = {
  familia: "Família",
  amigos: "Amigos",
  trabalho: "Trabalho",
};
export const STATUS_LABEL: Record<GuestStatus, string> = {
  yes: "Vai",
  no: "Não vai",
  pending: "Pendente",
};
