# LUMEN Compiler Server

This repository implements the backend server that acts as a compiler service for the LUMEN project.

It exposes an HTTP API that accepts source files and compilation options, compiles/transforms them, and returns compiled artifacts, logs, and diagnostics. The server is intended to run as a standalone service and can be used locally during development or deployed in CI/CD pipelines.

## Repository structure

-   `src/` - TypeScript source code for the server
    -   `controllers/compile.controller.ts` - HTTP handler for compilation requests
    -   `services/compile.service.ts` - Compilation logic
    -   `routes/compile.route.ts` - Route definitions
    -   `utils/` - helper utilities (file handling, cleanup, logger)
    -   `middleware/` - request logging, rate limiting, etc.
-   `temp/` - runtime temporary files (compiled outputs, intermediate files)
-   `logs/` - application logs
-   `package.json`, `tsconfig.json` - project configuration

> Note: this README assumes the code in `src/` is the authoritative implementation.

## Prerequisites

-   Node.js 14+ (recommended: 16 or 18)
-   npm (or yarn/pnpm)
-   Linux/macOS/Windows

## Install

1. Clone the repo

    ```bash
    git clone <repo-url>
    cd compiler-backend
    ```

2. Install dependencies
    ```bash
    npm install
    ```

## Environment & configuration

The project uses the configuration files under `src/config` (if present) and expects optional environment variables. Common env vars:

-   `PORT` - port to run the server on (default: 3000)
-   `NODE_ENV` - `development` or `production`

If you have a `nodemon.json` and `register-ts-node.js`, they're used to run TypeScript directly in development.

## Run (development)

Start the dev server with nodemon or ts-node (project provides `nodemon.json`):

npm run dev

Or run compiled JS (production):

npm run build
npm start

(If `package.json` doesn't include these scripts, add appropriate scripts: `dev`, `build`, `start`.)

## API

This server exposes a compile endpoint (see `src/routes/compile.route.ts` and `src/controllers/compile.controller.ts`). Example:

POST /compile

Request body (multipart/form-data or JSON depending on implementation):

-   `files` - source files to compile (file upload)
-   `options` - compiler options (JSON)

Response (JSON):

-   `success` - boolean
-   `artifacts` - compiled outputs (base64 or download URLs)
-   `diagnostics` - compilation messages, errors, warnings
-   `log` - server logs related to the compile task

Example curl (adjust to actual implementation):

curl -X POST http://localhost:3000/compile \
 -F "files=@./src/main.lumen" \
 -F "options={\"optLevel\":2}" \
 -H "Accept: application/json"

Check `src/controllers/compile.controller.ts` for exact field names.

## Development notes

-   Temporary files are stored in `temp/` and cleaned up by `src/utils/cleanup.ts`.
-   Logging is implemented in `src/utils/logger.ts` and writes to `logs/server.log`.
-   Middleware includes request logging and rate limiting to protect the compile endpoint.

## Testing

Add unit tests under `test/` or `src/__tests__/` using your preferred test runner (Jest, Mocha, etc.).

## Linting & Formatting

Add ESLint and Prettier configs if desired. Run linters via npm scripts.

## Troubleshooting

-   Check `logs/server.log` for server runtime errors.
-   Ensure Node version compatibility.
-   If file uploads fail, verify `multipart/form-data` handling in the controller and any file size limits in middleware.

## Contributing

Contributions are welcome. Open issues and PRs against the repo. Follow standard commit and PR workflows.

## License
```JSON
"license": "ISC",
```
