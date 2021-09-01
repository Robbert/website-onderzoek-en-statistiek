import createNewIndex from './searchUtils'

export default async function handler(req, res) {
  await createNewIndex().then((result) => {
    res.status(200).json({ result })
  })
}
