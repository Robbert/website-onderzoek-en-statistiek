
/*
// Logic for importing OS content from Drupal
*/


const parseInlineImages = async (data) => {

  const regexp = /\(([^\)]+)\)/g;
  const parsedImages = data.replace(regexp, async item => {
    const last5 = item.slice(-5).toLowerCase();
    if ([".png)", ".jpg)", "jpeg)"].includes(last5)){
      const filename = item.slice(1,-1);
      const imageData = await strapi.query("file", "upload").findOne({ name: filename})
      return imageData.formats.medium.url;
    }
    else {
      return item; 
    }
       
  })
  return parsedImages;
}

const importItemByContentType = async (id, item) => {
  
  // change filename with media id for cover and teaser images
  const coverImage = await strapi.query("file", "upload").findOne({ name: item.coverImage})
  if (coverImage && coverImage.id) item.coverImage = coverImage.id
  
  const teaserImage = await strapi.query("file", "upload").findOne({ name: item.teaserImage})
  if (teaserImage && teaserImage.id) item.teaserImage = teaserImage.id  
  
  // replace url for inline images
  item.body = await parseInlineImages(item.body);

  return strapi.query(id).create(item);
};





const importSingleType = async (uid, item) => {
  const existing = await strapi.query(uid).find({});
  if (existing.length > 0) {
    return strapi.query(uid).update({
      id: existing[0].id,
    }, item)
  } else {
    return strapi.query(uid).create(item);
  }
};

const findAll = (uid) => {
  return strapi.query(uid).find({});
};

const deleteByIds = (uid, ids) => {
  return strapi.query(uid).delete({
    id_in: ids
  });
};

module.exports = {
  importItemByContentType,
  findAll,
  deleteByIds,
  importSingleType,
};