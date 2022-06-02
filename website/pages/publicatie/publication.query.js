const publicationQuery = {
  populate: {
    file: {
      fields: ['name', 'url', 'size'],
    },
    coverImage: {
      fields: ['alternativeText', 'url', 'caption', 'width', 'height'],
    },
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
        image: {
          fields: ['url', 'caption', 'width', 'height'],
        },
      },
    },
    themes: {
      fields: ['title', 'slug'],
    },
  },
}

export default publicationQuery
