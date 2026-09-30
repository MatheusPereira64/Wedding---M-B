import { useRef, useState, type FormEvent } from "react";
import { ApiError } from "../../api/client";
import { submitRsvp } from "../../api/rsvp";
import { weddingData, type RsvpPayload } from "../../weddingData";
import { Button } from "../ui/Button";
import { celebrate } from "../ui/celebrate";
import { FadeIn } from "../ui/FadeIn";
import styles from "./RSVP.module.css";

type Field = keyof RsvpPayload;
type Errors = Partial<Record<Field, string>>;
type FormState = Omit<RsvpPayload, "attending"> & { attending: RsvpPayload["attending"] | "" };

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  attending: "",
  notes: "",
};

const order: Field[] = ["name", "email", "phone", "attending", "notes"];

function validate(data: FormState): Errors {
  const errors: Errors = {};
  const email = data.email.trim();
  if (data.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Confira o e-mail ou deixe o campo em branco.";
  }
  if (data.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Informe o telefone com DDD.";
  }
  if (data.attending !== "yes" && data.attending !== "no") {
    errors.attending = "Escolha se você vai ou não.";
  }
  return errors;
}

export function RSVP() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok">("idle");
  const [formError, setFormError] = useState("");
  const fieldRefs = useRef<Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const successRef = useRef<HTMLHeadingElement>(null);

  const focusFirstError = (next: Errors) => {
    const first = order.find((field) => next[field]);
    if (first) fieldRefs.current[first]?.focus();
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length) {
      focusFirstError(nextErrors);
      return;
    }

    setStatus("sending");
    try {
      await submitRsvp(form as RsvpPayload);
      setStatus("ok");
      requestAnimationFrame(() => {
        successRef.current?.focus();
        // Celebração só para quem confirmou presença.
        if (form.attending === "yes") celebrate(successRef.current);
      });
    } catch (error) {
      setStatus("idle");
      if (error instanceof ApiError && error.fields) {
        setErrors(error.fields);
        focusFirstError(error.fields);
      }
      const message =
        error instanceof Error ? error.message : "Não foi possível confirmar a presença.";
      if (/emailjs|401|403|412|network|failed to fetch/i.test(message)) {
        setFormError("Não foi possível enviar a confirmação. Tente novamente em instantes.");
      } else {
        setFormError(message);
      }
    }
  };

  const fieldProps = (field: Field) => ({
    ref: (el: HTMLInputElement | HTMLTextAreaElement | null) => {
      fieldRefs.current[field] = el;
    },
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `rsvp-${field}-error` : undefined,
  });

  const error = (field: Field) =>
    errors[field] ? (
      <span id={`rsvp-${field}-error`} className={styles.error}>
        {errors[field]}
      </span>
    ) : null;

  return (
    <section id="rsvp" className={`section ${styles.section}`}>
      <FadeIn>
        <header className={styles.header}>
          <p className="eyebrow">Confirmação de presença</p>
          <h2>{weddingData.rsvp.title}</h2>
          <span className="ornament" />
          <p className={styles.sub}>{weddingData.rsvp.subtitle}</p>
        </header>
      </FadeIn>
      <FadeIn>
        {status === "ok" ? (
          <div className={styles.success} role="status">
            <h3 ref={successRef} tabIndex={-1}>
              {weddingData.rsvp.successTitle}
            </h3>
            <p>{weddingData.rsvp.successText}</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={(event) => void onSubmit(event)} noValidate>
            <label>
              Nome completo
              <input
                {...fieldProps("name")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoComplete="name"
                maxLength={120}
              />
              {error("name")}
            </label>
            <label>
              <span className={styles.labelText}>
                E-mail <span className={styles.optional}>(opcional)</span>
              </span>
              <input
                {...fieldProps("email")}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                autoCapitalize="none"
                maxLength={180}
              />
              {error("email")}
            </label>
            <label>
              Telefone
              <input
                {...fieldProps("phone")}
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                autoComplete="tel"
                maxLength={30}
              />
              {error("phone")}
            </label>
            <fieldset
              aria-invalid={errors.attending ? true : undefined}
              aria-describedby={errors.attending ? "rsvp-attending-error" : undefined}
            >
              <legend>Você vai ao casamento?</legend>
              <label className={styles.radio}>
                <input
                  ref={(el) => {
                    fieldRefs.current.attending = el;
                  }}
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
              {error("attending")}
            </fieldset>
            <label>
              Observações
              <textarea
                {...fieldProps("notes")}
                rows={4}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                maxLength={800}
              />
              {error("notes")}
            </label>
            {formError ? (
              <p className={styles.formError} role="alert">
                {formError}
              </p>
            ) : null}
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Enviando..." : "Confirmar presença"}
            </Button>
          </form>
        )}
      </FadeIn>
    </section>
  );
}
