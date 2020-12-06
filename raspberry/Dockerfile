FROM node:14
WORKDIR /usr/src/raspberry
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --linux deb --armv7l

FROM scratch as result
COPY --from=0 /usr/src/raspberry/dist_electron .
