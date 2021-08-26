import Fuse from 'fuse.js'

import content from '../../.next/cache/search/content'
import fuseIndex from '../../.next/cache/search/index'

const options = { includeScore: true }
const index = Fuse.parseIndex(fuseIndex)
const fuse = new Fuse(content, options, index)

const sortResults = (a, b, order) => {
  if (order === 'score') return a.score - b.score
  if (order === 'asc') return new Date(a.publicationDate) - new Date(b.publicationDate)
  return new Date(b.publicationDate) - new Date(a.publicationDate)
}

export default function handler(req, res) {
  const {
    q = ' ', sort, category, theme: themes, limit = 20, page = 0, fields = 'slug,title,shortTitle,teaser,type',
  } = req.query

  const results = fuse
    .search(q)
    .map(({ score, item }) => ({ score, ...item }))
    .filter(({ type }) => (!category || category.split(',').includes(type)))
    .filter(({ theme }) => (!themes || themes.split(',').some((t) => theme.includes(t))
    ))
    .sort((a, b) => sortResults(a, b, sort))
    .map((item) => (
      Object.fromEntries(fields.split(',').map((field) => [field, item[field]]))))

  res.status(200).json({
    result: 'ok',
    count: results.length,
    limit: +limit,
    page: +page,
    pageCount: Math.ceil(results.length / limit),
    results: results.slice(page * limit, (page * limit) + limit),
  })
}
