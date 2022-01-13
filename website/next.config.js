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
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
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
      {
        source: '/artikel/over-onderzoek-informatie-en-statistiek',
        destination: '/artikel/over-onderzoek-en-statistiek',
        permanent: true,
      },
      {
        source: '/interactief/kerncijfers-gebieden',
        destination: '/interactief/dashboard-kerncijfers',
        permanent: true,
      },
      {
        source: '/interactief/hoe-veilig-is-mijn-buurt',
        destination: '/interactief/dashboard-veiligheid',
        permanent: true,
      },
      {
        source: '/interactief/armoede-in-amsterdam',
        destination: '/interactief/dashboard-armoede',
        permanent: true,
      },
      {
        source: '/thema/onderwijs-en-wetenschap',
        destination: '/thema/onderwijs-en-jeugd',
        permanent: true,
      },
    ]
  },
})
