# Efeitos especiais no site do casamento Matheus & Brena

> Prompt de exemplo para uma sessão do Claude Code neste repositório, a partir da branch `feat/refinar-ui`.
> Requer as skills `impeccable`, `design-taste-frontend` e as de Emil Kowalski (`animate`, `emil-design-eng`)
> instaladas em `~/.claude/skills/`.

## Contexto
O site já passou por um refinamento (veja `.claude/prompts/refinar-ui.md`). A identidade está fixada:
- **Cores:** marfim, burgundy e dourado.
- **Fontes:** Playfair Display e DM Sans.
- **Tom:** editorial e romântico.
- **Tokens de movimento** em `src/styles/tokens.css`: `--ease-out`, `--dur-*`.

Os convidados abrem o site pelo celular, a partir de um link no WhatsApp. O objetivo agora é criar **poucos momentos memoráveis**, que façam o site parecer um convite de papelaria fina ganhando vida. Não é para espalhar efeitos pela página.

## Skills a usar
1. **`/impeccable delight`** e **`/impeccable animate`**. Leia os guias `delight.md`, `animate.md` e `craft-floor.md` da skill. Consulte o `overdrive.md` só se um efeito pedir técnica avançada.
2. **`animate`** (Emil) para decidir cada efeito na ordem certa:
   1. deve animar?
   2. com que propósito?
   3. com que ferramenta?
   4. em quais propriedades?
   5. com que curva e duração?
   6. como é interrompido?
   7. como sai?
3. **`design-taste-frontend`** como filtro final. Todo efeito precisa de um motivo em uma frase: hierarquia, narrativa, feedback ou mudança de estado. Nada de loop infinito decorativo.

## Efeitos candidatos
Escolha no máximo 5 e justifique os descartados.
- **Hero:** os nomes se revelam com `clip-path` ou máscara, como tinta num convite, e o "&" dourado ganha um brilho que passa uma vez.
- **Nossa história:** a linha da timeline se desenha conforme a rolagem, e cada ponto "acende" quando a linha chega nele.
- **Galeria:** as fotos se revelam com `clip-path: inset()` ao entrar na tela.
- **Contagem regressiva:** os números rolam na vertical quando mudam, sem piscar.
- **Confirmação do RSVP:** uma chuva curta de pétalas ou confete dourado. É o pico emocional de quem confirma "sim".
- **Encerramento:** a foto aproxima devagar conforme a rolagem (efeito Ken Burns ligado ao scroll).

## Regras técnicas
- **Sem dependências novas.** Use CSS, `@keyframes`, scroll-driven animations (`animation-timeline: view()`) com fallback por IntersectionObserver, Web Animations API e `<canvas>` quando for o caso.
- **Desempenho:** anime só `transform`, `opacity`, `clip-path` e `filter` leve. Nenhum `window.addEventListener("scroll")` novo.
- **Movimento reduzido:** todo efeito tem alternativa sob `prefers-reduced-motion`. Deslocamento vira fade curto; partículas e zoom somem.
- **Durações:** revelações de 600 a 1200ms; feedback abaixo de 300ms. Um efeito que o convidado vê várias vezes não pode atrasar a leitura.
- **Canvas:** partículas usam `requestAnimationFrame`, param sozinhas (até cerca de 2,5s), respeitam o `devicePixelRatio` e são removidas do DOM no fim.
- Não altere textos, dados do `weddingData.ts`, a lógica do RSVP/EmailJS nem o `server/`.
- **Não rode `npm run build`**: ele sobrescreve `docs/`. Para validar, use `npx --no-install vite build --outDir <pasta temporária>`.
- Não faça commit.

## Verificação
- Rode `npx --no-install tsc`, `npx --no-install tsc -p server/tsconfig.json` e o build na pasta temporária. Tudo precisa passar.
- Rode `npm run dev` e faça uma rodada de inspeção em 390px e em 1440px. Confira também cada efeito com `prefers-reduced-motion: reduce` emulado.
- Rode o detector da Impeccable (`impeccable detect --json`) nos arquivos alterados.
- Termine com uma tabela: efeito, propósito, técnica, duração e fallback. Depois, o que ficou de fora e por quê.
