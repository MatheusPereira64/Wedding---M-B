---
name: Matheus & Brena
description: Convite digital de casamento, 26 de março de 2027, Manaus.
colors:
  burgundy: "#7a1f32"
  burgundy-deep: "#5c1520"
  gold: "#c4a574"
  gold-text: "#85653a"
  beige: "#d4c4b0"
  line-strong: "#8f7a66"
  ivory: "#f7f4ec"
  white: "#ffffff"
  ink: "#2c181c"
  ink-muted: "#6b4a50"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "clamp(3rem, 11vw, 5.8rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "clamp(2rem, 1.5rem + 2.2vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "0.01em"
  title-lg:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "1.75rem"
    fontWeight: 500
    lineHeight: 1.15
  title:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.15
  title-sm:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.15
  body:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  small:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.12em"
  eyebrow:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.22em"
rounded:
  hairline: "2px"
  pill: "999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "2.5rem"
  "8": "3.5rem"
  "9": "4.5rem"
  "10": "6.5rem"
components:
  button-primary:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.hairline}"
    padding: "0.85rem 1.6rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.burgundy-deep}"
    textColor: "{colors.ivory}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.hairline}"
    padding: "0.85rem 1.6rem"
  button-ghost:
    backgroundColor: "{colors.white}"
    textColor: "{colors.burgundy}"
    typography: "{typography.label}"
    rounded: "{rounded.hairline}"
    padding: "0.85rem 1.6rem"
  floating-action:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "48px"
  card:
    backgroundColor: "{colors.ivory}"
    rounded: "{rounded.hairline}"
    padding: "2rem 1.5rem"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "0.75rem 0.9rem"
    height: "48px"
---

# Design System: Matheus & Brena

## Overview

**Creative North Star: "O Convite de Papelaria"**

O site é um convite impresso fino que ganhou vida: papel marfim, tinta burgundy, filetes dourados e muito respiro. Cada tela deve parecer composta à mão, com a calma de um cartão que se recebe num envelope, e nunca a pressa de um template. A leitura acontece no celular, com um polegar, por convidados de todas as idades; por isso a elegância nunca custa legibilidade.

A personalidade é romântica e acolhedora. A página é plana como papel na maior parte do tempo e reserva calor (sombras suaves, formas arredondadas, movimento) para os momentos que o convidado vive uma vez: a abertura com os nomes, a confirmação de presença, o encerramento.

**Key Characteristics:**
- Papel marfim e branco alternados por seção, como folhas de um mesmo convite.
- Tipografia serifada (Playfair Display) para nomes e títulos; DM Sans para todo o resto.
- Burgundy só onde há ação ou assinatura; dourado como ornamento, nunca como texto sobre fundo claro.
- Filetes finos em vez de caixas pesadas; cantos quase retos.
- Movimento com propósito e sempre com alternativa para movimento reduzido.

## Colors

Uma paleta de papelaria: um neutro quente de papel, uma tinta profunda e um metal como ornamento.

### Primary
- **Tinta Burgundy** (burgundy): botões principais, estados ativos, erros de formulário, anel de foco sobre fundo claro. É a cor da ação.
- **Burgundy Profundo** (burgundy-deep): hover/pressão do botão principal, rodapé, degradê do Hero.

### Secondary
- **Filete Dourado** (gold): ornamentos (filete sob os títulos, linha da timeline, bordas de ícones), o "&" dos nomes e texto sobre fundo burgundy.
- **Dourado de Texto** (gold-text): a versão legível do dourado para texto pequeno sobre marfim e branco (4.87:1 e 5.36:1).

### Neutral
- **Papel Marfim** (ivory): fundo principal e cartões.
- **Papel Branco** (white): seções alternadas e campos de formulário.
- **Tinta** (ink): texto principal (15:1 sobre marfim).
- **Tinta Suave** (ink-muted): texto de apoio e descrições (7:1 sobre marfim).
- **Bege** (beige): filetes divisores e bordas de cartão.
- **Borda de Campo** (line-strong): contorno de inputs e fieldsets (3.7:1 sobre marfim).

### Named Rules
**A Regra do Ouro no Escuro.** O dourado claro só é texto sobre burgundy ou sobre foto com scrim; sobre marfim ou branco, use o dourado de texto.

**A Regra da Tinta na Ação.** Burgundy sólido marca o que se pode fazer. Não o use como decoração.

## Typography

**Display Font:** Playfair Display (com Georgia)
**Body Font:** DM Sans (com system-ui)

**Character:** Uma serifada de alto contraste, de convite, conversando com uma sans limpa e amigável. Só dois pesos (400 e 500) e itálico apenas na serifada.

### Hierarchy
- **Display** (400, clamp(3rem, 11vw, 5.8rem), 0.95): os nomes no Hero. No celular deitado cabem numa linha.
- **Headline** (500, clamp(2rem, 1.5rem + 2.2vw, 2.75rem), 1.15): o título de cada seção, sempre o mesmo tamanho.
- **Title Lg** (500, 1.75rem): nomes dos noivos, mensagem de sucesso do RSVP, subtítulo do local no desktop.
- **Title** (500, 1.5rem): títulos de cartão (PIX, presentes, momentos da história, local no celular).
- **Title Sm** (500, 1.25rem): itens da programação, nome no cartão PIX.
- **Body** (400, 1rem, 1.65): todo texto corrido; largura máxima de 38rem (cerca de 65 caracteres).
- **Small** (400, 0.9375rem): rótulos e erros de formulário, dicas. É o menor texto de leitura.
- **Label** (500, 0.8125rem, 0.12em, caixa alta): botões, unidades da contagem, links do rodapé.
- **Eyebrow** (500, 0.8125rem, 0.22em, caixa alta): no máximo 4 seções têm eyebrow.

### Named Rules
**A Regra do Leitor de Óculos.** Nenhum texto de leitura abaixo de 0.9375rem, nenhum rótulo abaixo de 0.8125rem. Um parente mais velho no celular é o leitor de referência.

**A Regra do Título Único.** Um título de cartão nunca é maior que o título da sua seção.

## Layout

Coluna única no celular, com gutter de 1.25rem que respeita as safe areas; conteúdo limitado a 72rem no desktop e texto corrido a 38rem. Cada seção tem 4.5rem de respiro vertical no celular e 6.5rem a partir de 768px; a contagem regressiva tem menos (3.5rem, é uma coda do Hero) e a confirmação de presença tem mais (6rem no celular e 8rem no desktop, é o clímax).

O bloco de título (eyebrow, título, filete, subtítulo) fica sempre a 2.5rem do conteúdo. Cartões irmãos ficam a 0.75rem uns dos outros. Toda medida vem da escala de espaçamento (0.25 a 6.5rem).

A ordem da página serve à pergunta do convidado: quem, quando e onde; programação; confirmar; presentear; e só depois história, galeria e o casal. O menu completo aparece a partir de 1080px; abaixo disso, menu hambúrguer e uma barra fixa "Confirmar presença" entre o Hero e o RSVP.

## Elevation & Depth

O papel é plano: a profundidade vem da alternância marfim/branco e dos filetes, não de sombras. Sombras aparecem só em elementos que flutuam sobre o papel e são sempre tingidas de burgundy.

### Shadow Vocabulary
- **Flutuante** (`box-shadow: 0 10px 30px rgba(92, 21, 32, 0.28)`): a barra fixa de confirmação no celular.
- **Menu** (`box-shadow: 0 18px 50px rgba(92, 21, 32, 0.08)`): menu aberto e navbar sólida.

### Named Rules
**A Regra do Papel Plano.** Nada que está no papel tem sombra. Só o que flutua sobre ele.

## Shapes

Cantos quase retos (2px) em botões, cartões e campos, como papel cortado. A forma arredondada é reservada para o que é pessoal ou flutuante: os retratos dos noivos em círculo com anel dourado e a barra de confirmação em pílula. Bordas são filetes de 1px.

## Components

Românticos e acolhedores sobre uma base de papelaria contida: o calor aparece na resposta ao toque e nos momentos especiais, não em enfeite constante.

### Buttons
- **Shape:** cantos quase retos (2px), altura mínima de 48px.
- **Primary:** tinta burgundy com texto marfim, rótulo em caixa alta (0.8125rem, 0.12em).
- **Hover / Focus:** burgundy profundo no hover (só com mouse); anel de foco de 2px com 3px de afastamento, burgundy no papel e marfim sobre fundos escuros; ao toque, encolhe para 0.97 em 120ms.
- **Secondary:** contorno dourado sobre o Hero. **Ghost:** fundo branco com contorno de campo e texto burgundy.

### Cards / Containers
- **Corner Style:** 2px.
- **Background:** marfim sobre seções brancas, branco sobre seções marfim.
- **Shadow Strategy:** nenhuma (Regra do Papel Plano).
- **Border:** filete bege de 1px.
- **Internal Padding:** 2rem por 1.5rem.

### Inputs / Fields
- **Style:** fundo branco, contorno de campo (line-strong), 2px, texto de 16px para o iPhone não dar zoom.
- **Focus:** contorno burgundy e anel de foco.
- **Error:** contorno burgundy com mensagem abaixo do campo (0.9375rem, peso 500), ligada por aria-describedby; o foco vai para o primeiro erro.

### Navigation
Transparente sobre o Hero e papel marfim translúcido depois da rolagem. Links em caixa alta (0.78rem) com filete dourado sob o ativo. No celular, menu que desce da barra com links em Playfair; Esc fecha e o foco circula dentro dele.

### Barra de confirmação (Signature Component)
Pílula burgundy fixa no rodapé da tela, só no celular, visível entre o fim do Hero e a chegada ao RSVP. Entra em 240ms e sai em 180ms; com movimento reduzido, só aparece e some.

## Do's and Don'ts

### Do:
- **Do** use o dourado de texto (#85653a) para qualquer texto dourado sobre marfim ou branco.
- **Do** mantenha o título de seção no token headline e o bloco de título a 2.5rem do conteúdo.
- **Do** guarde o movimento para momentos únicos (nomes, confirmação, encerramento) e dê a cada animação uma alternativa com movimento reduzido.
- **Do** proteja hover com `(hover: hover) and (pointer: fine)` e dê feedback de toque com `:active`.
- **Do** mantenha alvos de toque com pelo menos 44px.

### Don't:
- **Don't** use o dourado claro (#c4a574) como texto sobre fundo claro nem sobre foto sem scrim.
- **Don't** crie um título de cartão maior que o título da seção.
- **Don't** coloque sombra em cartões apoiados no papel.
- **Don't** use texto de leitura abaixo de 0.9375rem nem rótulos abaixo de 0.8125rem.
- **Don't** repita a mesma informação (dress code, horários) em várias seções; cada fato tem uma casa.
