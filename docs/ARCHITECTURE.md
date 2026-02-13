# Arquitetura — Waxing Athens

Documentação da estrutura e fluxos do app (diagramas em Mermaid; o GitHub renderiza automaticamente).

---

## Fluxo do usuário (cliente no celular)

```mermaid
flowchart TD
  A[Cliente abre link] --> B[Vê lista de preços]
  B --> C{Clica no card?}
  C -->|Sim| D[Sheet Detalhes do serviço]
  D --> E[Adiciona ao carrinho]
  E --> F[Volta à lista]
  C -->|Não| G[Clica no ícone carrinho no card]
  G --> E
  F --> B
  B --> H[Clica ícone carrinho / Reserva]
  H --> I[Drawer Carrinho]
  I --> J[Clica Fechar serviço]
  J --> K[WhatsApp abre com mensagem]
  I --> L[Clica casinha]
  L --> B
```

---

## Telas e componentes (frontend)

```mermaid
flowchart TB
  subgraph app [App]
    Layout[layout.tsx]
    Page[page.tsx]
  end
  Layout --> Header[Header: título + bandeiras EN/PT]
  Layout --> Page
  Page --> TravelFee[Taxa deslocamento fixa]
  Page --> ServiceList[Lista de serviços]
  Page --> BottomNav[BottomNav: casinha central + carrinho]
  ServiceList --> ServiceCard[ServiceCard: nome, preço, ícone +]
  ServiceCard -->|clique no card| ServiceDetail[ServiceDetail: sheet detalhes]
  ServiceCard -->|clique no +| CartStore[Zustand: addItem]
  BottomNav -->|carrinho| Cart[Cart: drawer itens + WhatsApp]
  BottomNav -->|casinha| Page
  Cart --> WhatsApp[wa.me + mensagem]
```

---

## Rotas e i18n

```mermaid
flowchart LR
  subgraph routes [Rotas]
    Root["/"]
    En["/en"]
    Pt["/pt"]
  end
  Root -->|redirect| En
  Root -->|redirect| Pt
  En --> LocaleLayout["[locale]/layout"]
  Pt --> LocaleLayout
  LocaleLayout --> Home["[locale]/page.tsx"]
```

- **Raiz:** `app/page.tsx` redireciona para `/en`.
- **Locale:** Conteúdo em `app/[locale]/`; layout com `NextIntlClientProvider`; mensagens em `messages/en.json` e `messages/pt.json`.

---

## Camadas do projeto

```mermaid
flowchart LR
  subgraph frontend [Frontend]
    UI[Componentes UI]
    Pages[Páginas]
  end
  subgraph data [Dados]
    Store[Zustand cart]
    Services[services.ts]
  end
  subgraph i18n [i18n]
    Messages[messages EN/PT]
  end
  subgraph external [Integrações]
    WA[WhatsApp]
    PWA[Manifest PWA]
  end
  UI --> Pages
  Pages --> Store
  Pages --> Messages
  Store --> Services
  Cart --> WA
  Layout --> PWA
```

---

## Stack

| Camada   | Tecnologia                       |
|----------|----------------------------------|
| Framework| Next.js 14 (App Router)          |
| Estilo   | Tailwind CSS                     |
| Animações| Framer Motion                    |
| Estado   | Zustand + persist (localStorage) |
| i18n     | next-intl (EN/PT)                |
| Ícones   | lucide-react                     |
