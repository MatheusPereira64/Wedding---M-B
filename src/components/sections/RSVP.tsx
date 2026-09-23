import { useState, type FormEvent } from "react";
import { ApiError } from "../../api/client";
import { submitRsvp } from "../../api/rsvp";
import { weddingData, type RsvpPayload } from "../../weddingData";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
import styles from "./RSVP.module.css";

type Errors = Partial<Record<keyof RsvpPayload, string>>;

const empty: RsvpPayload = {
  name: "",
  email: "",
  phone: "",
  guests: 0,
  attending: "yes",
  notes: "",
};

function validate(data: RsvpPayload): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 3) errors.name = "Informe seu nome completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "E-mail inválido.";
  if (data.phone.replace(/\D/g, "").length < 10) errors.phone = "Telefone inválido.";
  if (data.guests < 0 || data.guests > 10) errors.guests = "Informe de 0 a 10 acompanhantes.";
  if (data.attending !== "yes" && data.attending !== "no") {
    errors.attending = "Selecione uma opção.";
  }
  return errors;
}

export function RSVP() {
  const [form, setForm] = useState<RsvpPayload>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok">("idle");
  const [formError, setFormError] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");
    try {
      await submitRsvp(form);
      setStatus("ok");
    } catch (error) {
      setStatus("idle");
      if (error instanceof ApiError && error.fields) {
        setErrors(error.fields);
      }
      setFormError(
        error instanceof Error ? error.message : "Não foi possível confirmar a presença.",
      );
    }
  };

  return (
    <section id="rsvp" className={`section ${styles.section}`}>
      <FadeIn>
        <header className={styles.header}>
          <p className="eyebrow">RSVP</p>
          <h2>{weddingData.rsvp.title}</h2>
          <span className="ornament" />
          <p className={styles.sub}>{weddingData.rsvp.subtitle}</p>
        </header>
      </FadeIn>
      <FadeIn>
        {status === "ok" ? (
          <div className={styles.success} role="status">
            <h3>{weddingData.rsvp.successTitle}</h3>
            <p>{weddingData.rsvp.successText}</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={(event) => void onSubmit(event)} noValidate>
            <label>
              Nome completo
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoComplete="name"
              />
              {errors.name ? <span>{errors.name}</span> : null}
            </label>
            <label>
              E-mail
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
              />
              {errors.email ? <span>{errors.email}</span> : null}
            </label>
            <label>
              Telefone
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                autoComplete="tel"
              />
              {errors.phone ? <span>{errors.phone}</span> : null}
            </label>
            <label>
              Número de acompanhantes
              <input
                type="number"
                min={0}
                max={10}
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
              />
              {errors.guests ? <span>{errors.guests}</span> : null}
            </label>
            <fieldset>
              <legend>Confirmação de presença</legend>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="attending"
                  checked={form.attending === "yes"}
                  onChange={() => setForm({ ...form, attending: "yes" })}
                />
                Sim, estarei presente
              </label>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="attending"
                  checked={form.attending === "no"}
                  onChange={() => setForm({ ...form, attending: "no" })}
                />
                Infelizmente não poderei comparecer
              </label>
            </fieldset>
            <label>
              Observações
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </label>
            {formError ? <p className={styles.formError}>{formError}</p> : null}
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Enviando..." : "Confirmar presença"}
            </Button>
          </form>
        )}
      </FadeIn>
    </section>
  );
}
