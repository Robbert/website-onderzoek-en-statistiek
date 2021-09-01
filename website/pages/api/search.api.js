/* eslint-disable no-undef */
import { existsSync } from 'fs'
import path from 'path'
import Fuse from 'fuse.js'

import createNewIndex, { CACHEFILE } from './searchUtils'

const sortResults = (a, b, order) => {
  if (order === 'score') return a.score - b.score
  if (order === 'asc') return new Date(a.publicationDate) - new Date(b.publicationDate)
  return new Date(b.publicationDate) - new Date(a.publicationDate)
}

export default async function handler(req, res) {
  if (!existsSync(CACHEFILE)) await createNewIndex()

  const {
    q = ' ',
    sort,
    category,
    theme: themes,
    limit = 20,
    page = 0,
    fields = 'slug,title,shortTitle,teaser,type,publicationDate',
  } = req.query

  const cacheRelativePath = '../../../searchData.js'
  const cacheAbsolutePath = path.resolve(CACHEFILE)
  delete __non_webpack_require__.cache[cacheAbsolutePath]
  const { searchData } = __non_webpack_require__(cacheRelativePath)
  const { content, index } = searchData
  const options = { includeScore: true }
  const fuseIndex = Fuse.parseIndex(index)
  const fuse = new Fuse(content, options, fuseIndex)

  const results = fuse
    .search(q)
    .map(({ score, item }) => ({ score, ...item }))
    .filter(({ type }) => (!category || category.split(',').includes(type)))
    .filter(({ theme }) => (!themes || themes.split(',').some((t) => theme.includes(t))))
    .sort((a, b) => sortResults(a, b, sort))
    .map((item) => Object.fromEntries(fields.split(',').map((field) => [field, item[field]])))

  res.status(200).json({
    result: 'ok',
    count: results.length,
    limit: +limit,
    page: +page,
    pageCount: Math.ceil(results.length / limit),
    results: results.slice(page * limit, (page * limit) + limit),
  })
}
