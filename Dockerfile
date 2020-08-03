# build environment
FROM node:13-alpine as covid-bouncer-build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install @vue/cli -g
RUN npm install --silent
RUN npm audit fix
COPY . /app
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=covid-bouncer-build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
