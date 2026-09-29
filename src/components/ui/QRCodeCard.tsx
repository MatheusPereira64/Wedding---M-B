import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "./Button";
import styles from "./QRCodeCard.module.css";

type Props = {
  value: string;
  name: string;
  qrImage?: string;
  copyPaste?: string;
};

async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}

export function QRCodeCard({ value, name, qrImage, copyPaste }: Props) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const payload = copyPaste || value;

  const sendPix = async () => {
    const url = `${import.meta.env.BASE_URL}enviar-pix.html?nome=${encodeURIComponent(name)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    try {
      await copyText(payload);
      setStatus("ok");
      window.setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 3500);
    }
  };

  return (
    <article className={styles.card}>
      <p className={styles.kicker}>PIX</p>
      <div className={styles.qrWrap}>
        {qrImage ? (
          <img src={qrImage} alt={`QR Code PIX de ${name}`} className={styles.qrImage} />
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
      <p className={styles.name}>{name}</p>
      <p className={styles.hint}>
        No celular, toque em Enviar PIX para abrir o pagamento. No computador, escaneie o QR
        com o app do banco.
      </p>
      <Button onClick={() => void sendPix()}>Enviar PIX</Button>
      {status === "ok" ? (
        <p className={styles.feedback} role="status">
          Código PIX copiado. Cole no app do seu banco.
        </p>
      ) : null}
      {status === "error" ? (
        <p className={styles.feedback} role="status">
          Não foi possível copiar. Abra a aba e siga as instruções.
        </p>
      ) : null}
    </article>
  );
}
