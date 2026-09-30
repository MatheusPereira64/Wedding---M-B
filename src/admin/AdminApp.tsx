import { useCallback, useEffect, useState, type ReactNode } from "react";
import { auth, invites as repo, isDemo } from "./data";
import { downloadCsv } from "./format";
import { emptyFilters, GuestList, type Filters } from "./GuestList";
import { InviteSheet } from "./InviteSheet";
import { Login } from "./Login";
import { resetDemo } from "./mockAdapter";
import { Overview } from "./Overview";
import { RemindersSheet } from "./RemindersSheet";
import type { Invite } from "./types";
import styles from "./Admin.module.css";

export function AdminApp() {
  const [session, setSession] = useState<"checking" | "in" | "out">("checking");

  useEffect(() => {
    void auth.hasSession().then((ok) => setSession(ok ? "in" : "out"));
  }, []);

  if (session === "checking") return null;
  if (session === "out") return <Login onSignedIn={() => setSession("in")} />;
  return (
    <Dashboard
      onSignOut={async () => {
        await auth.signOut();
        setSession("out");
      }}
    />
  );
}

type Tab = "overview" | "guests";
const tabFromHash = (): Tab => (window.location.hash === "#convidados" ? "guests" : "overview");

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>(tabFromHash);
  const [data, setData] = useState<Invite[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [editing, setEditing] = useState<Invite | null | undefined>(undefined);
  const [reminders, setReminders] = useState(false);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoadError(false);
    setData(null);
    try {
      setData(await repo.list());
    } catch {
      setLoadError(true);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const onHash = () => setTab(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(""), 4000);
    return () => window.clearTimeout(id);
  }, [notice]);

  const go = (next: Tab) => {
    window.location.hash = next === "guests" ? "convidados" : "visao-geral";
    setTab(next);
    window.scrollTo({ top: 0 });
  };

  const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
    {
      id: "overview",
      label: "Visão geral",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      ),
    },
    {
      id: "guests",
      label: "Convidados",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.5A6.5 6.5 0 0 1 21.5 20" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.app}>
      <header className={styles.top}>
        <div className={styles.topInner}>
          <div className={styles.brand}>
            <p className={styles.brandNames}>Matheus & Brena</p>
            <h1>Área dos noivos</h1>
          </div>
          <nav className={styles.topTabs} aria-label="Seções">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.topTab}
                aria-current={tab === item.id ? "page" : undefined}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button type="button" className={styles.signOut} onClick={onSignOut}>
            Sair
          </button>
        </div>
      </header>

      {isDemo ? (
        <div className={styles.demoBar}>
          <p>Demonstração: dados fictícios, salvos só neste navegador.</p>
          <button
            type="button"
            onClick={() => {
              resetDemo();
              void load();
              setNotice("Dados de exemplo restaurados.");
            }}
          >
            Restaurar exemplo
          </button>
        </div>
      ) : null}

      <main className={styles.main}>
        <h2 className={styles.pageTitle}>{tab === "overview" ? "Visão geral" : "Convidados"}</h2>
        {loadError ? (
          <div className={styles.emptyState} role="alert">
            <p>Não foi possível carregar os convidados.</p>
            <button type="button" className={styles.primaryAction} onClick={() => void load()}>
              Tentar de novo
            </button>
          </div>
        ) : data === null ? (
          <Skeleton />
        ) : tab === "overview" ? (
          <Overview
            invites={data}
            onFilterStatus={(status) => {
              setFilters({ ...emptyFilters, status });
              go("guests");
            }}
            onReminders={() => setReminders(true)}
          />
        ) : (
          <GuestList
            invites={data}
            filters={filters}
            onFilters={setFilters}
            onEdit={(invite) => setEditing(invite)}
            onNew={() => setEditing(null)}
            onReminders={() => setReminders(true)}
            onExport={(list) => {
              downloadCsv(list);
              setNotice("Planilha exportada.");
            }}
          />
        )}
      </main>

      <nav className={styles.bottomNav} aria-label="Seções">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={styles.bottomTab}
            aria-current={tab === item.id ? "page" : undefined}
            onClick={() => go(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <p className={styles.notice} role="status" data-visible={notice ? "" : undefined}>
        {notice}
      </p>

      <InviteSheet
        invite={editing}
        onClose={() => setEditing(undefined)}
        onSaved={(saved, message) => {
          setData((current) => {
            const list = current ?? [];
            const exists = list.some((item) => item.id === saved.id);
            return exists ? list.map((item) => (item.id === saved.id ? saved : item)) : [...list, saved];
          });
          setEditing(undefined);
          setNotice(message);
        }}
        onRemoved={(id, label) => {
          setData((current) => (current ?? []).filter((item) => item.id !== id));
          setEditing(undefined);
          setNotice(`Convite “${label}” excluído.`);
        }}
      />
      <RemindersSheet open={reminders} invites={data ?? []} onClose={() => setReminders(false)} />
    </div>
  );
}

function Skeleton() {
  return (
    <div className={styles.skeleton} aria-busy="true" aria-label="Carregando convidados">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={styles.skeletonCard} />
      ))}
    </div>
  );
}
