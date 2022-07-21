const collectionQuery = {
  populate: {
    squareImage: {
      fields: ['url'],
    },
    rectangularImage: {
      fields: ['url', 'caption', 'width', 'height'],
    },
    featured: {
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
        datasets: {
          fields: ['title', 'slug'],
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
    collectionItems: {
      populate: {
        articles: {
          fields: ['title', 'teaser', 'slug', 'publicationDate'],
        },
        datasets: {
          fields: ['title', 'teaser', 'slug', 'publishedAt'],
        },
        interactives: {
          fields: ['title', 'teaser', 'slug', 'publicationDate'],
        },
        publications: {
          fields: [
            'title',
            'teaser',
            'slug',
            'publicationDate',
            'formatPublicationDate',
          ],
        },
        videos: {
          fields: ['title', 'teaser', 'slug', 'publicationDate'],
        },
      },
    },
    linkList: {
      populate: {
        articles: {
          fields: ['title', 'slug'],
        },
        collections: {
          fields: ['title', 'slug'],
        },
        datasets: {
          fields: ['title', 'slug'],
        },
        interactives: {
          fields: ['title', 'slug'],
        },
        links: {
          fields: ['title', 'path'],
        },
        publications: {
          fields: ['title', 'slug'],
        },
        videos: {
          fields: ['title', 'slug'],
        },
      },
    },
    themes: {
      fields: ['title', 'slug'],
    },
  },
}

export default collectionQuery
