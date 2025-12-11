# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 e-commerce product catalog application built on the Fake Store API. It's a read-only product browsing interface that allows users to filter products by category and sort by various criteria. The application uses React 19, TypeScript 5, and Tailwind CSS 4.

## Development Commands

```bash
# Install dependencies (uses pnpm based on lefthook config)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint

# Format code with Prettier
pnpm format

# Type checking without building
pnpm validate:typecheck
```

## Architecture Overview

### Next.js App Router Pattern

This project uses the modern **Next.js App Router** (not Pages Router) with a clear separation between server and client components:

- **Server Components** (default): Pages, layouts, and data fetching components
- **Client Components** (`'use client'`): Interactive UI components that use hooks, event handlers, or browser APIs

### File Structure Convention

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home/product listing (Server Component)
│   └── products/[id]/      # Dynamic routes with own error/loading states
├── components/             # Reusable components (mostly Client Components)
├── lib/                    # Utilities and API client
└── types/                  # TypeScript type definitions
```

### State Management via URL

This application uses **URL-driven state management** instead of global state libraries:
- Filtering and sorting state is stored in URL search parameters (`?category=...&sort=...`)
- `CategoryFilter` and `SortControls` components manipulate URL params using `useRouter()` and `useSearchParams()`
- Server components read `searchParams` prop and re-render on URL changes
- No Redux, Zustand, or Context API for this type of state

### Data Fetching Architecture

**API Layer**: All external API calls are centralized in `src/lib/api.ts`
- `fetchProducts(category?)` - Get all products or filter by category
- `fetchProductById(id)` - Get single product details
- `fetchCategories()` - Get all available categories

**Caching Strategy**: Development vs Production
```typescript
// Development: no-store cache for hot reloading
// Production: force-cache for performance
```

**Static Generation**: Product detail pages use `generateStaticParams()` to pre-render all products at build time for optimal performance.

### Error Handling & Loading States

The app implements error boundaries and loading states at multiple levels:
- **Global level**: `app/error.tsx` and `app/loading.tsx`
- **Route level**: `app/products/[id]/error.tsx` and `app/products/[id]/loading.tsx`
- **404 handling**: `app/products/[id]/not-found.tsx` with `notFound()` function
- Loading skeletons use Tailwind's `animate-pulse`

## Key Technical Decisions

### Image Optimization

- External images from `fakestoreapi.com` are configured in `next.config.ts` under `remotePatterns`
- Custom `ProductImage` component wraps Next.js `Image` with error handling and fallback UI
- Use `priority` prop for above-the-fold images to optimize LCP

### TypeScript Configuration

- Path alias `@/*` maps to project root for cleaner imports
- `strict: true` mode enabled
- `moduleResolution: "bundler"` for Next.js compatibility
- Run `pnpm validate:typecheck` to verify types without building

### Git Hooks (Lefthook)

- **Pre-commit**: Auto-formats staged files with Prettier (`pnpm format`)
- **Pre-push**: Runs TypeScript type checking (`pnpm validate:typecheck`)
- Configured in `lefthook.yml`

### Sorting & Localization

Product sorting uses native JavaScript Intl APIs:
- `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })` for price formatting
- `String.localeCompare()` with `{ sensitivity: 'base' }` for case-insensitive sorting
- Sorting logic is centralized in `src/lib/sorting.ts`

## Common Patterns

### Adding a New Client Component

When interactivity is needed (state, effects, event handlers):
1. Add `'use client'` directive at the top of the file
2. Place in `src/components/`
3. Import and use in Server Components as needed

### Creating a New Route

For new pages:
1. Create folder in `src/app/` (e.g., `src/app/about/`)
2. Add `page.tsx` for the route component
3. Optionally add `loading.tsx`, `error.tsx`, `not-found.tsx` for enhanced UX
4. Use async Server Components for data fetching

### Adding External Images

To allow images from new domains:
1. Update `next.config.ts` `remotePatterns` array
2. Add protocol, hostname, and pathname pattern

### Type Definitions

All shared types live in `src/types/`:
- Define interfaces for API responses, component props, etc.
- Import with `@/src/types/...` alias
