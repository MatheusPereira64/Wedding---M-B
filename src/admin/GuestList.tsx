import { useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { invites as repo } from "./data";
import { copyText, reminderText, whatsappLink } from "./format";
import { inviteStatus, summarize } from "./summary";
import { GROUP_LABEL, SIDE_LABEL, type Group, type GuestStatus, type Invite, type Side } from "./types";
import { StatusBadge } from "./ui";
import styles from "./Admin.module.css";

export type Filters = {
  query: string;
  status: GuestStatus | "all";
  side: Side | "all";
  group: Group | "all";
  sort: "name" | "recent" | "pending";
};

export const emptyFilters: Filters = { query: "", status: "all", side: "all", group: "all", sort: "name" };

const normalize = (text: string) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function applyFilters(invites: Invite[], filters: Filters) {
  const query = normalize(filters.query.trim());
  const list = invites.filter((invite) => {
    if (filters.side !== "all" && invite.side !== filters.side) return false;
    if (filters.group !== "all" && invite.group !== filters.group) return false;
    if (filters.status !== "all" && !invite.guests.some((guest) => guest.status === filters.status)) {
      return false;
    }
    if (!query) return true;
    return [invite.label, ...invite.guests.map((guest) => guest.name)].some((text) =>
      normalize(text).includes(query),
    );
  });

  return list.sort((a, b) => {
    if (filters.sort === "recent") {
      return (inviteStatus(b).lastResponse ?? "").localeCompare(inviteStatus(a).lastResponse ?? "");
    }
    if (filters.sort === "pending") {
      const diff = Number(inviteStatus(b).hasPending) - Number(inviteStatus(a).hasPending);
      if (diff) return diff;
    }
    return a.label.localeCompare(b.label, "pt-BR");
  });
}

type Props = {
  invites: Invite[];
  filters: Filters;
  onFilters: (filters: Filters) => void;
  onEdit: (invite: Invite) => void;
  onNew: () => void;
  onReminders: () => void;
  onExport: (invites: Invite[]) => void;
};

export function GuestList({ invites, filters, onFilters, onEdit, onNew, onReminders, onExport }: Props) {
  const wide = useMediaQuery("(min-width: 900px)");
  const summary = summarize(invites);
  const visible = applyFilters(invites, filters);
  const people = visible.reduce((sum, invite) => sum + invite.guests.length, 0);
  const set = (patch: Partial<Filters>) => onFilters({ ...filters, ...patch });
  const filtered =
    filters.query || filters.status !== "all" || filters.side !== "all" || filters.group !== "all";

  const chips: { value: Filters["status"]; label: string; count: number }[] = [
    { value: "all", label: "Todos", count: summary.total },
    { value: "yes", label: "Vão", count: summary.yes },
    { value: "no", label: "Não vão", count: summary.no },
    { value: "pending", label: "Pendentes", count: summary.pending },
  ];

  return (
    <div className={styles.list}>
      <div className={styles.toolbar}>
        <div className={styles.search}>
          <label htmlFor="busca" className={styles.visuallyHidden}>
            Buscar convidado
          </label>
          <svg viewBox="0 0 24 24" aria-hidden>
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" />
          </svg>
          <input
            id="busca"
            type="search"
            placeholder="Buscar por nome ou convite"
            value={filters.query}
            onChange={(event) => set({ query: event.target.value })}
            enterKeyHint="search"
          />
        </div>

        <div className={styles.chips} role="group" aria-label="Filtrar por resposta">
          {chips.map((chip) => (
            <button
              key={chip.value}
              type="button"
              className={styles.chip}
              aria-pressed={filters.status === chip.value}
              onClick={() => set({ status: chip.value })}
            >
              {chip.label} <span className={styles.chipCount}>{chip.count}</span>
            </button>
          ))}
        </div>

        <div className={styles.selects}>
          <label>
            Lado
            <select value={filters.side} onChange={(event) => set({ side: event.target.value as Filters["side"] })}>
              <option value="all">Todos</option>
              <option value="noivo">{SIDE_LABEL.noivo}</option>
              <option value="noiva">{SIDE_LABEL.noiva}</option>
            </select>
          </label>
          <label>
            Grupo
            <select value={filters.group} onChange={(event) => set({ group: event.target.value as Filters["group"] })}>
              <option value="all">Todos</option>
              {(Object.keys(GROUP_LABEL) as Group[]).map((group) => (
                <option key={group} value={group}>
                  {GROUP_LABEL[group]}
                </option>
              ))}
            </select>
          </label>
          <label>
            Ordenar
            <select value={filters.sort} onChange={(event) => set({ sort: event.target.value as Filters["sort"] })}>
              <option value="name">Nome</option>
              <option value="pending">Pendentes primeiro</option>
              <option value="recent">Resposta recente</option>
            </select>
          </label>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.primaryAction} onClick={onNew}>
            Novo convite
          </button>
          <button type="button" className={styles.secondaryAction} onClick={onReminders}>
            Lembrar pendentes
          </button>
          <button type="button" className={styles.secondaryAction} onClick={() => onExport(visible)}>
            Exportar CSV
          </button>
        </div>
      </div>

      <p className={styles.resultCount} role="status">
        {visible.length} {visible.length === 1 ? "convite" : "convites"} · {people}{" "}
        {people === 1 ? "pessoa" : "pessoas"}
      </p>

      {visible.length ? (
        wide ? (
          <InviteTable invites={visible} onEdit={onEdit} />
        ) : (
          <ul className={styles.cards}>
            {visible.map((invite) => (
              <li key={invite.id}>
                <InviteCard invite={invite} onEdit={() => onEdit(invite)} />
              </li>
            ))}
          </ul>
        )
      ) : (
        <div className={styles.emptyState}>
          <p>{filtered ? "Nenhum convite com esses filtros." : "A lista ainda está vazia."}</p>
          {filtered ? (
            <button type="button" className={styles.secondaryAction} onClick={() => onFilters(emptyFilters)}>
              Limpar filtros
            </button>
          ) : (
            <button type="button" className={styles.primaryAction} onClick={onNew}>
              Adicionar o primeiro convite
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function InviteCard({ invite, onEdit }: { invite: Invite; onEdit: () => void }) {
  return (
    <article className={styles.inviteCard}>
      <header className={styles.inviteHead}>
        <h3>{invite.label}</h3>
        <p className={styles.rowMeta}>
          {SIDE_LABEL[invite.side]} · {GROUP_LABEL[invite.group]}
        </p>
      </header>
      <ul className={styles.people}>
        {invite.guests.map((guest) => (
          <li key={guest.id}>
            <span>{guest.name}</span>
            <StatusBadge status={guest.status} />
          </li>
        ))}
      </ul>
      {invite.notes ? <p className={styles.note}>{invite.notes}</p> : null}
      <InviteActions invite={invite} onEdit={onEdit} />
    </article>
  );
}

/** Desktop: uma linha por convite, com as pessoas e as respostas lado a lado. */
function InviteTable({ invites, onEdit }: { invites: Invite[]; onEdit: (invite: Invite) => void }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Convite</th>
            <th scope="col">Pessoas e resposta</th>
            <th scope="col">Observações</th>
            <th scope="col">
              <span className={styles.visuallyHidden}>Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {invites.map((invite) => (
            <tr key={invite.id}>
              <th scope="row" className={styles.cellInvite}>
                <span className={styles.rowName}>{invite.label}</span>
                <span className={styles.rowMeta}>
                  {SIDE_LABEL[invite.side]} · {GROUP_LABEL[invite.group]}
                </span>
              </th>
              <td>
                <ul className={styles.tablePeople}>
                  {invite.guests.map((guest) => (
                    <li key={guest.id}>
                      <span>{guest.name}</span>
                      <StatusBadge status={guest.status} />
                    </li>
                  ))}
                </ul>
              </td>
              <td className={styles.cellNotes}>{invite.notes}</td>
              <td className={styles.cellActions}>
                <InviteActions invite={invite} onEdit={() => onEdit(invite)} compact />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ICONS = {
  whatsapp: <path d="M4.5 19.5l1.2-3.6A7.5 7.5 0 1 1 8.4 18.6L4.5 19.5Z" />,
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  edit: <path d="M4 20h4L19 9l-4-4L4 16v4ZM13.5 6.5l4 4" />,
};

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={styles.actionIcon}>
      {ICONS[name]}
    </svg>
  );
}

/** Ações de um convite; `compact` mostra só ícones (com rótulo acessível e dica). */
function InviteActions({ invite, onEdit, compact = false }: { invite: Invite; onEdit: () => void; compact?: boolean }) {
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const link = repo.linkFor(invite);
  const hasPending = invite.guests.some((guest) => guest.status === "pending");

  const copy = async () => {
    setCopied((await copyText(link)) ? "ok" : "fail");
    window.setTimeout(() => setCopied("idle"), 2500);
  };

  const labels = {
    whatsapp: "Lembrar no WhatsApp",
    link: copied === "ok" ? "Link copiado" : copied === "fail" ? "Não deu para copiar" : "Copiar link",
    edit: "Editar",
  };
  const cls = compact ? styles.iconAction : styles.cardAction;

  return (
    <div className={compact ? styles.rowActions : styles.cardActions}>
      {hasPending ? (
        <a
          className={cls}
          href={whatsappLink(invite.phone, reminderText(invite, link))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={compact ? `${labels.whatsapp}: ${invite.label}` : undefined}
          title={compact ? labels.whatsapp : undefined}
        >
          {compact ? <Icon name="whatsapp" /> : labels.whatsapp}
        </a>
      ) : compact ? (
        <span className={styles.iconSpacer} aria-hidden />
      ) : null}
      <button
        type="button"
        className={cls}
        onClick={() => void copy()}
        aria-label={compact ? `${labels.link}: ${invite.label}` : undefined}
        title={compact ? labels.link : undefined}
      >
        {compact ? <Icon name={copied === "ok" ? "check" : "link"} /> : <span aria-live="polite">{labels.link}</span>}
      </button>
      <button
        type="button"
        className={cls}
        onClick={onEdit}
        aria-label={compact ? `${labels.edit}: ${invite.label}` : undefined}
        title={compact ? labels.edit : undefined}
      >
        {compact ? <Icon name="edit" /> : labels.edit}
      </button>
    </div>
  );
}
