# Deploy — GitHub Pages

Site de produção (project Pages):

**https://matheuspereira64.github.io/Wedding---M-B/**

O Vite gera o build em **`docs/`** com `base: '/Wedding---M-B/'`.

## 1. Ativar GitHub Pages

1. Abra o repositório → **Settings → Pages**
2. Em **Build and deployment → Source**, escolha **GitHub Actions**
3. Faça merge na `main` (ou dispare o workflow manualmente em **Actions → Deploy GitHub Pages**)

Não use a opção “Deploy from a branch /docs” se o workflow Actions estiver ativo — o Actions já publica o artefacto.

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
