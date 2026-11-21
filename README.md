# mana_backend

Backend API for **Mana**, a LINE chatbot plus admin system for sending and tracking bills. Customers talk to a LINE Official Account bot to send bills and upload receipts. Admins log in to view, update and total the bills.

> Course project for **ITCS379 Practical Software Engineering**, Faculty of ICT, Mahidol University (MUICT).

## Tech stack

- Node.js + Express (ES modules, transpiled with Babel)
- Microsoft SQL Server through TypeORM
- LINE Messaging API (`@line/bot-sdk`) for the chatbot webhook
- Azure Blob Storage for receipt images
- Passport + JWT for admin authentication

## API overview

| Route | Description |
| --- | --- |
| `/` | LINE webhook (bot callback) |
| `/api/v1/admin` | Admin register and login |
| `/api/v1/bill` | Send, get, update and total bills; upload receipts |

## Getting started

### Prerequisites

- Node.js 18+
- Yarn
- A SQL Server database (for example Azure SQL)
- A LINE Messaging API channel
- An Azure Storage account

### Setup

```bash
# 1. Install dependencies
yarn install

# 2. Create your env file, then fill in the values
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `PORT` | Server port (default `4000`) |
| `CHANNEL_SECRET`, `CHANNEL_ACCESS_TOKEN` | LINE channel credentials |
| `AUTHORIZATION` | Bearer token used for LINE reply calls |
| `LINE_HOST` | LINE API host, for example `https://api.line.me/v2` |
| `DATABASE_NAME`, `DATABASE_SERVER`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` | SQL Server connection |
| `STORAGE_ACCOUNT_NAME`, `AZURE_STORAGE_ACCOUNT_ACCESS_KEY`, `STORAGE_ACCOUNT_CONTAINER_NAME` | Azure Blob Storage |
| `JWT_KEY` | Secret for signing admin JWTs |

### Run

```bash
# Development (auto-reload, loads .env)
yarn dev

# Production
yarn build
yarn start
```

Then point your LINE channel's webhook URL at `https://<your-host>/`.

## License

MIT
