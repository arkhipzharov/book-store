# Book store

App where you can add, edit and view books. Live
preview available [here](http://lime-test.h1n.ru/book-store)

## 📥 Setup

1. `git clone https://github.com/shiftenko/book-store`
2. `npm run setup` (link and install all dependencies, create cache files)

## Backend development

`npm run back`

## Frontend

### 👷‍♂ Development

`npm run dev`

### 🌐 Production

`npm run build`

## Packages

### Root

`npm i`, `npm un` as usual

### Subfolders

#### ➕ Install

> You should only install 1 package at time, otherwise this error is thrown:
> `No packages found where package-name can be added`

> https://github.com/lerna/lerna/tree/master/commands/add#readme

`npm run i -- <package>[@version] [--scope=xxx] [--dev] [--exact] [--peer]`

#### ➖ Uninstall

> https://github.com/lerna/lerna/issues/1886#issuecomment-513936734

`npm run un -- <package> [--scope=xxx]`

## Make commit

Just `git commit`

> `git add .` and pre-commit code formatting with eslint handled already

## Lint

`npm run lint`

> this can be useful if you are debugging eslint and don't want to manually
> check problems in every file, or just for quick search

## Lint with code formatting

`npm run lint:fix`
