import { useEffect, useId, useRef, type ReactNode } from "react";
import { STATUS_LABEL, type GuestStatus } from "./types";
import styles from "./ui.module.css";

/** Status sempre com texto: a cor e a forma do marcador só reforçam. */
export function StatusBadge({ status }: { status: GuestStatus }) {
  return (
    <span className={styles.badge} data-status={status}>
      <span className={styles.mark} aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  );
}

type SheetProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
};

/**
 * Painel sobre a página: sobe de baixo no celular e fica à direita no
 * desktop. Usa <dialog> nativo, que já prende o foco e fecha com Esc.
 */
export function Sheet({ open, title, onClose, children, footer }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={styles.sheet}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        // Clique no fundo escurecido (fora do conteúdo) fecha o painel.
        if (event.target === ref.current) onClose();
      }}
    >
      <div className={styles.sheetInner}>
        <header className={styles.sheetHead}>
          <h2 id={titleId}>{title}</h2>
          <button type="button" className={styles.iconButton} onClick={onClose} aria-label="Fechar">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>
        <div className={styles.sheetBody}>{children}</div>
        {footer ? <footer className={styles.sheetFoot}>{footer}</footer> : null}
      </div>
    </dialog>
  );
}
