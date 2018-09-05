FROM node:8.11.3

ENV NPM_CONFIG_LOGLEVEL=warn

RUN apt-get update && apt-get install -y \
    libpng12-dev \
    libpng12-0 \
    pngquant
WORKDIR /home/node

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
RUN chown -R node:$(id -gn node) /home/node
USER node
EXPOSE 3000
CMD [ "node", "src" ]
