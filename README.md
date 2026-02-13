# Waxing Athens — Mobile-first booking app

App mobile-first para serviços de depilação. O cliente acessa o link, vê preços (Brasil R$ / Grécia €), adiciona serviços ao carrinho e finaliza pelo WhatsApp com mensagem pré-preenchida.

**Documentação:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — diagramas Mermaid (fluxo do usuário, componentes, rotas, camadas).

## Stack

- Next.js 14 (App Router)
- Tailwind CSS, Framer Motion
- Zustand (carrinho persistente), next-intl (EN/PT)
- Deploy: Vercel

## Desenvolvimento

```bash
npm install
cp .env.local.example .env.local
# Opcional: defina NEXT_PUBLIC_WHATSAPP_NUMBER no .env.local (ex:)
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). A raiz redireciona para `/en`.

## Variáveis de ambiente

- **NEXT_PUBLIC_WHATSAPP_NUMBER** — Número do WhatsApp com código do país, sem `+` nem espaços (ex: `).

## Deploy (Vercel)

1. **Antes:** faça commit e push do projeto (ex.: GitHub).
2. Acesse [vercel.com](https://vercel.com) e faça login.
3. **Add New Project** → importe o repositório do projeto.
4. Em **Environment Variables** adicione:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = ``
5. Clique em **Deploy**. Ao terminar, você recebe um link (ex.: `https://salao-xxx.vercel.app`).
6. Use esse link na bio, no WhatsApp ou onde quiser; a cada novo push, a Vercel faz redeploy automático.

## Funcionalidades

- Lista de serviços por categoria (Face, Body, Intimate)
- Detalhes do serviço em bottom sheet ao clicar no card
- Adicionar ao carrinho (ícone + no card ou no detalhe)
- Carrinho persistente (localStorage) com subtotal, taxa de deslocamento fixa (€5) e total
- Botão "Reservar via WhatsApp" abre o WhatsApp com mensagem pré-preenchida
- Navegação: botão central (casa) e ícone do carrinho na barra inferior
- Idiomas: bandeiras EN/PT no header
- Toast ao adicionar ao carrinho, cookie consent, FAQ, PWA manifest, error boundaries
