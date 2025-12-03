# ---------------------
# 1. Build Stage
# ---------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install all dependencies (dev + prod)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy source code
COPY . .

# Generate Prisma client and build
RUN pnpm prisma generate
RUN pnpm build

# ---------------------
# 2. Production Stage
# ---------------------
FROM node:20-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

# Enable pnpm here too!
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile


# Copy built app from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/templates ./templates
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/uploads ./uploads
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 14000

ENV PORT=14000

CMD ["node", "dist/src/main.js"]
