# Área dos noivos: gestão de convidados e confirmações (planejamento de UI)

> Prompt de exemplo para uma sessão do Claude Code neste repositório.
> Requer as skills `impeccable` e as de Emil Kowalski (`emil-design-eng`, `animate`, `mobile-native`,
> `pick-ui-library`, `prototype`) em `~/.claude/skills/`.
> Referências visuais que a Caroline enviou: telas do Chungdoi (lista de convidados com status e dashboard de RSVP).

## Objetivo
Planejar e prototipar a UI de uma **área restrita para os noivos** (admin). Nela eles acompanham as confirmações dos **80 convidados** do casamento, gerenciam a lista e veem um dashboard. O acesso fica num link discreto no canto superior do site.

Esta tarefa cobre **só a UI**, com dados de exemplo. Não implemente autenticação real, banco de dados nem API.

## Contexto do projeto
- **Site:** React 19 + TypeScript + Vite, CSS Modules, página única. A identidade está no `DESIGN.md` (se existir) e em `src/styles/tokens.css`:
  - **Cores:** marfim `#F7F4EC`, burgundy `#7A1F32`, dourado.
  - **Fontes:** Playfair Display e DM Sans.
- **Produção é estática** (GitHub Pages). Hoje o RSVP vai por e-mail via EmailJS e não é gravado em lugar nenhum. Em dev existe um Express que grava em `server/data/rsvps.json`.
  - Os campos do RSVP estão em `src/weddingData.ts` (`RsvpPayload`): nome, e-mail opcional, telefone, sim/não e observações.
- **Convites nominais:** o FAQ diz que o casamento é por convite e que cada convite vale só para as pessoas nomeadas nele. Um convite pode ter mais de uma pessoa (casal, família).
- **Quem usa:** os noivos, a maior parte do tempo no **celular**, por poucos minutos de cada vez ("quem ainda não respondeu?", "quantos confirmaram?"). É uma superfície de **operação**, não de persuasão.

## Skills e ordem
1. **`/impeccable shape`**: faça a entrevista de descoberta (1 ou 2 rodadas curtas) e escreva o brief. **Pare para eu confirmar o brief antes de qualquer código.** Pergunte só o que muda o resultado. Por exemplo:
   - se os convites terão link pessoal com o nome já preenchido;
   - que perguntas extras o RSVP deve ter (restrição alimentar, transporte);
   - se os dois noivos terão login;
   - se querem exportar a lista.
2. Com o brief confirmado, siga o **modo Operate** da Impeccable (`reference/operate.md`) dentro do mundo visual existente:
   - é uma extensão, não um redesign;
   - leia o `craft-floor.md` antes de editar.
3. **`pick-ui-library`** (Emil), só se algum componente pedir biblioteca (tabela virtualizada não é necessária para 80 linhas; sheet/drawer talvez). **Pergunte antes de instalar qualquer dependência.**
4. **`prototype`** (Emil), opcional, para comparar 2 ou 3 composições do dashboard mobile num seletor.
5. **`mobile-native`** e **`animate`** para o acabamento:
   - no celular: bottom sheet, safe areas e alvos de 44px;
   - movimento: 150 a 250ms, só para estado e feedback, sem coreografia de entrada.

A skill `design-taste-frontend` declara dashboards fora do escopo dela; não use aqui.

## Escopo da UI

### 1. Acesso
- Um link discreto no canto superior direito da navbar ("Área dos noivos", ou só um ícone com rótulo acessível). Ele não pode competir com o "Confirmar presença" nem distrair os convidados.
- Tela de login simples, no mesmo mundo visual, com estados de erro, carregando e sessão expirada.
- A área admin deve ser um **chunk separado** (lazy load ou entrada `admin.html`), para não pesar no convite dos convidados.
- A página admin tem `noindex`.

### 2. Visão geral (dashboard)
Números calculados sobre 80 pessoas:
- confirmados, não vão, pendentes e % que responderam, com uma barra de progresso até 80;
- divisão por lado (noivo e noiva) e por grupo (família, amigos, trabalho);
- respostas recentes, com data e hora;
- observações relevantes, como restrições alimentares e recados.

Números grandes e legíveis com algarismos tabulares, e **nada de gráfico pesado**: com 80 pessoas, números e listas curtas comunicam melhor.

### 3. Lista de convidados
- **Busca e filtros:** busca por nome; filtros por status (Todos, Vão, Não vão, Pendentes, com contagem em cada), grupo e lado; ordenação.
- **Linha de cada convidado:** nome, convite/grupo, status e observação, com leitura rápida no celular. Em telas estreitas vira lista de cartões, não tabela com scroll horizontal.
- **Ações por convidado:**
  - marcar resposta manualmente (quando alguém responde por WhatsApp);
  - editar;
  - copiar o link pessoal;
  - abrir uma mensagem de lembrete no WhatsApp para quem está pendente.
- **Ações em lote:** "lembrar todos os pendentes" e exportar CSV.
- **Estados:** vazio ("nenhum convidado neste filtro"), carregando (skeleton) e erro.

### 4. Convite e convidado (detalhe/edição)
- Um convite agrupa pessoas nomeadas. A edição acontece num **bottom sheet** no celular e num painel lateral no desktop; evite modal, a não ser que o foco protegido seja necessário.
- **Campos:** nomes das pessoas, grupo, lado, telefone, status por pessoa, observações e o link pessoal.

## Dados de exemplo e contrato
- Crie `src/admin/mock.ts` com **80 pessoas realistas** (nomes brasileiros variados, em convites de 1 a 4 pessoas), com a mistura de sim, não e pendente e algumas observações.
- Isole o acesso aos dados numa interface (`src/admin/data.ts`: `listGuests`, `updateGuest`, `getSummary`). O backend real, quando for escolhido, só implementa essa interface.
- Reaproveite os tipos do RSVP existentes, sem duplicar.

## Decisões em aberto (não invente; registre no brief)
- **Backend e autenticação.** O site é estático, então login e dados exigem um serviço. Candidatos:
  - Supabase (auth + Postgres com RLS);
  - Firebase;
  - AWS (Cognito + API + DynamoDB via CDK, a preferência registrada nas instruções da Caroline para infraestrutura AWS).

  **Senha no frontend não é segurança.** Sem backend, a área admin não pode ir para produção.
- **Link pessoal por convite.** Mudaria o RSVP público: nome preenchido e resposta ligada ao convite.
- **LGPD.** Nomes e telefones são dados pessoais: mínimo necessário, acesso só dos noivos, sem expor nada no bundle público.

## Restrições
- Não altere o site público além do link de acesso na navbar.
- Não altere fatos do `weddingData.ts`, a lógica atual do RSVP/EmailJS nem o `server/`.
- Não adicione dependências sem perguntar.
- **Não rode `npm run build`**: ele sobrescreve `docs/`. Para validar, use `npx --no-install vite build --outDir <pasta temporária>`.
- Não faça commit.

## Verificação
- Rode `npx --no-install tsc` e o build na pasta temporária.
- Inspecione em 390px, 430px, no celular deitado e em 1440px, com teclado e toque. Confira todos os estados: vazio, carregando, erro e lista cheia com 80.
- Rode `impeccable detect --json src/admin` sem achados sem explicação.
- Termine com:
  - capturas das telas;
  - o brief final;
  - a lista de decisões em aberto, com uma recomendação para cada.
