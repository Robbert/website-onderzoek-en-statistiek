const videoQuery = {
  populate: {
    squareImage: {
      fields: ['url'],
    },
    rectangularImage: {
      fields: ['url', 'caption', 'width', 'height'],
    },
    body: {
      populate: {
        articles: { fields: ['title', 'slug'] },
        collections: { fields: ['title', 'slug'] },
        datasets: { fields: ['title', 'slug'] },
        interactives: { fields: ['title', 'slug'] },
        publications: { fields: ['title', 'slug'] },
        videos: { fields: ['title', 'slug'] },
        links: { fields: ['title', 'path'] },
        image: {
          fields: ['url', 'caption', 'width', 'height'],
        },
      },
    },
    videoFile: {
      fields: ['url'],
    },
    subtitleFile: {
      fields: ['url'],
    },
    themes: {
      fields: ['title', 'slug'],
    },
  },
}

export default videoQuery
