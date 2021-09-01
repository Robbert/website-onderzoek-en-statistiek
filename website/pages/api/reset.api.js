import { writeFileSync } from 'fs'

import { CACHEFILE } from './searchUtils'

async function createNewIndex() {
  const content = 'exports.content = []'
  const index = 'exports.index = { keys: [], records: [] }'
  const searchData = { content, index }
  const file = `exports.searchData = ${JSON.stringify(searchData)}`

  try {
    writeFileSync(CACHEFILE, file)
    return 'succes'
  } catch (e) {
    return 'something went wrong'
  }
}

export default async function handler(req, res) {
  if (process.env.NODE_ENV === 'development') {
    await createNewIndex().then((result) => {
      res.status(200).json({ result })
    })
  } else res.status(200).json({ result: 'no resetting in production' })
}
