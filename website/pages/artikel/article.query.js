const articleQuery = {
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
        publications: { fields: ['title', 'slug'] },
        videos: { fields: ['title', 'slug'] },
        interactives: { fields: ['title', 'slug'] },
        collections: { fields: ['title', 'slug'] },
        datasets: { fields: ['title', 'slug'] },
        links: { fields: ['title', 'path'] },
        image: {
          fields: ['url', 'caption', 'width', 'height'],
        },
        panel: {
          populate: '*',
        },
      },
    },
    related: {
      populate: {
        articles: {
          fields: ['title', 'teaser', 'slug'],
          populate: {
            squareImage: {
              fields: ['url', 'width', 'height'],
            },
            rectangularImage: {
              fields: ['url', 'width', 'height'],
            },
          },
        },
        collections: {
          fields: ['title', 'teaser', 'slug'],
          populate: {
            squareImage: {
              fields: ['url', 'width', 'height'],
            },
            rectangularImage: {
              fields: ['url', 'width', 'height'],
            },
          },
        },
        interactives: {
          fields: ['title', 'teaser', 'slug'],
          populate: {
            squareImage: {
              fields: ['url', 'width', 'height'],
            },
            rectangularImage: {
              fields: ['url', 'width', 'height'],
            },
          },
        },
        publications: {
          fields: ['title', 'teaser', 'slug'],
          populate: {
            squareImage: {
              fields: ['url', 'width', 'height'],
            },
            rectangularImage: {
              fields: ['url', 'width', 'height'],
            },
          },
        },
        videos: {
          fields: ['title', 'teaser', 'slug'],
          populate: {
            squareImage: {
              fields: ['url', 'width', 'height'],
            },
            rectangularImage: {
              fields: ['url', 'width', 'height'],
            },
          },
        },
      },
    },
    themes: {
      fields: ['title', 'slug'],
    },
  },
}

export default articleQuery
