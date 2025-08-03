# --- STAGE 1: Build Stage ---
FROM node:20-bullseye AS builder

# Set the working directory
WORKDIR /app

# Copy only the necessary files first (for efficient Docker caching)
COPY package.json package-lock.json ./

# Copy the rest of the application source code
COPY . .

# Install dependencies cleanly based on lockfile
RUN npm ci

# Copy Prisma schema and migrations
COPY prisma ./prisma


# Build the Next.js app (assumes prisma generate is part of build script)
RUN npm run build

# --- STAGE 2: Production Stage ---
FROM node:20-bullseye AS runner

# Set the working directory
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy runtime dependencies and build output from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Expose the default Next.js port
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]
