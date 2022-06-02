const appQuery = {
  populate: {
    shortcuts: {
      populate: {
        articles: { fields: ['title', 'shortTitle', 'slug'] },
        collections: { fields: ['title', 'shortTitle', 'slug'] },
        datasets: { fields: ['title', 'slug'] },
        interactives: { fields: ['title', 'shortTitle', 'slug'] },
        publications: { fields: ['title', 'shortTitle', 'slug'] },
        videos: { fields: ['title', 'shortTitle', 'slug'] },
      },
    },
  },
}

export default appQuery
