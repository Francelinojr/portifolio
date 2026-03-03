/**
 * motion-variants.ts
 * ─────────────────────────────────────────────────────────
 * Centralized Framer Motion variants for the portfolio.
 * Import these in any component to keep animations consistent.
 *
 * Design rules:
 *  - Respect prefers-reduced-motion (handled by Framer Motion internally
 *    when using whileInView + viewport.once = true)
 *  - All viewport animations fire only once (once: true)
 *  - Default stagger = 0.08s (feels snappy, not sluggish)
 *  - Duration cap: 0.5s (performance budget)
 */

import type { Variants } from 'framer-motion';

// ── Easing presets ──
export const ease = {
    smooth: [0.4, 0, 0.2, 1] as const,  // Material standard
    spring: [0.34, 1.56, 0.64, 1] as const,  // Slight overshoot
    out: [0.0, 0, 0.2, 1] as const,  // Decelerate
} as const;

// ── Viewport defaults (used in whileInView calls) ──
export const viewport = { once: true, margin: '-60px 0px' } as const;

// ─────────────────────────────────────────────────────────
// SECTION — Stagger container
// Wraps section content; children animate in sequence.
// ─────────────────────────────────────────────────────────
export const sectionContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

// ─────────────────────────────────────────────────────────
// FADE + SLIDE UP — primary entry animation
// Use for: section headings, cards, list items
// ─────────────────────────────────────────────────────────
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: ease.smooth },
    },
};

// Faster version for small elements (badges, tags)
export const fadeUpFast: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: ease.smooth },
    },
};

// ─────────────────────────────────────────────────────────
// FADE IN — pure opacity (no translate)
// Use for: overlays, decorative elements
// ─────────────────────────────────────────────────────────
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.4, ease: ease.smooth },
    },
};

// ─────────────────────────────────────────────────────────
// SLIDE LEFT — timeline / list items
// ─────────────────────────────────────────────────────────
export const slideLeft: Variants = {
    hidden: { opacity: 0, x: -24 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.45, ease: ease.smooth },
    },
};

// ─────────────────────────────────────────────────────────
// SCALE IN — modal, card reveal
// ─────────────────────────────────────────────────────────
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.35, ease: ease.spring },
    },
};

// ─────────────────────────────────────────────────────────
// CARD — combined scale + fade for project/certificate cards
// ─────────────────────────────────────────────────────────
export const cardVariant: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: ease.smooth },
    },
};

// ─────────────────────────────────────────────────────────
// HOVER / TAP — interactive states (use as whileHover/whileTap)
// These are plain objects (not Variants) — spread directly.
// ─────────────────────────────────────────────────────────
export const hoverScale = {
    scale: 1.03,
    transition: { duration: 0.2, ease: ease.spring },
} as const;

export const tapScale = {
    scale: 0.96,
    transition: { duration: 0.15, ease: ease.smooth },
} as const;

export const hoverLift = {
    y: -3,
    scale: 1.01,
    transition: { duration: 0.2, ease: ease.spring },
} as const;

// ─────────────────────────────────────────────────────────
// STAGGER ITEM — convenience alias used when the parent
// already declares sectionContainer (no need to re-declare transition)
// ─────────────────────────────────────────────────────────
export const staggerItem = fadeUp;
