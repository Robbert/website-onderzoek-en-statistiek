# Website Onderzoek en statistiek

## Development

### Prerequisites
- nodejs
- yarn
- docker
- docker-compose
- postgres (psql and pg_dump) v13

### Recommendations
We use ESLint and stylelint style rules in this repository, so it's strongly advised to have an ESLint and stylelint plugin for your editor/IDE

#### Protip for VSCode users
Add the following to your VSCode `settings.json`, to fix lint errors on save:

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  }
}
```

### CMS
* Start local database: `yarn cms:db`
* Open a new terminal and install cms dependencies: `yarn cms:install`
* Start local cms: `yarn cms`
* Start with creating an admin account at http://localhost:1337/admin
* Import some seed data

### Website
* Install website depencies: `yarn website:install`
* Start dev server:
    * To use local cms api: `yarn website`
    * To use acc cms api: `yarn website:acc`
* Visit website at http://localhost:3000
* To analyze bundle sizes: `yarn website:analyze`

See the [issue board](https://gitlab.com/os-amsterdam/website-onderzoek-en-statistiek/-/boards) for current issues.

### Component readme's

- [Grid](website/components/Grid/README.md)