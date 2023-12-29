# Common build stage
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json .
RUN [ "npm", "ci"]
COPY . .

# Development stage
# TODO: Intended to use with `docker compose watch`, but failed experiment
# FROM base AS development
# EXPOSE ${PORT}
# EXPOSE ${HMR_PORT}
# ENV NODE_ENV=development
# CMD [ "npm", "run", "start:dev"]

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
CMD [ "node", "build" ]
