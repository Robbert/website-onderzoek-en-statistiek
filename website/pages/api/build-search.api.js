import { writeFileSync } from 'fs'

import { getSearchContent } from '../../lib/searchUtils'

export default async function handler(req, res) {
  await getSearchContent()
    .then((content) => {
      try {
        writeFileSync('./public/searchContent.json', JSON.stringify(content))
        return 'succes'
      } catch (e) {
        return 'something went wrong'
      }
    })
    .then((result) => {
      res.status(200).json({ result })
    })
}
