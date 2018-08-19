FROM node:9.11.1-alpine

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
COPY . .
COPY .vuepress .

# build app for production with minification
#RUN npm run build
EXPOSE 48080

CMD ["vuepress","dev"]

#CMD [ "http-server", "dist" ]
