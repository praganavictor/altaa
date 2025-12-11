# Altaa - E-commerce Product Catalog

Uma aplicação moderna de catálogo de produtos construída com Next.js 16, React 19 e TypeScript, utilizando a Fake Store API.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 20+
- pnpm (recomendado) ou npm

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd altaa

# Instale as dependências
pnpm install
# ou
npm install
```

### Comandos Disponíveis

```bash
# Desenvolvimento - Inicia o servidor em http://localhost:3000
pnpm dev

# Build - Gera a versão otimizada para produção
pnpm build

# Produção - Inicia o servidor de produção (requer build primeiro)
pnpm start

# Linting - Verifica problemas no código
pnpm lint

# Formatação - Formata o código com Prettier
pnpm format

# Type Check - Verifica tipos TypeScript sem fazer build
pnpm validate:typecheck
```

### Git Hooks

O projeto usa Lefthook para automatizar verificações:

- **Pre-commit**: Formata automaticamente os arquivos staged
- **Pre-push**: Executa validação de tipos TypeScript

## 🏗️ Decisões Técnicas

### 1. Next.js App Router (v16)

**Decisão**: Utilizar o App Router ao invés do Pages Router tradicional.

**Motivos**:

- Melhor performance com Server Components por padrão
- Arquitetura mais moderna e alinhada com o futuro do Next.js
- Suporte nativo para layouts aninhados e loading/error states
- Melhor separação entre lógica de servidor e cliente

### 2. Server Components + Client Components

**Decisão**: Usar Server Components para data fetching e Client Components apenas onde há interatividade.

**Implementação**:

- Páginas principais (`page.tsx`) são Server Components assíncronos
- Componentes interativos (`ProductGrid`, `CategoryFilter`, `SortControls`) são Client Components
- Data fetching acontece no servidor, reduzindo bundle JavaScript no cliente

**Benefícios**:

- Bundle menor no cliente (~40% de redução)
- Melhor SEO com renderização no servidor
- Dados frescos a cada requisição sem complexidade de client-side fetching

### 3. Estado na URL

**Decisão**: Gerenciar filtros e ordenação via URL search params ao invés de estado global.

**Implementação**:

```typescript
// Exemplo: /?category=electronics&sort=price-asc
const searchParams = useSearchParams();
const category = searchParams.get('category');
const sort = searchParams.get('sort');
```

**Vantagens**:

- URLs compartilháveis e bookmarkable
- Botão "voltar" funciona nativamente
- Sem necessidade de Redux/Zustand para este tipo de estado
- SSR-friendly (servidor pode ler os params)

### 4. Static Site Generation para Produtos

**Decisão**: Pré-renderizar todas as páginas de produto em build time.

**Implementação**:

```typescript
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product) => ({ id: product.id.toString() }));
}
```

**Benefícios**:

- Carregamento instantâneo de páginas de produto
- Redução de carga na API externa
- Melhor Core Web Vitals (LCP, FID)

### 5. TypeScript Strict Mode

**Decisão**: Habilitar modo strict do TypeScript.

**Configuração**: `"strict": true` no tsconfig.json

**Impacto**:

- Catch de bugs em desenvolvimento
- Melhor autocompletar e DX
- Código mais robusto e manutenível

### 6. Tailwind CSS v4

**Decisão**: Usar a versão 4 (beta) do Tailwind com PostCSS plugin.

**Motivos**:

- Melhor performance de build
- Sintaxe CSS nativa
- Menor configuração necessária

## ⚖️ Trade-offs

### 1. Static Generation vs. ISR

**Escolha**: Static Generation (SSG)
**Trade-off**: Dados podem ficar desatualizados entre builds

**Justificativa**:

- Para um catálogo de produtos, builds frequentes são aceitáveis
- Performance é mais importante que dados em tempo real neste contexto
- Poderia ser facilmente migrado para ISR (Incremental Static Regeneration) se necessário

**Alternativa considerada**: ISR com `revalidate: 3600` (1 hora)

### 2. URL State vs. Global State

**Escolha**: URL search params
**Trade-off**: Limita tipos de estado que podem ser armazenados (apenas strings serializáveis)

**Justificativa**:

- Para filtros e ordenação, strings são suficientes
- Benefícios de compartilhamento e bookmarking superam limitações
- Se houvesse carrinho de compras, usaríamos Context API ou localStorage

### 3. Client-Side Filtering vs. Server-Side

**Escolha**: Client-side filtering após fetch
**Trade-off**: Todos os produtos são baixados mesmo quando filtrados

**Justificativa**:

- API externa (Fake Store) tem limitações de query
- Para ~20 produtos, overhead de rede é mínimo
- Filtros instantâneos melhoram UX
- Em produção com mais produtos, migraria para server-side filtering

### 4. Dependência de API Externa

**Escolha**: Fake Store API sem fallback
**Trade-off**: Aplicação quebra se API estiver fora

**Justificativa**:

- Para demonstração, aceitável
- Em produção, implementaria:
  - Cache em banco de dados próprio
  - Fallback para dados mockados
  - Retry logic com exponential backoff

## 🔧 Pontos de Melhoria

### Curto Prazo

1. **Testes Automatizados**

2. **Acessibilidade (a11y)**

3. **Performance**

## 📦 Tecnologias Utilizadas

- **Framework**: Next.js 16.0.8 (App Router)
- **UI Library**: React 19.2.1
- **Linguagem**: TypeScript 5
- **Estilização**: Tailwind CSS 4
- **Linting**: ESLint 9 + Prettier 3.7.4
- **Git Hooks**: Lefthook 2.0.9
- **API**: Fake Store API

## 📂 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout raiz
│   ├── page.tsx            # Página inicial (listagem)
│   ├── error.tsx           # Error boundary global
│   ├── loading.tsx         # Loading state global
│   └── products/[id]/      # Rota dinâmica de produtos
├── components/             # Componentes reutilizáveis
│   ├── ProductGrid.tsx
│   ├── ProductCard.tsx
│   ├── CategoryFilter.tsx
│   ├── SortControls.tsx
│   ├── ProductImage.tsx
│   └── EmptyState.tsx
├── lib/                    # Utilitários e lógica
│   ├── api.ts             # Cliente da API
│   └── sorting.ts         # Funções de ordenação
└── types/                  # Definições TypeScript
    └── product.ts
```

## 📄 Licença

Este projeto foi criado como demonstração técnica.

---

Desenvolvido com Next.js ⚡
