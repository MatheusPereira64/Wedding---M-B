# Matheus & Brena — site de casamento

Convite digital do casamento de **Matheus e Brena**, em **26 de março de 2027**, na **Maison Myrla Eventos** (Manaus - AM).

A página é um site único, mobile-first, com visual editorial (burgundy, ouro e marfim). O convidado encontra rápido quem casa, quando, onde, como confirmar presença e como presentear.

**Site (GitHub Pages):** [https://matheuspereira64.github.io/Wedding---M-B/](https://matheuspereira64.github.io/Wedding---M-B/)

Guia completo de publicação: [`DEPLOY.md`](DEPLOY.md).

## O que o site tem

1. **Hero** — foto, nomes, data e atalhos para RSVP e detalhes  
2. **Contagem regressiva** — até o dia 26/03/2027  
3. **Nossa história** — timeline do casal  
4. **Os noivos** — foto e texto de cada um  
5. **Galeria** — grid com lightbox  
6. **Local** — endereço, mapa e “Como chegar”  
7. **Programação** — cerimônia, recepção, jantar, festa e encerramento  
8. **RSVP** — formulário de confirmação (e-mail via EmailJS em produção)  
9. **Presentes** — links das listas + PIX  
10. **Dress code** — social / esporte fino  
11. **FAQ**  
12. **Mensagem final** e rodapé  

## Como rodar

Precisa de Node.js 20 ou superior.

```bash
npm install
cp .env.example .env   # opcional: preencha EmailJS para testar o e-mail
npm run dev
```

Isso sobe os dois serviços:

| Serviço   | Endereço                 |
|-----------|--------------------------|
| Site      | http://localhost:5173    |
| API       | http://localhost:8787    |

No desenvolvimento, o Vite encaminha `/api` para a API.

Outros comandos:

```bash
npm run dev:web   # só o frontend
npm run dev:api   # só o backend
npm run build     # build de produção → pasta docs/
npm run preview   # preview do build (base /Wedding---M-B/)
```

## GitHub Pages

O workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) faz `npm ci`, `npm run build` e publica `docs/` automaticamente em cada push na `main`.

1. **Settings → Pages** — use **GitHub Actions**, ou branch `main` com pasta **`/docs`** (nunca a raiz `/`). Ver [`DEPLOY.md`](DEPLOY.md).
2. Secrets (Actions) com EmailJS — ver [`.env.example`](.env.example) e [`DEPLOY.md`](DEPLOY.md)

## Onde personalizar

Quase todo o conteúdo do casamento fica em um arquivo:

**[`src/weddingData.ts`](src/weddingData.ts)**

Altere ali:

- nomes, bios e fotos dos noivos  
- data, horário e fuso (`America/Manaus`)  
- local, endereço e texto de estacionamento / acessibilidade  
- história, galeria, programação e FAQ  
- chave PIX, nome e imagem do QR (se quiser usar um QR pronto)  
- textos do RSVP e da seção de presentes  

### Lista de presentes

Os links das lojas ficam em **[`server/data/gifts.json`](server/data/gifts.json)** (também embutidos no frontend para Pages).

```json
{
  "id": "lista-principal",
  "title": "Lista de presentes",
  "store": "Nome da loja",
  "url": "https://...",
  "description": "Escolha um presente para nos ajudar a construir nosso novo lar."
}
```

Com `url` vazio, o site mostra “Link em breve”. Dá para adicionar várias listas no mesmo arquivo.

### Confirmações de presença (RSVP)

O formulário envia nome, e-mail, telefone, presença (sim/não) e observações.

| Ambiente | Como funciona |
|----------|----------------|
| **GitHub Pages** | EmailJS no browser → e-mail para `matheuspereira6464@gmail.com` |
| **Local sem EmailJS** | `POST /api/rsvp` no Express → `server/data/rsvps.json` |
| **Local com EmailJS** | Mesmo fluxo de produção (e-mail) |

Variáveis (nunca commitadas — só `.env` / GitHub Secrets):

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

O casamento é por convite, sem campo de acompanhantes.

Endpoints da API local (opcional em desenvolvimento):

| Método | Rota          | Função                         |
|--------|---------------|--------------------------------|
| GET    | `/api/health` | API no ar                      |
| POST   | `/api/rsvp`   | Grava uma confirmação          |
| GET    | `/api/gifts`  | Devolve os links das listas    |

## Área dos noivos

Página separada em `admin.html` (acesso pelo cadeado no canto superior do site), para os noivos acompanharem as confirmações dos 80 convidados:

- **Visão geral:** quantos responderam, vão, não vão e estão pendentes, com divisão por lado e grupo, respostas recentes e observações.
- **Convidados:** busca, filtros, link pessoal por convite, lembrete pelo WhatsApp, edição e exportação em CSV.

Por enquanto é **só a camada de UI**, com dados fictícios salvos no navegador. Login de demonstração: `noivos@demo.local` / `convite2027`.

O backend planejado é AWS: usuários no Cognito, dados no DynamoDB e hospedagem no Amplify. As telas leem tudo pelas interfaces `AuthService` e `InviteRepository` em [`src/admin/data.ts`](src/admin/data.ts). Para ligar a AWS, basta criar adaptadores que implementem essas interfaces e trocá-los nesse arquivo.

## Estrutura do projeto

```
src/
  weddingData.ts          conteúdo do casamento
  admin/                  área dos noivos (UI com dados de exemplo)
  api/                    RSVP (EmailJS + API) e presentes
  components/
    layout/               navbar e rodapé
    sections/             cada bloco da página
    ui/                   botão, FAQ, lightbox, QR
  styles/                 cores e estilos globais

server/
  src/                    Express (rotas, validação, gravação) — só local
  data/gifts.json         links das listas
  data/rsvps.json         confirmações locais (gerado ao usar a API)

.github/workflows/        deploy GitHub Pages
docs/                     saída do build (gerada no CI; não versionar)
```

## Visual

- Fundo marfim `#F7F4EC`  
- Texto vinho-escuro `#2C181C`  
- Destaque burgundy `#7A1F32`  
- Detalhes ouro `#C4A574`  
- Títulos: Playfair Display  
- Textos: DM Sans  

As fotos atuais são placeholders. Troque as URLs em `weddingData.ts` pelas fotos reais do casal.

## Stack

React, TypeScript e Vite no frontend. EmailJS para RSVP em produção (Pages). Express no backend local, com dados em JSON. Tudo em um único repositório.
