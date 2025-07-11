# Stage 1: Install deps and build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy and install deps first (better layer caching)
COPY package.json package-lock.json* ./
RUN npm install

# Explicitly copy prisma first
COPY prisma ./prisma

# Now copy rest of code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy build artifacts and needed files
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/prisma prisma  # This will now exist for sure!

# Expose and set port
EXPOSE 8080
ENV PORT=8080

# Run
CMD ["npm", "start"]
