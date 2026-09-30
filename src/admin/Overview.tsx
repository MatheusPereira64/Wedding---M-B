import { useState } from "react";
import { formatDate } from "./format";
import { summarize } from "./summary";
import { GROUP_LABEL, SIDE_LABEL, type GuestStatus, type Invite } from "./types";
import { StatusBadge } from "./ui";
import styles from "./Admin.module.css";

type Props = {
  invites: Invite[];
  onFilterStatus: (status: GuestStatus) => void;
  onReminders: () => void;
};

const percent = (part: number, total: number) => (total ? Math.round((part / total) * 100) : 0);

const RECENT_STEP = 5;

export function Overview({ invites, onFilterStatus, onReminders }: Props) {
  const [recentCount, setRecentCount] = useState(RECENT_STEP);
  const [notesCount, setNotesCount] = useState(RECENT_STEP);
  const summary = summarize(invites);
  const pendingInvites = invites.filter((invite) =>
    invite.guests.some((guest) => guest.status === "pending"),
  ).length;

  const recent = invites
    .flatMap((invite) =>
      invite.guests
        .filter((guest) => guest.respondedAt)
        .map((guest) => ({ guest, invite })),
    )
    .sort((a, b) => (b.guest.respondedAt ?? "").localeCompare(a.guest.respondedAt ?? ""));

  const notes = invites.filter((invite) => invite.notes.trim());

  const tiles: { status: GuestStatus; label: string; value: number }[] = [
    { status: "yes", label: "Vão", value: summary.yes },
    { status: "no", label: "Não vão", value: summary.no },
    { status: "pending", label: "Pendentes", value: summary.pending },
  ];

  return (
    <div className={styles.overview}>
      <section className={`${styles.card} ${styles.lead}`} aria-labelledby="ov-respostas">
        <h2 id="ov-respostas" className={styles.cardTitle}>
          Respostas
        </h2>
        <p className={styles.bigStat}>
          <strong>{summary.responded}</strong>
          <span>
            de {summary.total} convidados responderam ({percent(summary.responded, summary.total)}%)
          </span>
        </p>
        <div
          className={styles.bar}
          role="img"
          aria-label={`${summary.yes} vão, ${summary.no} não vão, ${summary.pending} pendentes`}
        >
          <span data-status="yes" style={{ flexGrow: summary.yes }} />
          <span data-status="no" style={{ flexGrow: summary.no }} />
          <span data-status="pending" style={{ flexGrow: summary.pending }} />
        </div>
        <div className={styles.tiles}>
          {tiles.map((tile) => (
            <button
              key={tile.status}
              type="button"
              className={styles.tile}
              data-status={tile.status}
              onClick={() => onFilterStatus(tile.status)}
            >
              <strong>{tile.value}</strong>
              <span>{tile.label}</span>
            </button>
          ))}
        </div>
        {pendingInvites ? (
          <button type="button" className={styles.linkButton} onClick={onReminders}>
            Lembrar {pendingInvites} {pendingInvites === 1 ? "convite pendente" : "convites pendentes"}
          </button>
        ) : null}
      </section>

      <section className={`${styles.card} ${styles.full}`} aria-labelledby="ov-divisao">
        <h2 id="ov-divisao" className={styles.cardTitle}>
          Por lado e grupo
        </h2>
        <div className={styles.breakdownGroups}>
          <Breakdown
            title="Lado"
            rows={Object.entries(summary.bySide).map(([key, value]) => ({
              label: SIDE_LABEL[key as keyof typeof SIDE_LABEL],
              ...value,
            }))}
          />
          <Breakdown
            title="Grupo"
            rows={Object.entries(summary.byGroup).map(([key, value]) => ({
              label: GROUP_LABEL[key as keyof typeof GROUP_LABEL],
              ...value,
            }))}
          />
        </div>
      </section>

      <section className={styles.card} aria-labelledby="ov-recentes">
        <h2 id="ov-recentes" className={styles.cardTitle}>
          Respostas recentes
        </h2>
        {recent.length ? (
          <>
            <ul className={styles.rows}>
              {recent.slice(0, recentCount).map(({ guest, invite }) => (
                <li key={guest.id} className={styles.row}>
                  <span className={styles.rowMain}>
                    <span className={styles.rowName}>{guest.name}</span>
                    <span className={styles.rowMeta}>
                      {invite.label} · {formatDate(guest.respondedAt)}
                      {guest.via === "manual" ? " · marcada por vocês" : ""}
                    </span>
                  </span>
                  <StatusBadge status={guest.status} />
                </li>
              ))}
            </ul>
            <MoreFooter shown={recentCount} total={recent.length} noun="respostas" onChange={setRecentCount} />
          </>
        ) : (
          <p className={styles.empty}>Ninguém respondeu ainda. As respostas aparecem aqui.</p>
        )}
      </section>

      <section className={styles.card} aria-labelledby="ov-obs">
        <h2 id="ov-obs" className={styles.cardTitle}>
          Observações
        </h2>
        {notes.length ? (
          <>
            <ul className={styles.rows}>
              {notes.slice(0, notesCount).map((invite) => (
                <li key={invite.id} className={styles.noteRow}>
                  <span className={styles.rowName}>{invite.label}</span>
                  <span className={styles.rowMeta}>{invite.notes}</span>
                </li>
              ))}
            </ul>
            <MoreFooter shown={notesCount} total={notes.length} noun="observações" onChange={setNotesCount} />
          </>
        ) : (
          <p className={styles.empty}>
            Nenhuma observação. Restrições e recados dos convidados aparecem aqui.
          </p>
        )}
      </section>
    </div>
  );
}

type BreakdownRow = { label: string; total: number; yes: number; pending: number };

function Breakdown({ title, rows }: { title: string; rows: BreakdownRow[] }) {
  return (
    <div className={styles.breakdownGroup}>
      <h3 className={styles.breakdownTitle}>{title}</h3>
      <ul className={styles.rows}>
        {rows.map((row) => (
          <li key={row.label} className={styles.breakdown}>
            <span className={styles.bdName}>{row.label}</span>
            <span className={styles.miniBar} aria-hidden>
              <span style={{ width: `${percent(row.yes, row.total)}%` }} />
            </span>
            <span className={styles.bdYes}>
              {row.yes} de {row.total} vão
            </span>
            <span className={styles.bdPending}>{row.pending} pendentes</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type MoreProps = { shown: number; total: number; noun: string; onChange: (count: number) => void };

/** Rodapé "Ver mais" de uma lista: mostra 5, e mais 10 a cada toque. */
function MoreFooter({ shown, total, noun, onChange }: MoreProps) {
  if (total <= RECENT_STEP) return null;
  const visible = Math.min(shown, total);
  return (
    <div className={styles.moreRow}>
      <span className={styles.rowMeta}>
        {visible} de {total} {noun}
      </span>
      {visible < total ? (
        <button type="button" className={styles.linkButton} onClick={() => onChange(shown + 10)}>
          Ver mais
        </button>
      ) : (
        <button type="button" className={styles.linkButton} onClick={() => onChange(RECENT_STEP)}>
          Ver menos
        </button>
      )}
    </div>
  );
}
