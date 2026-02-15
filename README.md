**Apars Classroom — TeachStack**

Apars Classroom (TeachStack demo) is a simple demonstration platform that pairs a React frontend with a TypeScript Express backend to showcase creating and joining live classroom sessions.

**TL;DR**

- **Start frontend:** `cd app && npm install && npm start`
- **Start backend (dev):** `cd server && npm install && npm run dev`
- **Or with Docker Compose:** `docker-compose up --build`

**What this repo contains**

- A React app (client) in the `app` folder that provides UI for creating and joining sessions.
- A TypeScript Express server (API) in the `server` folder that powers session endpoints and utilities.

**Requirements**

- Node.js (16+ recommended)
- npm or yarn
- (Optional) Docker & Docker Compose

**Quickstart (development)**

- Frontend

  ```bash
  cd app
  npm install
  npm start
  ```

- Backend (development)

  ```bash
  cd server
  npm install
  npm run dev
  ```

**Run both with Docker**

```bash
docker-compose up --build
```

**Key files & entry points**

- Frontend entry: [app/src/App.js](app/src/App.js#L1-L60)
- Frontend metadata: [app/package.json](app/package.json#L1-L200) and [app/README.md](app/README.md)
- Backend entry: [server/src/server.ts](server/src/server.ts#L1-L20)
- Backend app: [server/src/app.ts](server/src/app.ts#L1-L200)
- Backend metadata: [server/package.json](server/package.json#L1-L200)
- Compose setup: [docker-compose.yml](docker-compose.yml)

**Notes**

- The frontend uses React Router with pages in `app/src/pages` for session flows (create/join).
- The backend is TypeScript-based; use `npm run build` in `server` for a production build and then `npm start` to run the compiled output.

**Documentation & API**

- TeachStack API docs (external): https://media.aparsclassroom.com/admin/docs

**License**

- MIT — see LICENSE

If you'd like, I can expand the README with API examples, environment variable references, or a CONTRIBUTING guide.
