# Coding Conventions

**Analysis Date:** 2026-02-21

## Naming Patterns

**Files:**

- PascalCase for React components: `GradientCard.tsx`, `ErrorBoundary.tsx`, `Header.tsx`
- camelCase for utility/library files: `utils.ts`, `gradient.ts`, `state.ts`, `export.ts`, `favorites.ts`
- camelCase for hooks: `useAppState.ts`, `useKeyboard.ts`
- Index files: `index.ts` (rarely used; prefer direct imports)

**Directories:**

- lowercase for feature directories: `components/`, `hooks/`, `lib/`, `data/`
- lowercase with hyphens for nested features if needed (not observed in this project)
- `ui/` subdirectory for primitive UI components from shadcn

**Functions:**

- camelCase for all functions (regular or React components): `useAppState()`, `exportVanillaCSS()`, `transformGradient()`
- React components uppercase: `GradientCard`, `ErrorBoundary`, `Header`
- Hook functions lowercase: `useKeyboard`, `useAppState`

**Variables:**

- camelCase for all variables: `selectedGradient`, `animationSpeed`, `displayGradient`, `encodedToNameMap`
- CONSTANT_CASE for module-level constants that never change: `SPLASH_STORAGE_KEY`, `DEFAULT_ANGLES`, `URL_DEBOUNCE_MS`, `VIRTUALIZATION_THRESHOLD`
- Private module state (like preload flags) in camelCase: `detailPreloaded`, `hadGradientOnLoad`

**Types:**

- PascalCase for all type definitions: `GradientPreset`, `Animation`, `AppState`, `ColorStop`, `GradientDefinition`
- Union types spelled out: `GradientType` (not `GradientTypeEnum`), `AnimationCategory`
- Use `interface` for object shapes (not `type`): `interface GradientPreset`, `interface AppState`
- Use `type` for unions and primitives: `type GradientCategory = "Purple" | "Blue" | ...`
- Props interfaces end with `Props`: `GradientCardProps`, `GradientGalleryProps`

**Event Handlers:**

- on + PascalCase action: `onSelectGradient()`, `onToggleFavorite()`, `onEscape()`, `onCopy()`

## Code Style

**Formatting:**

- No automatic formatter (no Prettier config present)
- Default ESLint spacing and line length conventions apply
- ESLint enforces consistency via flat config in `eslint.config.js`

**Linting:**

- Framework: ESLint 9 with TypeScript ESLint plugin
- Config: `eslint.config.js` (flat config format)
- Key plugins:
  - `@typescript-eslint` for strict type checking
  - `eslint-plugin-react-hooks` for hook rules
  - `eslint-plugin-react-refresh` for fast refresh support
- Rules enforced:
  - React component-only exports with `react-refresh/only-export-components`
  - React hook dependencies with `react-hooks` plugin

**Line Width:** No explicit limit enforced, but code stays under ~100 chars where readable

**Comments:**

- JSDoc for exported functions and utilities:
  ```typescript
  /**
   * Validates a hex color string (without #)
   */
  export function isValidHexColor(color: string): boolean;
  ```
- JSDoc for complex types and interfaces when non-obvious:
  ```typescript
  /**
   * URL state (serialized subset of AppState)
   */
  export interface URLState {
    g?: string; // Gradient definition: "linear,135,667eea:0,764ba2:100"
    a?: string; // Animation ID
  }
  ```
- Inline comments for non-obvious logic or workarounds:
  ```typescript
  // Pre-compute encoded gradients once at module load for performance
  const encodedGradientMap = new Map<string, string>();
  ```
- No comment blocks for obvious code

## Import Organization

**Order:**

1. React/libraries from node_modules: `import { useState } from 'react'`
2. Other library imports: `import { useWindowVirtualizer } from '@tanstack/react-virtual'`
3. Relative component imports: `import { GradientCard } from './GradientCard'`
4. Relative utility/lib imports: `import { encodeGradient } from '@/lib/gradient-url'`
5. Type imports: `import type { GradientPreset } from '@/types'`

**Examples:**

```typescript
// Correct order (from useAppState.ts)
import { useState, useCallback, useEffect, useRef } from "react";
import type { AppState, GradientCategory } from "@/types";
import { getInitialState, updateURL } from "@/lib/state";
import { getFavorites } from "@/lib/favorites";

// Correct order (from GradientGallery.tsx)
import { useMemo, useRef, useEffect } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { GradientCard } from "./GradientCard";
import { Button } from "./ui/button";
import { gradients } from "@/data/gradients";
import type { GradientPreset } from "@/types";
```

**Path Aliases:**

- `@/` resolves to `src/` (configured in `tsconfig.json` and `vite.config.ts`)
- All internal imports use `@/` prefix for clarity and easy refactoring
- Never use relative paths like `../../lib` when `@/lib` is available

## Error Handling

**Pattern:**

- Try-catch for operations that may fail (localStorage, clipboard, parsing):
  ```typescript
  try {
    const lastSeen = localStorage.getItem(SPLASH_STORAGE_KEY);
    if (!lastSeen) return true;
    const timestamp = parseInt(lastSeen, 10);
    if (isNaN(timestamp)) return true;
    return Date.now() - timestamp > SPLASH_EXPIRY_MS;
  } catch {
    return true; // Show splash if localStorage unavailable
  }
  ```
- Silent failures for non-critical operations (localStorage errors): `catch { /* ignore */ }`
- console.warn() for unexpected but recoverable errors:
  ```typescript
  console.warn("Failed to save favorites to localStorage:", error);
  ```
- Error Boundary components for React errors:
  - Generic `ErrorBoundary` for app-level errors
  - Specialized `GradientCardErrorBoundary` for isolated component failures
- Return null/fallback values instead of throwing for expected invalid states

**No Error Logging Framework:** Console methods only. No Sentry or similar (PostHog for analytics only)

## Logging

**Framework:** console only (no logging library)

**Patterns:**

- `console.error()` for caught exceptions: `console.error('ErrorBoundary caught an error:', error, errorInfo)`
- `console.warn()` for unexpected but recoverable states: `console.warn("Failed to save favorites")`
- `console.log()` for development/debug info, gated by environment check:
  ```typescript
  console.log("[Analytics] Skipped - development mode or key not configured");
  ```
- Never log to console in production unless explicitly env-gated
- No structured logging fields (just plain messages)

## Function Design

**Size:** Keep functions under 40 lines when possible. Larger functions get split into helpers.

**Parameters:**

- Props objects for components: `interface GradientCardProps { ... }`
- Named parameters for utility functions when 2+ params:
  ```typescript
  interface ColorStopRange {
    color: string;
    position?: string;
  }
  function extractColors(gradient: string): ColorStopRange[];
  ```
- Single parameters can be inline: `function isValidHexColor(color: string)`

**Return Values:**

- Explicit null for "no value" scenarios
- Never undefined in public APIs (only in React hook returns)
- Union return types when multiple outcomes possible:
  ```typescript
  export function parseGradientCSS(css: string): GradientDefinition | null;
  export interface ExportResult {
    format: ExportFormat;
    code: string;
    language: string;
  }
  ```

## Module Design

**Exports:**

- Named exports for all public functions: `export function exportVanillaCSS(...)`
- Named exports for all types: `export type GradientType = ...`
- No default exports (except React components)
- React components may have both named and default exports:
  ```typescript
  export const GradientCard = memo(...)
  export default GradientCard  // for lazy loading
  ```

**Barrel Files:**

- Not used in this project
- Direct imports from specific modules preferred: `import { GradientCard } from './components/GradientCard'`

**Private Functions:**

- No `private` keyword (not in functions)
- Underscore prefix not used
- File-local functions (not exported) are private by convention:
  ```typescript
  function buildLinearGradient(colors: ColorStop[], angle: number): string
  function buildRadialGradient(colors: ColorStop[]): string
  export function transformGradient(...) // calls private helpers
  ```

## React Patterns

**Hooks:**

- Functional components with hooks only (no classes except ErrorBoundary)
- Dependencies explicitly listed in hook arrays
- useState for local component state
- Custom hooks for shared logic: `useAppState()`, `useKeyboard()`, `useColumnCount()`
- useCallback for memoized event handlers
- useMemo for expensive computations

**Memoization:**

- `React.memo()` for components with expensive renders (GradientCard)
- `useCallback()` for event handlers passed as props
- `useMemo()` for derived data computations

**Component Structure:**

```typescript
// Define props interface
interface ComponentProps {
  prop1: string;
  prop2: number;
}

// Export memoized component
export const ComponentName = memo(function ComponentName({
  prop1,
  prop2,
}: ComponentProps) {
  // Implementation
});
```

## TypeScript Strictness

**Config:** `tsconfig.json` with strict mode enabled:

- `strict: true` (all strict flags)
- `noUncheckedIndexedAccess: true` (strict array access)
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

**Patterns:**

- Always type function parameters and return values
- Use union types instead of any: `type GradientType = 'linear' | 'radial' | 'conic'`
- Use non-null assertion (!.) only when you're 100% sure: `stops[i]!.position`
- Optional properties with ?: `selected?: string`
- Nullable types with unions: `string | null` (not `string?`)

## Constants and Configuration

**Module-level constants:**

- CONSTANT_CASE for never-changing values:
  ```typescript
  const SPLASH_STORAGE_KEY = "goodgradients-splash-seen";
  const SPLASH_EXPIRY_MS = 24 * 60 * 60 * 1000;
  const DEFAULT_ANGLES: Record<GradientType, number> = { ... };
  ```
- Store these at module top, after imports but before functions

**Magic Numbers:**

- Extract into named constants
- Example: `const VIRTUALIZATION_THRESHOLD = 100` (not hardcoded `100`)

---

_Convention analysis: 2026-02-21_
