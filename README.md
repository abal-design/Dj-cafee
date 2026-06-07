# DJ Coffee - Premium Cafe Platform

A complete full-stack Next.js web platform for DJ Coffee, Letang, Nepal.

## Stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS
- Auth.js (NextAuth credentials)
- MySQL + Prisma ORM
- React Hook Form + Zod
- Recharts, Lucide React, Sonner toast

## Features

- Public pages: Home, About, Menu, Category Menu, Reservations, Order, Gallery, Reviews, Contact, Login, Register
- Customer area: Dashboard, Profile, Orders, Reservations, Favorites
- Admin area: Analytics dashboard, Menu management, Orders, Reservations, Users, Reviews, Settings
- Role-based middleware and protected layouts
- Cart with local storage and checkout flow
- Reservation and review submission with validation
- Admin moderation for reviews and status management for orders/reservations

## Business Details

- Brand: DJ Coffee
- Rating: 4.2/5
- Price range: Rs 1-500
- Services: Dine-in, Takeaway
- Address: PGQ3+M36, Kanepokhari - Letang Road, Letang 56600, Nepal
- Phone: 986-0984547
- Hours: Open, closes at 8 PM

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your MySQL connection string and secret:

```env
DATABASE_URL="mysql://root:password@localhost:3306/dj_coffee"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-string"
```

4. Push schema and seed data:

```bash
npm run db:push
npm run db:seed
```

5. Run development server:

```bash
npm run dev
```

## Demo Credentials

- Admin: `admin@djcoffee.com` / `admin12345`
- Customer: `customer@djcoffee.com` / `customer12345`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build app for production
- `npm run start` - Start production server
- `npm run lint` - Run linter
- `npm run db:push` - Apply Prisma schema
- `npm run db:seed` - Seed database
- `npm run db:studio` - Open Prisma Studio

## Key Structure

- `prisma/schema.prisma` - Database schema
- `prisma/seed.ts` - Seed data for DJ Coffee
- `src/app` - App Router routes (public, dashboard, admin, api)
- `src/components` - Reusable UI, forms, layout, admin/customer modules
- `src/lib` - Auth, Prisma client, validation, constants, utilities
- `middleware.ts` - Route protection and role checks
