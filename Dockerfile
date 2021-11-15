FROM node:12 as build-stage
WORKDIR /app
COPY package*.json ./
#RUN rm package-lock.json
#RUN apk add --no-cache --virtual .gyp python make g++ \ 
#    && npm install \
#    && apk del .gyp
RUN npm install @vue/cli-service
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
