# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Debug (optional)
RUN ls -R prisma

RUN npx prisma generate

RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

# Copy standalone build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static .next/static
COPY --from=builder /app/public ./public

# Copy prisma if needed
COPY --from=builder /app/prisma ./prisma

EXPOSE 8080
ENV PORT=8080

# Start using standalone entrypoint
CMD ["node", "server.js"]
