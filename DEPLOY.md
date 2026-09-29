# Deploy — GitHub Pages

Site de produção (project Pages):

**https://matheuspereira64.github.io/Wedding---M-B/**

O Vite gera o build em **`docs/`** com `base: '/Wedding---M-B/'`.

## 1. Ativar GitHub Pages (obrigatório)

> **Causa do 404 `main.tsx`:** se **Source** estiver em “Deploy from a branch” com pasta **`/` (raiz)**, o Pages publica o `index.html` de desenvolvimento (`<script src="/src/main.tsx">`). O browser pede `https://matheuspereira64.github.io/src/main.tsx` → **404**. O workflow Actions até gera o build certo, mas a fonte ativa continua sendo a raiz.

### Opção A — recomendada: GitHub Actions

1. Abra [Settings → Pages](https://github.com/MatheusPereira64/Wedding---M-B/settings/pages)
2. Em **Build and deployment → Source**, escolha **GitHub Actions** (não “Deploy from a branch”)
3. Em **Actions → Deploy GitHub Pages**, rode **Run workflow** (ou faça um push na `main`)

### Opção B — pasta `docs/` na branch

1. Em **Settings → Pages → Source**, escolha **Deploy from a branch**
2. Branch: `main` · Folder: **`/docs`** (não `/`)
3. Salve. Em 1–2 minutos o site deve carregar o JS/CSS gerados pelo Vite.

O workflow faz `vite build` → pasta `docs/` e, na opção A, publica só esse artefacto.

## 2. Secrets do EmailJS (obrigatório para RSVP)

O site em Pages é **estático** (sem Express). O RSVP envia e-mail via EmailJS.

Em **Settings → Secrets and variables → Actions**, crie:

| Secret | Origem |
|--------|--------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS → Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS → Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS → Account → Public Key |

O workflow injeta essas variáveis no `npm run build`.

Sem elas, o formulário RSVP em produção mostra erro de configuração.

## 3. Template EmailJS

- **To:** `matheuspereira6464@gmail.com`
- Inclua `{{attendance}}` ou `{{attendance_decision}}` para a decisão (Sim/Não) ficar clara
- Campos enviados: `guest_name`, `guest_email`, `guest_phone`, `attending`, `attendance`, `attendance_decision`, `notes`, `reply_to`, `to_email`

Veja `.env.example` para o texto sugerido do template.

## 4. Desenvolvimento local

```bash
cp .env.example .env   # preencha EmailJS se quiser testar o e-mail
npm install
npm run dev            # Vite + Express (RSVP via API se EmailJS não estiver no .env)
npm run build          # gera docs/ (preview: npm run preview → /Wedding---M-B/)
```

Com `VITE_EMAILJS_*` no `.env`, o RSVP usa EmailJS mesmo em `npm run dev`.
Sem elas, em desenvolvimento o formulário continua a usar `POST /api/rsvp` (Express).
