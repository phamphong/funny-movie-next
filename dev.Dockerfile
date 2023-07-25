#syntax=docker/dockerfile:1.4
FROM node:18-alpine

WORKDIR /app

RUN npm install -g nodemon

# Install dependencies based on the preferred package manager
COPY --link package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY --link components ./components
COPY --link cypress ./cypress
COPY --link models ./models
COPY --link pages ./pages
COPY --link public ./public
COPY --link redux_store ./redux_store
COPY --link styles ./styles
COPY --link types ./types
COPY --link utils ./utils
COPY --link cypress.config.ts .
COPY --link middleware.ts .
COPY --link next.config.js .
COPY --link nodemon.json .
COPY --link postcss.config.js .
COPY --link server.ts .
COPY --link tailwind.config.js .
COPY --link tsconfig.json .
COPY --link tsconfig.server.json .

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

# Start Next.js in development mode based on the preferred package manager
CMD ["yarn", "dev"]
