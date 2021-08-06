FROM node:14.17.4 AS verify-format
WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn verify-format

FROM koalaman/shellcheck-alpine as verify-sh
WORKDIR /src
COPY ./*.sh ./
RUN shellcheck -e SC1091,SC1090 ./*.sh

FROM node:14.17.4 as restore
WORKDIR /work
RUN npm install
COPY package.json package-lock.json ./
RUN ls
RUN npm install --unsafe-perm

FROM restore as build
COPY . .
ARG baseUrl=https//cdn.fromdoppler.com
ARG pkgName=unlayer-editor
ARG version=v0.0.0-build0
RUN yarn build --cdn "${baseUrl}/${pkgName}/${version}"

FROM build AS test
RUN yarn test

# Using specific digest (f7f7607...) to avoid unwanted changes in the non-oficial image
FROM ttionya/openssh-client@sha256:f7f7607d56f09a7c42e246e9c256ff51cf2f0802e3b2d88da6537bea516fe142 as final
ARG pkgName=unlayer-editor
ARG version=v0.0.0-build0
COPY --from=build /work/build "/source/${pkgName}/${version}"
