# Common build stage
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json .
# Prevent `husky` from installing completely
RUN ["npm", "pkg", "delete", "scripts.prepare"]
RUN [ "npm", "ci"]
COPY . .

# Development stage
# This does not have graceful shutdown unfortunately, `docker compose kill` to quickly stop it
FROM base AS development
EXPOSE ${PORT}
ENV NODE_ENV=development
USER root
HEALTHCHECK --interval=1s --timeout=5s --retries=10 \
    CMD wget --spider -q http://localhost:${PORT}/healthcheck || exit 1
CMD [ "npm", "run", "dev", "--", "--host" ]

# Build stage
FROM base AS builder
RUN [ "npm", "run", "build" ]
RUN [ "npm", "prune", "--production" ]

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE ${PORT}
ENV NODE_ENV=production
USER node
HEALTHCHECK --interval=1s --timeout=5s --retries=10 \
    CMD wget --spider -q http://localhost:${PORT}/healthcheck || exit 1
CMD [ "node", "build" ]
