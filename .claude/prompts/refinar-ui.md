# Refinar o site do casamento Matheus & Brena com as skills de UI

> Prompt de exemplo para uma sessão do Claude Code neste repositório.
> Requer as skills `impeccable` ([pbakaus/impeccable](https://github.com/pbakaus/impeccable)),
> `design-taste-frontend` ([Leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill)) e as de
> Emil Kowalski ([emilkowalski/skills](https://github.com/emilkowalski/skills)) instaladas em `~/.claude/skills/`.

## Contexto
Este repositório é o convite digital do casamento de Matheus & Brena: 26/03/2027, Maison Myrla Eventos, Manaus-AM.
- **Stack:** React 19, TypeScript, Vite 8 e CSS Modules. É uma página única, mobile-first.
- **Seções:** ficam em `src/components/sections/`. A ordem está em `src/App.tsx`.
- **Identidade visual atual** (fica em `src/styles/tokens.css` e `global.css`):
  - Cores: marfim `#F7F4EC`, texto `#2C181C`, burgundy `#7A1F32` / `#5C1520`, ouro `#C4A574`, bege `#D4C4B0`.
  - Fontes: Playfair Display nos títulos e DM Sans nos textos.
  - Tom: editorial e romântico.
- **Movimento atual:** `FadeIn` (translateY 22px, 0.9s), a entrada do Hero, a lightbox da galeria e o menu (acordeão) do FAQ. Já existe tratamento de `prefers-reduced-motion`.
- **Público:** convidados de todas as idades, abrindo pelo celular pelo link do WhatsApp. Em cada página, o sucesso é a pessoa entender rápido **quem casa, quando e onde**, **confirmar presença** e **achar o PIX e a lista de presentes**.

## Objetivo
Isto é um **refinamento**, não um redesign. Mantenha a identidade, as cores, as fontes, os textos e a estrutura das seções. Eleve o acabamento até parecer um convite de papelaria fina, e não um template.

## Skills a usar, nesta ordem
1. **`/impeccable critique`** e depois **`/impeccable audit`** na página inteira. Rode o setup da skill: se o launcher falhar, siga o fallback dela. Modo: **Persuade**, com peso forte em mobile.
2. **`design-taste-frontend`** no modo audit-first de redesign existente. Use só para achar padrões genéricos de template: grids de cards iguais, espaçamento uniforme, hierarquia tímida, emoji como ícone (o 🎁 em Gifts, por exemplo).
3. **`emil-design-eng`** e **`/review-animations`** em todo o código de movimento: `FadeIn`, Hero, Lightbox, Accordion, Navbar e as transições de botões e links.
4. **`mobile-native`** para os detalhes de celular:
   - safe areas (o `viewport-fit=cover` já está no HTML);
   - o bug do 100vh no Hero;
   - zoom indesejado nos inputs do RSVP;
   - tap highlight;
   - hover que fica "preso" no toque;
   - swipe na lightbox.

## Checkpoint obrigatório
Depois dos passos 1 a 4, **pare e me mostre um plano único e priorizado** (P0, P1 e P2), com arquivo e mudança concreta em cada item, com valores exatos (duração, easing, espaçamento, tamanho de fonte). Junte achados repetidos entre as skills. **Não edite nada antes da minha aprovação.**

## Restrições
- Não altere textos, datas, nomes, chave PIX nem URLs de `src/weddingData.ts`. As fotos são placeholders e vão continuar sendo.
- Não mexa na lógica do RSVP e do EmailJS (`src/api/`) nem no `server/`.
- Não adicione dependência sem pedir. Prefira CSS puro.
- Preserve e amplie o suporte a `prefers-reduced-motion`. Acessibilidade:
  - contraste AA;
  - foco visível;
  - áreas de toque de 44px ou mais.
- **Não rode `npm run build`**: ele sobrescreve `docs/`, que está no git. Para validar o build, use `npx --no-install vite build --outDir <pasta temporária>`.
- Não faça commit.

## Verificação depois de aplicar
- Rode `npx --no-install tsc` e `npx --no-install tsc -p server/tsconfig.json` sem erros.
- Rode o build para a pasta temporária. Ele precisa passar.
- Rode `npm run dev` e abra `http://localhost:5173/Wedding---M-B/`. Faça uma rodada de inspeção em 390px e em 1440px e corrija tudo o que aparecer, em um lote só. No máximo mais uma rodada de confirmação.
- Termine com um resumo do que mudou por seção e do que ficou de fora e por quê.
