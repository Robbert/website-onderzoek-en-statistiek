const datasetQuery = {
  populate: {
    squareImage: {
      fields: ['url'],
    },
    rectangularImage: {
      fields: ['url'],
    },
    body: {
      populate: {
        articles: { fields: ['title', 'slug'] },
        publications: { fields: ['title', 'slug'] },
        videos: { fields: ['title', 'slug'] },
        interactives: { fields: ['title', 'slug'] },
        collections: { fields: ['title', 'slug'] },
        datasets: { fields: ['title', 'slug'] },
        links: { fields: ['title', 'path'] },
      },
    },
    resources: {
      populate: {
        file: { fields: ['url', 'ext', 'size'] },
      },
    },
    themes: {
      fields: ['title', 'slug'],
    },
  },
}

export default datasetQuery
