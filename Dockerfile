#FROM alpine:3.4

#MAINTAINER Carlos Bernárdez "carlos@z4studios.com"

# "--no-cache" is new in Alpine 3.3 and it avoid using
# "--update + rm -rf /var/cache/apk/*" (to remove cache)

#VOLUME /git
#WORKDIR /git

#ENTRYPOINT ["git"]

FROM node:9.11.1-alpine

RUN apk add --no-cache \
# openssh=7.2_p2-r1 \
  openssh \
# git=2.8.3-r0
  git
# install simple http server for serving static content

RUN npm install -g vuepress

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
#COPY package*.json ./
#ADD . /app

# install project dependencies
#RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
# COPY . .
# COPY .vuepress .
# COPY .git .
#VOLUME /app

# build app for production with minification
#RUN npm run build
EXPOSE 8080

CMD ["vuepress","dev"]

#CMD [ "http-server", "dist" ]
