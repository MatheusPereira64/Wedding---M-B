import type { AuthService, InviteRepository } from "./data";
import { buildMockInvites } from "./mock";
import type { Invite } from "./types";

/**
 * Adaptador de demonstração: guarda as edições no navegador (localStorage) e
 * simula a latência de uma API. Não é seguro nem compartilhado entre
 * aparelhos; existe só para o protótipo das telas.
 */
const STORE_KEY = "mb-admin-demo-v1";
const SESSION_KEY = "mb-admin-demo-session";
export const DEMO_EMAIL = "noivos@demo.local";
export const DEMO_PASSWORD = "convite2027";

const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

function read(): Invite[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw) as Invite[];
  } catch {
    // Armazenamento indisponível: segue com os dados iniciais.
  }
  return buildMockInvites();
}

function write(invites: Invite[]) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(invites));
  } catch {
    // Sem armazenamento, as edições valem só nesta aba.
  }
}

let cache: Invite[] | null = null;
const all = () => (cache ??= read());

export const mockAuth: AuthService = {
  async signIn(email, password) {
    await wait(500);
    const ok = email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
    if (!ok) return { status: "invalid" };
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Sem sessionStorage, a sessão dura só enquanto a página estiver aberta.
    }
    return { status: "ok" };
  },

  async signOut() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Nada a limpar.
    }
  },

  async hasSession() {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  },
};

export const mockInvites: InviteRepository = {
  async list() {
    await wait();
    return structuredClone(all());
  },

  async save(invite) {
    await wait();
    const list = all();
    const index = list.findIndex((item) => item.id === invite.id);
    if (index >= 0) list[index] = structuredClone(invite);
    else list.push(structuredClone(invite));
    write(list);
    return structuredClone(invite);
  },

  async remove(id) {
    await wait();
    cache = all().filter((item) => item.id !== id);
    write(cache);
  },

  linkFor(invite) {
    return `${window.location.origin}${import.meta.env.BASE_URL}?convite=${invite.token}#rsvp`;
  },
};

/** Volta aos dados de exemplo originais (só na demonstração). */
export function resetDemo() {
  try {
    localStorage.removeItem(STORE_KEY);
  } catch {
    // Nada a limpar.
  }
  cache = null;
}
