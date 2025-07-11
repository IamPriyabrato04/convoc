# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first
COPY package.json package-lock.json* ./
RUN npm install

# Copy rest of code (this includes prisma!)
COPY . .

# Debug: ensure prisma exists
RUN ls -R prisma

# Generate Prisma client
RUN npx prisma generate

# Build
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/prisma prisma

EXPOSE 8080
ENV PORT=8080

CMD ["npm", "start"]
