#syntax=docker/dockerfile:1.4
# FROM node:18-alpine AS base

# # Step 1. Rebuild the source code only when needed
# FROM base AS builder

# WORKDIR /app

# # Install dependencies based on the preferred package manager
# COPY --link package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# # Omit --production flag for TypeScript devDependencies
# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
#   # Allow install without lockfile, so example works even without Node.js installed locally
#   else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
#   fi

# COPY --link components ./components
# COPY --link cypress ./cypress
# COPY --link models ./models
# COPY --link pages ./pages
# COPY --link public ./public
# COPY --link redux_store ./redux_store
# COPY --link styles ./styles
# COPY --link types ./types
# COPY --link utils ./utils
# COPY --link cypress.config.ts .
# COPY --link middleware.ts .
# COPY --link next.config.js .
# COPY --link nodemon.json .
# COPY --link postcss.config.js .
# COPY --link server.ts .
# COPY --link tailwind.config.js .
# COPY --link tsconfig.json .
# COPY --link tsconfig.server.json .


# # Environment variables must be present at build time
# # https://github.com/vercel/next.js/discussions/14030
# ARG ENV_VARIABLE
# ENV ENV_VARIABLE=${ENV_VARIABLE}
# ARG NEXT_PUBLIC_ENV_VARIABLE
# ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

# # Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# # Uncomment the following line to disable telemetry at build time
# # ENV NEXT_TELEMETRY_DISABLED 1

# # Build Next.js based on the preferred package manager
# RUN \
#   if [ -f yarn.lock ]; then yarn build; \
#   elif [ -f package-lock.json ]; then npm run build; \
#   elif [ -f pnpm-lock.yaml ]; then pnpm build; \
#   else yarn build; \
#   fi

# # Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# # Step 2. Production image, copy all the files and run next
# FROM base AS runner

# WORKDIR /app

# # Don't run production as root
# RUN \
#   addgroup --system --gid 1001 nodejs; \
#   adduser --system --uid 1001 nextjs
# USER nextjs

# COPY --from=builder --link /app/public ./public

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --link --chown=1001:1001 /app/.next/standalone ./
# COPY --from=builder --link --chown=1001:1001 /app/.next/static ./.next/static

# # Environment variables must be redefined at run time
# ARG ENV_VARIABLE
# ENV ENV_VARIABLE=${ENV_VARIABLE}
# ARG NEXT_PUBLIC_ENV_VARIABLE
# ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

# # Uncomment the following line to disable telemetry at run time
# # ENV NEXT_TELEMETRY_DISABLED 1

# # Note: Don't expose ports here, Compose will handle that for us

# # CMD ["node", "server.js"]
# CMD ["yarn", "dev"]


FROM node:18-alpine AS build
# FROM node:14.15.0-alpine3.12 AS build
WORKDIR /app

# Only build dependencies in the first step. This is very good for caching in Docker, as this layer will only
# be re-built whenever the dependency-list changes.
COPY package*.json ./
RUN yarn install

# Copy the actual source code and build it
COPY . .
ENV NODE_ENV=production
RUN yarn build

# Sadly, we need to include node_modules/ beacuse the server side needs it, but at least we can prune it to
# get rid of development dependencies.
# RUN npm prune --production

# Start from scratch and include only relevant files
FROM node:18-alpine AS distribution
WORKDIR /opt/nextapp
ENV NODE_ENV=production
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/public public
COPY --from=build /app/dist dist
COPY --from=build /app/.next .next

# Expose port and run application
EXPOSE 3000
CMD node dist/server.js
