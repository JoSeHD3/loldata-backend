# LOL DATA - League of Legends Analytics Dashboard (Frontend)

Fullstack analytics dashboard for League of Legends players built with modern web technologies. The application integrates Riot API and provides advanced data visualisation and performance analysis.

## Project overview

LOL Data allows users to:

- Create an account and authenticate securely
- Connect and analyze League of Legends player data based on their LOL accounts
- Visualize match statistics using charts
- Analyze player performance across multiple domains
- Explore efficiency metrics (damage, gold, CS, etc.)

## Architecture

The project is split into two separate repositories:

### Frontend

- Next.js (App Router)
- TypeScript
- React Query
- React Hook Form + Zod
- Tailwind CSS
- Recharts
- Shadcn/ui

### Backend

- NestJS
- TypeScript
- REST API
- Riot Games API integration
- Authentication and authorization systems with JWT
- Mongodb

## Figma project

This shows the project's dashboard page and example of future UI.
<img width="1000" height="850" alt="Group 1" src="https://github.com/user-attachments/assets/29026059-582f-4960-93c5-2ff2008cd8be" />

## Instalation

### Frontend

```Bash
npm i
npm run dev
```

### Backend

```Bash
npm i
npm run start:dev
```

Make sure to configure .env variables

## Roadmap

Planned improvements:

- Role-based access
- Advanced performance scoring algorithm
- Match timeline analysis
- Caching
- CI/CD pipelines and deployment
