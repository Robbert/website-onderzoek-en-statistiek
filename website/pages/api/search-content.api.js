import { getSearchContent } from '~/lib/searchUtils'

export default async function handler(req, res) {
  await getSearchContent().then((data) => {
    res.status(200).json(data)
  })
}
