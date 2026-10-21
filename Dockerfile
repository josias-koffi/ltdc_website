# Install dependencies only when needed
FROM node:20-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
ARG gitBranch=develop
RUN apk add --no-cache git openssh libc6-compat g++ make py3-pip

# Install prerequisites
RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json ./
#COPY package.json package-lock.json ./
RUN npm install

#RUN \
#    if [ -f yarn.lock ]; then yarn; \
#    elif [ -f package.json ]; then npm ci; \
#    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
#    else echo "Lockfile not found." && exit 1; \
#    fi
#

# Rebuild the source code only when needed
FROM node:20-alpine AS builder

# Install prerequisites
RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/*

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Baked into the bundle at build time (.env is not part of the build context).
# NEXT_PUBLIC_BO_URL must end with "/" (asset URLs are concatenated).
ARG NEXT_PUBLIC_BO_URL
ARG NEXT_PUBLIC_API_URL
ARG PLAUSIBLE_DATA_DOMAINE
ARG PLAUSIBLE_SCRIPT_SRC
ARG COOKIEYES_ANALYTICS_ID
ARG COOKIEYES_ANALYTICS_SRC
ARG COOKIEYES_ANALYTICS_TYPE
ENV NEXT_PUBLIC_BO_URL=$NEXT_PUBLIC_BO_URL \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    PLAUSIBLE_DATA_DOMAINE=$PLAUSIBLE_DATA_DOMAINE \
    PLAUSIBLE_SCRIPT_SRC=$PLAUSIBLE_SCRIPT_SRC \
    COOKIEYES_ANALYTICS_ID=$COOKIEYES_ANALYTICS_ID \
    COOKIEYES_ANALYTICS_SRC=$COOKIEYES_ANALYTICS_SRC \
    COOKIEYES_ANALYTICS_TYPE=$COOKIEYES_ANALYTICS_TYPE

# If using npm comment out above and use below instead

RUN yarn build

CMD [ "npm","run", "dev" ]

# Production image, copy all the files and run next
FROM node:20-alpine AS runner

# Install prerequisites
RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/*

WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000


CMD ["node", "server.js"]

