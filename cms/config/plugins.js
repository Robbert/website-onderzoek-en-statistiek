module.exports = ({ env }) => ({
  upload: {
    enabled: true,
    config: {
      providerOptions: {
        localServer: {
          maxage: 604800 * 1000, // 604800 = week, 31536000 = year
        },
      },
    },
  },
  'os-utilities': {
    enabled: true,
    resolve: './src/plugins/os-utilities',
  },
  'preview-button': {
    config: {
      contentTypes: [
        {
          uid: 'api::homepage.homepage',
          published: {
            url: env('WEBSITE_DOMAIN'),
          },
        },
        {
          uid: 'api::article.article',
          published: {
            url: `${env('WEBSITE_DOMAIN')}/artikel/{slug}`,
          },
          draft: {
            url: `${env('WEBSITE_DOMAIN')}/api/preview`,
            query: {
              type: 'article',
              slug: '{slug}',
            },
          },
        },
        {
          uid: 'api::collection.collection',
          published: {
            url: `${env('WEBSITE_DOMAIN')}/dossier/{slug}`,
          },
          draft: {
            url: `${env('WEBSITE_DOMAIN')}/api/preview`,
            query: {
              type: 'collection',
              slug: '{slug}',
            },
          },
        },
        {
          uid: 'api::dataset.dataset',
          published: {
            url: `${env('WEBSITE_DOMAIN')}/dataset/{slug}`,
          },
          draft: {
            url: `${env('WEBSITE_DOMAIN')}/api/preview`,
            query: {
              type: 'dataset',
              slug: '{slug}',
            },
          },
        },
        {
          uid: 'api::interactive.interactive',
          published: {
            url: `${env('WEBSITE_DOMAIN')}/interactief/{slug}`,
          },
          draft: {
            url: `${env('WEBSITE_DOMAIN')}/api/preview`,
            query: {
              type: 'interactive',
              slug: '{slug}',
            },
          },
        },
        {
          uid: 'api::publication.publication',
          published: {
            url: `${env('WEBSITE_DOMAIN')}/publicatie/{slug}`,
          },
          draft: {
            url: `${env('WEBSITE_DOMAIN')}/api/preview`,
            query: {
              type: 'publication',
              slug: '{slug}',
            },
          },
        },
        {
          uid: 'api::theme.theme',
          published: {
            url: `${env('WEBSITE_DOMAIN')}/thema/{slug}`,
          },
          draft: {
            url: `${env('WEBSITE_DOMAIN')}/api/preview`,
            query: {
              type: 'theme',
              slug: '{slug}',
            },
          },
        },
        {
          uid: 'api::video.video',
          published: {
            url: `${env('WEBSITE_DOMAIN')}/video/{slug}`,
          },
          draft: {
            url: `${env('WEBSITE_DOMAIN')}/api/preview`,
            query: {
              type: 'video',
              slug: '{slug}',
            },
          },
        },
      ],
    },
  },
});
