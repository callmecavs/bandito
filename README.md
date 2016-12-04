# bandito

Minimal boilerplate for mostly-static React frontends, built by webpack 2.

## About

**TL;DR:** Existing React/webpack boilerplates scaffold applications with complex state. Bandito scaffolds a minimal boilerplate for mostly static websites with simple state.

## Getting Started

In your terminal:

```shell
# using node and npm
# install bandito globally

$ npm install bandito -g

# use the bandito command from the CLI to scaffold a project
# template files are copied to the CWD, unless a path is specified

$ bandito [path]
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
