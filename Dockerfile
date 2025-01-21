FROM node:23-alpine AS base

FROM base AS builder
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN  npm install --frozen-lockfile

COPY . .
RUN ["npm", "run", "build"]

FROM base AS release
WORKDIR /app

# the runtime dependencies
COPY --from=builder /app/node_modules ./node_modules/

# the sveltekit output
COPY --from=builder /app/build .

ENV NODE_ENV=production
USER node
EXPOSE 3000/tcp
# HEALTHCHECK --interval=15s --timeout=10s --retries=3 CMD curl -f http://0.0.0.0:3000/api/health/ready || exit 1
CMD ["node", "index.js"]