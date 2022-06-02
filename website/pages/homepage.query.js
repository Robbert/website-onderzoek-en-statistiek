export const homepageQuery = {
  populate: {
    featured: {
      populate: {
        articles: {
          fields: ['title', 'shortTitle', 'slug', 'teaser'],
          populate: {
            squareImage: { fields: ['url', 'width', 'height'] },
            rectangularImage: { fields: ['url', 'width', 'height'] },
          },
        },
        collections: {
          fields: ['title', 'shortTitle', 'slug', 'teaser'],
          populate: {
            squareImage: { fields: ['url', 'width', 'height'] },
            rectangularImage: { fields: ['url', 'width', 'height'] },
          },
        },
        datasets: {
          fields: ['title', 'slug', 'teaser'],
          populate: {
            squareImage: { fields: ['url', 'width', 'height'] },
            rectangularImage: { fields: ['url', 'width', 'height'] },
          },
        },
        interactives: {
          fields: ['title', 'shortTitle', 'slug', 'teaser'],
          populate: {
            squareImage: { fields: ['url', 'width', 'height'] },
            rectangularImage: { fields: ['url', 'width', 'height'] },
          },
        },
        publications: {
          fields: ['title', 'shortTitle', 'slug', 'teaser'],
          populate: {
            squareImage: { fields: ['url', 'width', 'height'] },
            rectangularImage: { fields: ['url', 'width', 'height'] },
          },
        },
        videos: {
          fields: ['title', 'shortTitle', 'slug', 'teaser'],
          populate: {
            squareImage: { fields: ['url', 'width', 'height'] },
            rectangularImage: { fields: ['url', 'width', 'height'] },
          },
        },
      },
    },
    featuredCollections: {
      populate: {
        collections: {
          fields: ['title', 'shortTitle', 'slug', 'teaser'],
        },
      },
    },
    agenda: {
      populate: {
        articles: { fields: ['title', 'shortTitle', 'slug'] },
        collections: { fields: ['title', 'shortTitle', 'slug'] },
        interactives: { fields: ['title', 'shortTitle', 'slug'] },
        publications: { fields: ['title', 'shortTitle', 'slug'] },
        videos: { fields: ['title', 'shortTitle', 'slug'] },
      },
    },
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
    relatedSites: { populate: '*' },
  },
}

export const themesQuery = { fields: ['title', 'slug'] }
