# NetworkX.ai Auth UI

Pixel-precise authentication UI built with Next.js App Router, TypeScript, and Tailwind CSS. The project implements a reusable split layout and three auth screens (Sign In, Sign Up, Confirm Email) with responsive behavior, subtle animations, and accessible form controls.

## Overview

NetworkX.ai is a dark, gradient-driven authentication experience designed for desktop and mobile:

- Desktop: two-column split layout (left marketing/preview panel + right form)
- Mobile: single-column form with brand logo at the top
- Smooth page entry transitions, focus glows, and button interactions

## Screens

- `/auth/sign-in`
- `/auth/sign-up`
- `/auth/confirm-email` (includes OTP step after email entry)

## Features

- Reusable split layout via route group layout
- Controlled inputs with accessible labels and focus rings
- Password visibility toggle with icon fade
- Google auth button UI
- OTP entry UI with auto-advance and paste handling
- Responsive grid for first/last name fields
- Dark theme with gradient background

## Tech Stack

- Next.js App Router
- TypeScript (strict)
- Tailwind CSS v4
- next/image for optimized assets
- next/font for typography

## Project Structure

```
app/
  (auth)/
    layout.tsx
    auth/
      sign-in/page.tsx
      sign-up/page.tsx
      confirm-email/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  auth/
    AuthInput.tsx
    AuthSplitLayout.tsx
    GoogleButton.tsx
    Logo.tsx
    MarketingPanel.tsx
    OrDivider.tsx
    PasswordInput.tsx
public/
  left-frame.png
  networkx-logo.png
```

## Assets

Place the following assets in `public/` (already referenced in code):

- `left-frame.png` — marketing/preview image on the left panel
- `networkx-logo.png` — brand logo used on mobile header

## Getting Started

Install dependencies and run the dev server:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
pnpm dev     # Start dev server
pnpm build   # Production build
pnpm start   # Start production server
pnpm lint    # Run ESLint
```

## Notes

- No backend/auth logic is included (UI-only).
- Buttons activate based on local form state.
- OTP entry is client-side only and does not call APIs.
- Background and layout are optimized for the provided design references.

## Accessibility

- Proper label associations and `aria-*` attributes
- Keyboard navigation for all controls
- Focus-visible rings for inputs and buttons

## Customization

- Update colors in `app/globals.css`
- Replace `public/left-frame.png` with your final illustration
- Replace `public/networkx-logo.png` with your final logo

## Deployment

This project is a standard Next.js App Router app and can be deployed to any platform that supports Node.js and Next.js (e.g., Vercel, Netlify, or self-hosted).
