# Instructions to run development server

## Running on docker

Execute the following commands from within the repository root

``` docker build -t vpress . ``` <br>
``` docker run -p 8080:8080 -v "$(pwd)/docs":/app vpress ``` 

## Running without docker

Install nodeJs <br>
``` brew install node ``` <br>
Install VuePress <br>
``` npm install -g vuepress@next ``` <br>
Start dev server <br>
``` vuepress dev ``` <br>


## File structure

-- `docs` Contains the documentation markdown files <br>
     |______ `.vuepress` Contains the configs <br>
        |________ `config.js` The main config file <br>


## Generating static pages for deploying
**It is assumed that npm is already installed on the machine**
### Install vuepress dependency(Not required if running without docker)
``` npm install -D vuepress ```

### Execute the command
``` npm run docs:build ```
