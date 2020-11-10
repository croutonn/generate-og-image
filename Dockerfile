FROM zenika/alpine-chrome:with-node

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

RUN mkdir -p /usr/local/src/generate-og-image
WORKDIR /usr/local/src/generate-og-image

COPY package.json package-lock.json /usr/local/src/generate-og-image/
RUN npm ci

# copy in src
COPY tsconfig.json /usr/local/src/generate-og-image/
COPY src/ /usr/local/src/generate-og-image/src/
COPY __tests__/ /usr/local/src/generate-og-image/__tests__/

RUN npm run build-release

RUN chmod +x /usr/local/src/generate-og-image/dist/index.js

ENTRYPOINT ["/usr/local/src/generate-og-image/dist/index.js"]