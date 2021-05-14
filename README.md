# Website Onderzoek en statistiek

## Development

### CMS
* Go to cms folder: `cd cms`
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
    * To use local cms: `yarn develop`
    * To use acc api: `yarn dev-with-acc`
* Visit website at http://localhost:3000

## TODO
* Decide on CSS strategy (styled-jsx (default), css-modules, styled components) ✅
* Add next routes for all OS pages
* Add strapi models for all OS content types
* Add seed data with OS content
* Add importers for all drupal content
* Change database from sqlite to postgres
* Dockerize (including nginx as reverse proxy and seperate container for database)
* Setup CI (with option to deploy nginx, cms or website seperately?)
* Secure content (database and uploads) between updates
* Setup backup of database and uploads (using /backend/config/cron.js?)

## Resources
* https://nextjs.org/docs
* https://strapi.io/documentation/developer-docs
* https://strapi.io/starters/strapi-starter-next-js-blog
* https://nextjs.org/blog/styling-next-with-styled-jsx
* https://medium.com/@pablo.delvalle.cr/an-opinionated-basic-next-js-files-and-directories-structure-88fefa2aa759
* https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/