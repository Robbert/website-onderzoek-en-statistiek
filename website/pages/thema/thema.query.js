const themeQuery = {
  populate: {
    squareImage: {
      fields: ['url'],
    },
    rectangularImage: {
      fields: ['url'],
    },
    visualisation: {
      populate: {
        image: {
          fields: ['url', 'width', 'height'],
        },
      },
    },
    topStory: {
      populate: {
        articles: { fields: ['slug'] },
        interactives: { fields: ['slug'] },
        publications: { fields: ['slug'] },
        videos: { fields: ['slug'] },
      },
    },
    featured: {
      populate: {
        articles: {
          fields: ['title', 'shortTitle', 'teaser', 'slug'],
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
          fields: ['title', 'shortTitle', 'teaser', 'slug'],
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
          fields: ['title', 'shortTitle', 'teaser', 'slug'],
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
          fields: ['title', 'shortTitle', 'teaser', 'slug'],
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
          fields: ['title', 'shortTitle', 'teaser', 'slug'],
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
    collections: {
      fields: ['title', 'slug', 'updatedAt'],
    },
    combiPicture: {
      populate: {
        smallerImage: {
          fields: ['url'],
        },
        biggerImage: {
          fields: ['url'],
        },
      },
    },
  },
}

export default themeQuery
