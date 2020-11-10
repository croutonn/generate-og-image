FROM zenika/alpine-chrome:with-node

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

WORKDIR /usr/src/app

COPY --chown=chrome package.json package-lock.json ./
RUN npm ci

# copy in src
COPY --chown=chrome tsconfig.json ./
COPY --chown=chrome src/ ./src/
COPY --chown=chrome __tests__ ./__tests__/

RUN npm run build-release

ENTRYPOINT ["tini", "--"]
CMD ["node", "/usr/src/app/dist/index.js"]