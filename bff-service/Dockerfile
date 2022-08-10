FROM node:14-alpine as base

FROM base as dependencies
COPY package*.json tsconfig*.json nest-cli.json ./
RUN npm install && npm cache clean --force

FROM dependencies as buildApp
COPY src ./
RUN npm run build

FROM base as release
COPY --from=dependencies package*.json ./
RUN npm install --only=production
COPY --from=buildApp dist ./dist
USER node
EXPOSE 3000
ENTRYPOINT ["node", "dist/main.js"]