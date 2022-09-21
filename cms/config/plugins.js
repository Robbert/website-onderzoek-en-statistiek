module.exports = () => ({
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
});
