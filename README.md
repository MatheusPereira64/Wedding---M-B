# Matheus & Brena — site de casamento

Convite digital do casamento de **Matheus e Brena**, em **26 de março de 2027**, na **Maison Myrla Eventos** (Manaus - AM).

A página é um site único, mobile-first, com visual editorial (burgundy, ouro e marfim). O convidado encontra rápido quem casa, quando, onde, como confirmar presença e como presentear.

## O que o site tem

1. **Hero** — foto, nomes, data e atalhos para RSVP e detalhes  
2. **Contagem regressiva** — até o dia 26/03/2027  
3. **Nossa história** — timeline do casal  
4. **Os noivos** — foto e texto de cada um  
5. **Galeria** — grid com lightbox  
6. **Local** — endereço, mapa e “Como chegar”  
7. **Programação** — cerimônia, recepção, jantar, festa e encerramento  
8. **RSVP** — formulário de confirmação, gravado no backend  
9. **Presentes** — links das listas + PIX  
10. **Dress code** — social / esporte fino  
11. **FAQ**  
12. **Mensagem final** e rodapé  

## Como rodar

Precisa de Node.js 20 ou superior.

```bash
npm install
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
npm run build     # build de produção do site
```

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

Os links das lojas ficam em **[`server/data/gifts.json`](server/data/gifts.json)**.

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

### Confirmações de presença

O formulário envia `POST /api/rsvp` com nome, e-mail, telefone, acompanhantes, presença e observações.

As respostas são salvas em `server/data/rsvps.json` (arquivo local, fora do Git). O mesmo e-mail não pode confirmar duas vezes.

Endpoints da API:

| Método | Rota          | Função                         |
|--------|---------------|--------------------------------|
| GET    | `/api/health` | API no ar                      |
| POST   | `/api/rsvp`   | Grava uma confirmação          |
| GET    | `/api/gifts`  | Devolve os links das listas    |

## Estrutura do projeto

```
src/
  weddingData.ts          conteúdo do casamento
  api/                    cliente HTTP (RSVP e presentes)
  components/
    layout/               navbar e rodapé
    sections/             cada bloco da página
    ui/                   botão, FAQ, lightbox, QR
  styles/                 cores e estilos globais

server/
  src/                    Express (rotas, validação, gravação)
  data/gifts.json         links das listas
  data/rsvps.json         confirmações (gerado ao usar o site)
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

React, TypeScript e Vite no frontend. Express no backend, com dados em JSON para começar. Tudo em um único repositório.
