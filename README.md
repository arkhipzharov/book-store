# Book store

App where you can add, edit and view books. Live
preview available [here](https://arkhipzharov.github.io/book-store/)

## 📥 Setup

1. `git clone https://github.com/arkhipzharov/book-store`
2. `npm run setup` (link and install all dependencies, create cache files)
3. `git worktree add dist gh-pages`

## Backend development

`npm run back`

## Frontend

### 👷‍♂ Development

`npm run dev`

### 🌐 Production

> You can read more about this approach
[here](https://medium.com/linagora-engineering/deploying-your-js-app-to-github-pages-the-easy-way-or-not-1ef8c48424b7)

1. `npm run build`
2. `cd dist`
3. `git add .`
4. `git commit`
5. `git push origin gh-pages`
6. wait a bit and check updates [here](https://arkhipzharov.github.io/book-store/)

## Packages

### Root

`npm i`, `npm un` as usual

### Subfolders

> available `--scope=xxx` "lerna package" names are listed in `lerna.json`

#### ➕ Install

> You should only install 1 package at time, otherwise this error is thrown:
> `No packages found where <package-name> can be added`

> https://github.com/lerna/lerna/tree/master/commands/add#readme

`npm run i -- <package>[@version] [--scope=xxx] [--dev] [--exact] [--peer]`

examples:
* `npm run i -- express --scope=back`
* `npm run i -- stylelint --scope=front --dev`
> install for all "lerna packages"
* `npm run i -- npm-run-all --dev`

#### ➖ Uninstall

> https://github.com/lerna/lerna/issues/1886#issuecomment-513936734

`npm run un -- <package> [--scope=xxx]`

## Lint

`npm run lint`

> this can be useful if you are debugging eslint and don't want to manually
> check problems in every file, or just for quick search

## Lint with code formatting

`npm run lint:fix`

## Special comments

`// (pending|unknown|number)` mark at the top of comment describes the status of
the problem <- which is discussed in the rest of it

example:

```javascript
// (unknown)
// sometimes `window.svgSpriteInjector is not a function occures`,
// maybe because of npm/webpack cache or other
```
meaning:
* `pending`: problem can be solved and we just need to monitor further
investigations (pull request, etc.) until one fixes it
* `unknown`: cause of problem is unknown and we can try to explore
this later, but for now it should be fixed by workaround or in other ways
* `number`: this comment text can be inserted in all places where only exact `// (number)` comment exists

## Other

* if you have `port <PASTE_NUMBER_HERE (example: 3000)> is already in use` problems,
you can run this command to kill port:

  ```bash
    kill -9 $(lsof -t -i:<PASTE_NUMBER_HERE> -sTCP:LISTEN)
  ```
* to import local app side helpers write statement as:

  ```javascript
    import * as hl from '@(back|front)/helpers';
  ```
for var to be different than root helpers import one
`import * as h from '@/helpers';`
