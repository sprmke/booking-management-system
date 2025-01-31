# Booking Management System

A modern booking management system built with Next.js and NestJS.

## Project Structure

```
booking-system/
├── frontend/          # Next.js frontend application
├── backend/           # NestJS backend application
└── README.md
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Copy `frontend/.env.example` to `frontend/.env`
- Copy `backend/.env.example` to `backend/.env`
- Update the environment variables with your values

3. Start the development servers:
```bash
npm run dev
```

This will start both the frontend (http://localhost:3000) and backend (http://localhost:3001) servers.

## Features

- Public guest booking form
- Admin dashboard for property owners
- Booking management
- Property management
- Guest management
- Email notifications
- PDF generation for bookings
- AWS integration (S3, SES, Cognito)

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Zustand

### Backend
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- AWS SDK
- PDF-lib

## License

MIT