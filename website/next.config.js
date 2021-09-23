const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
    return config
  },
  webpackDevMiddleware: (config) => config,
  images: {
    domains: ['localhost', 'cms.onderzoek-en-statistiek.nl', 'acc.cms.onderzoek-en-statistiek.nl'],
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'api.js'],
  async headers() {
    return [
      {
        source: '/(.*).(jpg|jpeg|gif|png|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=604800, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/artikel',
        destination: '/zoek?categorie=artikel',
        permanent: true,
      },
      {
        source: '/publicatie',
        destination: '/zoek?categorie=publicatie',
        permanent: true,
      },
      {
        source: '/video',
        destination: '/zoek?categorie=video',
        permanent: true,
      },
      {
        source: '/interactief',
        destination: '/zoek?categorie=interactief',
        permanent: true,
      },
      {
        source: '/dossier',
        destination: '/zoek?categorie=dossier',
        permanent: true,
      },
      {
        source: '/dataset',
        destination: '/zoek?categorie=dataset',
        permanent: true,
      },
      {
        source: '/thema',
        destination: '/zoek',
        permanent: true,
      },
    ]
  },
})
