# tiuaerhg

> My epic Nuxt.js project

## Build Setup

```bash
# install dependencies, should also works with npm install
$ cd src && yarn 
$ cd ../functions && yarn

# INSTALL FIREBASE CLI if you haven't and sign in with your credentials (Check firebase documentation for installation)

# Initialize project in firebase

# Add your firebase project credentials in a .env file in your src folder or add them straight in the nuxt.config file.
# Add a serviceAccount.json file which you can download from your firebase account to your src folder.
# If you change the name, be sure to change it also in the nuxt.config file in /src 
# change the .firebaserc file in the root folder to contain your project name

# serve with hot reload at localhost:3000
$ cd src && yarn dev

# build for production and serve over firebase
$ cd src && yarn build
$ cd .. & yarn serve

# Deplioy to your firebase project:
$ yarn deploy 



For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
