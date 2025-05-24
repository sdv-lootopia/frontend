This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Tableau de Chasse - Application de gestion de chasses

Une application web pour organiser et gérer des chasses, permettant aux utilisateurs de créer des événements, de s'inscrire à des chasses et de visualiser les détails sur une carte interactive.

## Fonctionnalités

- Création et gestion de chasses
- Inscription aux événements
- Visualisation des chasses sur une carte
- Filtrage des chasses par type, date, région
- Gestion des participants

## Technologies utilisées

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

## Installation

1. Clonez le dépôt
2. Installez les dépendances : `npm install`
3. Lancez le serveur de développement : `npm run dev`

## Structure du projet

- `app/api/` : API routes pour la gestion des données
- `app/hunts/` : Pages pour afficher et gérer les chasses
- `components/` : Composants réutilisables
- `lib/` : Utilitaires et fonctions d'aide

## Contributeurs

- Mame
