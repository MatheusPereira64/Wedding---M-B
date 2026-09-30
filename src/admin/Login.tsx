import { useState, type FormEvent } from "react";
import { weddingData } from "../weddingData";
import { Button } from "../components/ui/Button";
import { auth, isDemo } from "./data";
import { DEMO_EMAIL, DEMO_PASSWORD } from "./mockAdapter";
import styles from "./Login.module.css";

type Props = { onSignedIn: () => void };

export function Login({ onSignedIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Preencha o e-mail e a senha.");
      return;
    }
    setSending(true);
    const result = await auth.signIn(email, password);
    setSending(false);
    if (result.status === "ok") onSignedIn();
    else if (result.status === "invalid") setError("E-mail ou senha incorretos.");
    else if (result.status === "new-password-required") {
      setError("É o primeiro acesso: defina uma nova senha para continuar.");
    } else setError(result.message);
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.names}>{weddingData.names}</p>
        <h1>Área dos noivos</h1>
        <p className={styles.sub}>Confirmações e lista de convidados.</p>

        <form className={styles.form} onSubmit={(event) => void onSubmit(event)} noValidate>
          <div className={styles.field}>
            <label htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              type="email"
              autoComplete="username"
              autoCapitalize="none"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "login-error" : undefined}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="login-password">Senha</label>
            <div className={styles.passwordRow}>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "login-error" : undefined}
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setShowPassword((value) => !value)}
                aria-pressed={showPassword}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          {error ? (
            <p id="login-error" className={styles.error} role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={sending}>
            {sending ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        {isDemo ? (
          <p className={styles.demo}>
            Demonstração com dados fictícios. Entre com <strong>{DEMO_EMAIL}</strong> e a senha{" "}
            <strong>{DEMO_PASSWORD}</strong>.
          </p>
        ) : null}

        <a className={styles.back} href={import.meta.env.BASE_URL}>
          Voltar ao convite
        </a>
      </div>
    </main>
  );
}
