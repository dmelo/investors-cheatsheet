FROM node:22-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn global add serve
RUN yarn install

COPY public/ public/
COPY tailwind.config.js tsconfig.json ./
COPY src/ src/

RUN ls -lhat

RUN yarn run build --production

EXPOSE 3000

CMD ["serve", "-s", "build"]


