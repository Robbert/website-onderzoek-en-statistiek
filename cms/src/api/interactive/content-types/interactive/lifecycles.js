/* eslint-disable no-param-reassign */
module.exports = {
  beforeCreate(event) {
    console.log(event.params);
    if (!event.params.data.publicationDate) {
      console.log(new Date(Date.now()).toISOString());
      event.params.data.publicationDate = new Date(Date.now()).toISOString();
    }
  },
};
