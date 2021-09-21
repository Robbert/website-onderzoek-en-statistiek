module.exports = () => ({
  upload: {
    providerOptions: {
      localServer: {
        maxage: 604800 * 1000, // 604800 = week, 31536000 = year
      },
    },
  },
});
