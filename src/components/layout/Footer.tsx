import { weddingData } from "../../weddingData";
import styles from "./Footer.module.css";

const links = [
  { href: "#historia", label: "Nossa história" },
  { href: "#local", label: "Local" },
  { href: "#galeria", label: "Galeria" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#presentes", label: "Presentes" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.names}>{weddingData.names}</p>
      <p className={styles.date}>{weddingData.dateLabel}</p>
      <nav className={styles.links} aria-label="Rodapé">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <p className={styles.love}>Feito com amor.</p>
    </footer>
  );
}
