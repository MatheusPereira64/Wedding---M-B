import type { Invite } from "./types";
import { mockAuth, mockInvites } from "./mockAdapter";

/**
 * Contratos da área dos noivos. Hoje as telas usam adaptadores de
 * demonstração (dados fictícios no navegador). O backend planejado é AWS:
 *
 * - AuthService      -> Amazon Cognito (login compartilhado dos noivos),
 *                       via `aws-amplify/auth` (signIn, signOut, getCurrentUser).
 * - InviteRepository -> Amazon DynamoDB, via Amplify Data (AppSync) ou uma API
 *                       própria. Um item por convite, com os convidados embutidos
 *                       (80 pessoas cabem folgadas num item por convite).
 * - Hospedagem       -> AWS Amplify Hosting.
 *
 * Para trocar, basta criar `amplifyAuth` e `amplifyInvites` que implementem
 * estas interfaces e apontar as constantes no fim do arquivo para eles.
 * As telas não mudam.
 */

/** Resultado de login, espelhando os casos que o Cognito devolve. */
export type SignInResult =
  | { status: "ok" }
  | { status: "invalid" } // NotAuthorizedException / UserNotFoundException
  | { status: "new-password-required" } // desafio NEW_PASSWORD_REQUIRED no primeiro acesso
  | { status: "error"; message: string }; // rede, limite de tentativas etc.

export type AuthService = {
  signIn(email: string, password: string): Promise<SignInResult>;
  signOut(): Promise<void>;
  /** Sessão válida no momento (tokens do Cognito ainda válidos). */
  hasSession(): Promise<boolean>;
};

export type InviteRepository = {
  list(): Promise<Invite[]>;
  /** Cria ou atualiza o convite inteiro (PutItem). */
  save(invite: Invite): Promise<Invite>;
  remove(id: string): Promise<void>;
  /** Link pessoal que o convidado abre (nome já preenchido no RSVP). */
  linkFor(invite: Invite): string;
};

/** true enquanto os adaptadores são de demonstração. */
export const isDemo = true;

export const auth: AuthService = mockAuth;
export const invites: InviteRepository = mockInvites;
