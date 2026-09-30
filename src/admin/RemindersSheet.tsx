import { useState } from "react";
import { invites as repo } from "./data";
import { reminderText, whatsappLink } from "./format";
import type { Invite } from "./types";
import { Sheet } from "./ui";
import styles from "./Admin.module.css";

type Props = { open: boolean; invites: Invite[]; onClose: () => void };

/** Lembretes um a um: o WhatsApp abre com a mensagem pronta para cada convite. */
export function RemindersSheet({ open, invites, onClose }: Props) {
  const [sent, setSent] = useState<Set<string>>(new Set());
  const pending = invites.filter((invite) => invite.guests.some((guest) => guest.status === "pending"));

  return (
    <Sheet open={open} title={`Lembrar pendentes (${pending.length})`} onClose={onClose}>
      {pending.length ? (
        <>
          <p className={styles.sheetIntro}>
            Toque em cada convite para abrir o WhatsApp com a mensagem pronta e o link pessoal. Os
            que vocês já abriram ficam marcados.
          </p>
          <ul className={styles.reminders}>
            {pending.map((invite) => {
              const names = invite.guests.filter((guest) => guest.status === "pending").map((g) => g.name);
              const done = sent.has(invite.id);
              return (
                <li key={invite.id} className={styles.reminderRow} data-done={done || undefined}>
                  <span className={styles.rowMain}>
                    <span className={styles.rowName}>{invite.label}</span>
                    <span className={styles.rowMeta}>{names.join(", ")}</span>
                  </span>
                  <a
                    className={styles.cardAction}
                    href={whatsappLink(invite.phone, reminderText(invite, repo.linkFor(invite)))}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSent((current) => new Set(current).add(invite.id))}
                  >
                    {done ? "Aberto" : "WhatsApp"}
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className={styles.empty}>Todo mundo já respondeu. Nenhum lembrete pendente.</p>
      )}
    </Sheet>
  );
}
