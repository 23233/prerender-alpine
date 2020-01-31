FROM node:10.15-alpine
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/
# stop file type suffix in list
ENV BLACKLISTED_EXTS=ico,jpg,jpeg,png,ttf,eot,otf,woff,woff2,gif,svg,pdf,css,svg
# cache max size default 100
ENV CACHE_MAXSIZE=1000
# cache clear out time default 60
ENV CACHE_TTL=300
# wait last request time default 500
ENV WAIT_AFTER_LAST_REQUEST=250

COPY ./package.json .
COPY ./server.js .

# use edge repositories
# RUN sed -i -e 's/v3\.8/edge/g' /etc/apk/repositories

# install chromium and clear cache
RUN apk add --update-cache chromium \
 && rm -rf /var/cache/apk/* /tmp/*

# install npm packages
RUN npm install --no-package-lock

EXPOSE 3000

CMD ["node", "server.js"]
