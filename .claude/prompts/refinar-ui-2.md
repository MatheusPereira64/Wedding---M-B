# Segunda rodada de refinamento de UI: site do casamento Matheus & Brena

> Prompt de exemplo para uma sessão do Claude Code na branch `feat/refinamento-ui`.
> Continua o trabalho de `refinar-ui.md` e `efeitos-especiais.md`.
> Requer as skills `impeccable`, `design-taste-frontend` e as de Emil Kowalski em `~/.claude/skills/`.

## Contexto
O site já passou por três etapas:
- uma crítica inicial (20/40 nas heurísticas de Nielsen, 11/20 na auditoria técnica), com snapshot em `.impeccable/critique/`;
- um refinamento de P1 e P2;
- efeitos especiais e uma revisão de responsividade.

A identidade continua fixada:
- **Cores:** marfim, burgundy e dourado.
- **Fontes:** Playfair Display e DM Sans.
- **Tom:** editorial e romântico.

A maioria dos convidados abre pelo celular, a partir de um link no WhatsApp, e há parentes mais velhos entre eles. O objetivo desta rodada é **acabamento**: tipografia, ritmo de espaçamento, consistência e estados. Não é redesign.

## Fluxo
Segue a ordem recomendada na documentação da Impeccable (impeccable.style/docs): avaliar, refinar, polir e documentar.

1. **`/impeccable critique`** na página inteira, com as duas avaliações isoladas em subagentes, para medir a evolução em relação ao snapshot anterior. Registre a tendência.
2. **`/impeccable typeset`**: avaliação tipográfica e `impeccable detect --scope type`. Defina os papéis (display, título, corpo, rótulo, metadado, número), a escala de tamanhos, a medida de leitura (45 a 75ch) e o corpo de pelo menos 16px no celular. Remova do Google Fonts os pesos que não são usados.
3. **`/impeccable layout`**: avaliação de layout (teste de desfoque, agrupamento, ritmo, densidade) e `impeccable detect --scope layout`. Troque os espaçamentos avulsos por uma escala de espaçamento em tokens e crie um ritmo deliberado entre intervalos curtos e longos.
4. **Movimento**: revise tudo contra os 10 padrões e o `STANDARDS.md` do `review-animations` (Emil), incluindo os efeitos especiais. Corrija só o que violar os padrões.
5. **`design-taste-frontend`**: rode a Pre-Flight Check (seção 14) nos itens que se aplicam a um refinamento que preserva a identidade.
6. **`/impeccable polish`**: passe final no caminho completo. Leia o snapshot da crítica com `critique-storage latest` e feche-o com `critique-storage close` se todas as prioridades forem resolvidas.
7. **`/impeccable document`**: gere o `DESIGN.md` (e o sidecar `.impeccable/design.json`) a partir do código final, para que ele registre os tokens novos de tipografia e espaçamento. Não rode `init`, que exige entrevista; fica como sugestão ao final.

## Restrições
- Não altere fatos nem textos do `weddingData.ts` (nomes, datas, local, PIX, URLs). Se um texto atrapalhar, proponha a mudança no relatório final.
- Não mude a lógica do RSVP/EmailJS nem o `server/`.
- Não adicione dependências.
- Preserve os efeitos especiais e seus fallbacks de movimento reduzido.
- **Mobile primeiro.** Verifique em 320, 375, 390 e 430px em retrato, no celular deitado (844×390), no tablet (768px) e no desktop (1440px).
- **Não rode `npm run build`**: ele sobrescreve `docs/`. Para validar, use `npx --no-install vite build --outDir <pasta temporária>`.
- Não faça commit.

## Verificação
- Rode `npx --no-install tsc` e `npx --no-install tsc -p server/tsconfig.json`, e o build na pasta temporária.
- Rode `impeccable detect --json src` sem achados novos.
- Faça uma rodada de inspeção nos tamanhos listados, com no máximo uma rodada extra de confirmação.
- Termine com três itens:
  - a pontuação nova da crítica comparada com a anterior;
  - uma tabela antes/depois das mudanças de tipografia e espaçamento;
  - o que ficou de fora e por quê.
