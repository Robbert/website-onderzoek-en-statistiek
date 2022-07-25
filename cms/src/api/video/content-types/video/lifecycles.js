/* eslint-disable no-param-reassign */
module.exports = {
  beforeCreate(event) {
    if (!event.params.data.publicationDate) {
      event.params.data.publicationDate = new Date(Date.now()).toISOString();
    }
  },
};
