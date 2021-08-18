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
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  i18n: {
    locales: ['nl-NL'],
    defaultLocale: 'nl-NL',
  },
})
