# Website Onderzoek en statistiek

## Development

### Prerequisites
- nodejs
- yarn
- docker
- docker-compose

### Recommendations
We use ESLint style rules in this repository, so it's strongly advised to have an ESLint plugin for your editor/IDE

### CMS
* Start local database: `docker-compose -f docker-compose.dev.yml up`
* Open a new terminal and go to cms folder: `cd cms`
* Install dependencies: `yarn`
* Start dev server : `yarn develop`
* Visit CMS at http://localhost:1337
* Start with creating an admin account at http://localhost:1337/admin
* Import some seed data
* Content and config will be stored between sessions in `/cms/.tmp`
* For a clean start, delete `/cms/.tmp` and `/cms/public/uploads`

### Website
* Go to website folder: `cd website`
* Install dependencies: `yarn`
* Start dev server:
    * To use local cms api: `yarn develop`
    * To use acc cms api: `yarn dev-with-acc`
* Visit website at http://localhost:3000

## TODO
* Decide on CSS strategy (styled-jsx (default), css-modules, styled components) ✅
* Dockerize (including nginx as reverse proxy and seperate container for database) ✅ 
* Setup CI (that enables to deploy nginx, cms and website seperately) ✅  
* Add strapi models for all OS content types ✅
* Change database from sqlite to postgres ✅
* Add next routes for all OS pages ✅
* Secure content (database and uploads) between updates
* Add seed data with OS content
* Add importers for all drupal content
* Setup backup of database and uploads (using /backend/config/cron.js?)

See the [issue board](https://gitlab.com/os-amsterdam/website-onderzoek-en-statistiek/-/boards) for more.

## Resources
* https://nextjs.org/docs
* https://strapi.io/documentation/developer-docs
* https://strapi.io/starters/strapi-starter-next-js-blog
* https://nextjs.org/blog/styling-next-with-styled-jsx
* https://medium.com/@pablo.delvalle.cr/an-opinionated-basic-next-js-files-and-directories-structure-88fefa2aa759
* https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/