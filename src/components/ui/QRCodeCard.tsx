import { useEffect, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "./Button";
import styles from "./QRCodeCard.module.css";

type Props = {
  value: string;
  name: string;
  qrImage?: string;
  copyPaste?: string;
};

const WIDE = "(min-width: 720px)";

export function QRCodeCard({ value, name, qrImage, copyPaste }: Props) {
  const [status, setStatus] = useState<"idle" | "ok">("idle");
  const wide = useMediaQuery(WIDE);
  const payload = copyPaste || value;

  useEffect(() => {
    if (status !== "ok") return;
    const id = window.setTimeout(() => setStatus("idle"), 3500);
    return () => window.clearTimeout(id);
  }, [status]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setStatus("ok");
    } catch {
      // Sem acesso à área de transferência: abre a página com o passo a passo.
      const url = `${import.meta.env.BASE_URL}enviar-pix.html?nome=${encodeURIComponent(name)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const qr = (
    <div className={styles.qrWrap}>
      {qrImage ? (
        <img
          src={qrImage}
          alt={`QR Code PIX de ${name}`}
          className={styles.qrImage}
          width={196}
          height={196}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <QRCodeSVG
          value={payload}
          size={196}
          bgColor="#ffffff"
          fgColor="#5C1520"
          level="M"
          marginSize={2}
        />
      )}
    </div>
  );

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>PIX</h3>
      {wide ? qr : null}
      <p className={styles.name}>{name}</p>
      <p className={styles.hint}>
        {wide
          ? "Escaneie o QR Code com o app do seu banco ou copie o código PIX."
          : "Copie o código e cole no app do seu banco, na opção PIX Copia e Cola."}
      </p>
      <Button onClick={() => void copyCode()} aria-describedby="pix-status">
        {status === "ok" ? "Código copiado" : "Copiar código PIX"}
      </Button>
      {wide ? null : (
        <details className={styles.qrDetails}>
          <summary>Pagar com QR Code em outro aparelho</summary>
          {qr}
        </details>
      )}
      <p id="pix-status" className={styles.feedback} role="status">
        {status === "ok" ? "Pronto. Agora é só colar no app do seu banco." : ""}
      </p>
    </article>
  );
}
