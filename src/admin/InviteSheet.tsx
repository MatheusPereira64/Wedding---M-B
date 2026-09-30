import { useEffect, useState } from "react";
import { invites as repo } from "./data";
import { slug } from "./format";
import { GROUP_LABEL, SIDE_LABEL, STATUS_LABEL, type Group, type Guest, type GuestStatus, type Invite, type Side } from "./types";
import { Sheet } from "./ui";
import styles from "./Admin.module.css";

type Props = {
  /** Convite a editar; `null` cria um novo. `undefined` mantém o painel fechado. */
  invite: Invite | null | undefined;
  onClose: () => void;
  onSaved: (invite: Invite, message: string) => void;
  onRemoved: (id: string, label: string) => void;
};

const blankInvite = (): Invite => ({
  id: `c${Date.now().toString(36)}`,
  label: "",
  side: "noiva",
  group: "familia",
  phone: "",
  notes: "",
  token: "",
  guests: [{ id: `g${Date.now().toString(36)}`, name: "", status: "pending" }],
});

const STATUSES: GuestStatus[] = ["yes", "no", "pending"];

export function InviteSheet({ invite, onClose, onSaved, onRemoved }: Props) {
  const open = invite !== undefined;
  const isNew = invite === null;
  const [draft, setDraft] = useState<Invite>(blankInvite);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDraft(invite ? structuredClone(invite) : blankInvite());
    setError("");
    setConfirmRemove(false);
  }, [open, invite]);

  const setGuest = (id: string, patch: Partial<Guest>) =>
    setDraft((current) => ({
      ...current,
      guests: current.guests.map((guest) => (guest.id === id ? { ...guest, ...patch } : guest)),
    }));

  const setStatus = (guest: Guest, status: GuestStatus) => {
    if (guest.status === status) return;
    // Resposta marcada pelos noivos (ex.: recebida por WhatsApp).
    setGuest(guest.id, status === "pending"
      ? { status, respondedAt: undefined, via: undefined }
      : { status, respondedAt: new Date().toISOString(), via: "manual" });
  };

  const save = async () => {
    const guests = draft.guests
      .map((guest) => ({ ...guest, name: guest.name.trim() }))
      .filter((guest) => guest.name);
    if (!draft.label.trim()) return setError("Dê um nome ao convite, como “Família Souza”.");
    if (!guests.length) return setError("Inclua pelo menos uma pessoa no convite.");

    setSaving(true);
    setError("");
    try {
      const label = draft.label.trim();
      const saved = await repo.save({
        ...draft,
        label,
        guests,
        token: draft.token || `${slug(label)}-${Date.now().toString(36)}`,
      });
      onSaved(saved, isNew ? `Convite “${saved.label}” criado.` : `Convite “${saved.label}” salvo.`);
    } catch {
      setError("Não foi possível salvar. Verifique a conexão e tente de novo.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    setSaving(true);
    try {
      await repo.remove(draft.id);
      onRemoved(draft.id, draft.label);
    } catch {
      setError("Não foi possível excluir. Tente de novo.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet
      open={open}
      title={isNew ? "Novo convite" : "Editar convite"}
      onClose={onClose}
      footer={
        confirmRemove ? (
          <>
            <p className={styles.confirmText}>
              Excluir “{draft.label}”
              {draft.guests.length === 1 ? " e a pessoa dele?" : ` e as ${draft.guests.length} pessoas?`}
            </p>
            <button type="button" className={styles.secondaryAction} onClick={() => setConfirmRemove(false)}>
              Manter
            </button>
            <button type="button" className={styles.dangerAction} onClick={() => void remove()} disabled={saving}>
              {saving ? "Excluindo..." : "Excluir"}
            </button>
          </>
        ) : (
          <>
            {isNew ? null : (
              <button type="button" className={styles.textDanger} onClick={() => setConfirmRemove(true)}>
                Excluir convite
              </button>
            )}
            <button type="button" className={styles.secondaryAction} onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className={styles.primaryAction} onClick={() => void save()} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </>
        )
      }
    >
      <div className={styles.formStack}>
        {error ? (
          <p className={styles.formError} role="alert">
            {error}
          </p>
        ) : null}

        <label className={styles.formField}>
          Nome do convite
          <input
            value={draft.label}
            placeholder="Ex.: Família Souza"
            onChange={(event) => setDraft({ ...draft, label: event.target.value })}
          />
        </label>

        <fieldset className={styles.formField}>
          <legend>Lado</legend>
          <div className={styles.segmented}>
            {(Object.keys(SIDE_LABEL) as Side[]).map((side) => (
              <label key={side}>
                <input
                  type="radio"
                  name="side"
                  checked={draft.side === side}
                  onChange={() => setDraft({ ...draft, side })}
                />
                <span>{SIDE_LABEL[side]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.formRow}>
          <label className={styles.formField}>
            Grupo
            <select value={draft.group} onChange={(event) => setDraft({ ...draft, group: event.target.value as Group })}>
              {(Object.keys(GROUP_LABEL) as Group[]).map((group) => (
                <option key={group} value={group}>
                  {GROUP_LABEL[group]}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.formField}>
            Telefone (WhatsApp)
            <input
              type="tel"
              inputMode="tel"
              autoComplete="off"
              value={draft.phone}
              placeholder="(92) 9..."
              onChange={(event) => setDraft({ ...draft, phone: event.target.value })}
            />
          </label>
        </div>

        <fieldset className={styles.formField}>
          <legend>Pessoas no convite</legend>
          <ul className={styles.personList}>
            {draft.guests.map((guest, index) => (
              <li key={guest.id} className={styles.personRow}>
                <div className={styles.personTop}>
                  <label className={styles.visuallyHidden} htmlFor={`pessoa-${guest.id}`}>
                    Nome da pessoa {index + 1}
                  </label>
                  <input
                    id={`pessoa-${guest.id}`}
                    value={guest.name}
                    placeholder="Nome completo"
                    onChange={(event) => setGuest(guest.id, { name: event.target.value })}
                  />
                  {draft.guests.length > 1 ? (
                    <button
                      type="button"
                      className={styles.removePerson}
                      onClick={() =>
                        setDraft({ ...draft, guests: draft.guests.filter((item) => item.id !== guest.id) })
                      }
                      aria-label={`Remover ${guest.name || `pessoa ${index + 1}`}`}
                    >
                      Remover
                    </button>
                  ) : null}
                </div>
                <div className={styles.segmented} role="radiogroup" aria-label={`Resposta de ${guest.name || `pessoa ${index + 1}`}`}>
                  {STATUSES.map((status) => (
                    <label key={status} data-status={status}>
                      <input
                        type="radio"
                        name={`status-${guest.id}`}
                        checked={guest.status === status}
                        onChange={() => setStatus(guest, status)}
                      />
                      <span>{STATUS_LABEL[status]}</span>
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.secondaryAction}
            onClick={() =>
              setDraft({
                ...draft,
                guests: [...draft.guests, { id: `g${Date.now().toString(36)}`, name: "", status: "pending" }],
              })
            }
          >
            Adicionar pessoa
          </button>
        </fieldset>

        <label className={styles.formField}>
          Observações
          <textarea
            rows={3}
            value={draft.notes}
            placeholder="Restrições alimentares, acessibilidade, recados"
            onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
          />
        </label>

        {isNew ? null : (
          <div className={styles.formField}>
            <span>Link pessoal do convite</span>
            <p className={styles.linkBox}>{repo.linkFor(draft)}</p>
          </div>
        )}
      </div>
    </Sheet>
  );
}
