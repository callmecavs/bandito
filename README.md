# outset-webpack

Frontend powered by React, and built by webpack 2.

## Getting Started

In your terminal:

```shell
# using node and npm
# install outset-webpack globally

$ npm install outset-webpack -g

# use the outset-webpack command from the CLI to scaffold a project
# template files are copied to the CWD, unless a path is specified

$ outset-webpack [path]
$ npm i
$ npm run dev
```

In your browser:

```shell
http://localhost:3000/
```

## Deploy

The template includes a simple node server for easy deployment to Heroku.

```shell
# using heroku-toolbelt
# add the Heroku remote

$ heroku git:remote -a heroku-app-name

# ensure Heroku installs devDependencies

$ heroku config:set NPM_CONFIG_PRODUCTION=false

# run the deploy script

$ npm run deploy
```

## Future

- [ ] Add Optimize JS [https://github.com/vigneshshanmugam/optimize-js-plugin](https://github.com/vigneshshanmugam/optimize-js-plugin)
- [ ] Component scaffolding via CLI
- [ ] Element components
  - [ ] Image
    - [ ] `src` to `require`
    - [ ] integrate with scroll to lazy load
- [ ] Decorators
  - [ ] `prevDef`
  - [ ] `stopProp`
- [ ] Resize
- [ ] Scroll
