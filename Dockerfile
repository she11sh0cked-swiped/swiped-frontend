#
# ---- Build ----
FROM node:alpine AS build
# set working directory
WORKDIR /app
# copy project file
COPY package.json .
# install ALL node_modules, including 'devDependencies'
RUN yarn install --frozen-lockfile
# copy static files
COPY public ./public
# copy app sources
COPY src ./src
# copy build config files
COPY .env tsconfig.json ./
# copy linter files
COPY .eslintignore .eslintrc.js ./
# build app
RUN yarn run build

#
# ---- Release ----
FROM nginx:alpine AS release
ARG API_PROXY="http://localhost:4000"
ENV API_PROXY=$API_PROXY
# set working directory
WORKDIR /usr/share/nginx/html
# copy docker specific files
COPY docker /
# copy app build
COPY --from=build /app/build ./
# expose port
EXPOSE 3000
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
