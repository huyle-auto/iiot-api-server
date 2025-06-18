# API Server – Environment IoT monitoring Web System

This API server powers the [Vue web app](https://github.com/huyle-auto/iiot-vue-web-app) by handling secure user authentication, database access, and controlled data exposure.

Part of my self-learning project, along with [MQTT Client](https://github.com/huyle-auto/iiot-micro-service-mqtt-client). See full [project architecture](https://github.com/huyle-auto/iiot-micro-service-mqtt-client/blob/7a92edc33feab2fa177edbdcb55190a52904683b/architecture.jpg)

## Features

- User authentication
- Authorization via **JWT** stored in **HttpOnly cookies** (access + refresh tokens)
- Secure cookie handling with proper **CORS** configuration
- SQL Server integration for fetching and storing structured data

## Tech Stack

- **Node.js + Express** — server & routing
- **MSSQL (mssql)** — database integration
- **JWT** — token-based authentication
- **CORS** — cross-origin support
- **dotenv** — environment config

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT=3000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_SERVER=your_db_server
DB_NAME=your_database_name

BCRYPT_SALT_ROUNDS=10
ACCESS_TOKEN_SECRET_KEY=your_access_token_secret
REFRESH_TOKEN_SECRET_KEY=your_refresh_token_secret
```

## Run

```bash
npm install
node src/server.js
```

## Example endpoints

- POST /api/v1/auth/login
- POST /api/v1/auth/logout
- GET  /api/v1/sensors/1/latest
