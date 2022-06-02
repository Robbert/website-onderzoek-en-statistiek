const interactiveQuery = {
  populate: {
    squareImage: {
      fields: ['url'],
    },
    rectangularImage: {
      fields: ['url'],
    },
    themes: {
      fields: ['title', 'slug'],
    },
  },
}

export default interactiveQuery
