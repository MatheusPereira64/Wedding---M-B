import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "./Button";
import styles from "./QRCodeCard.module.css";

type Props = {
  value: string;
  name: string;
  qrImage?: string;
};

export function QRCodeCard({ value, name, qrImage }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
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
            value={value}
            size={196}
            bgColor="#ffffff"
            fgColor="#5C1520"
            level="M"
            marginSize={2}
          />
        )}
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.key}>{value}</p>
      <p className={styles.hint}>Aponte a câmera ou copie a chave para nos presentear.</p>
      <Button onClick={() => void copy()}>{copied ? "Chave PIX copiada!" : "Copiar chave PIX"}</Button>
    </article>
  );
}
