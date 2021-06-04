const parseBody = async body => {
    const regex = /\(([^\)]+)\)/g;
    
    const parseItem = async item => {
        const last5 = item.slice(-5).toLowerCase();
        if ([".png)", ".jpg)", "jpeg)"].includes(last5)){
          const filename = item.slice(1,-1);
          const imageData = await strapi.query("file", "upload")
            .findOne({ name: filename})
            .then(image => {
                if (image && image.url) return `(${image.url})`
                else {
                    console.log(`image ${filename} not found`);
                    return '()';
                }
            })
          return imageData;
        }
        else {
          return item; 
        }
    }

    const promises = [];
    body.replace(regex, (match, ...args) => {
        const promise = parseItem(match, ...args);
        promises.push(promise);
    });

    const data = await Promise.all(promises);

    return body.replace(/\n\n\n/g, '\n\n').replace(regex, () => data.shift());
}

const convertSlugsToIds = async (slugs, category) => {
    const promises = slugs.map(async slug => await strapi.query(category).findOne({ slug: slug}))
    const ids = await Promise.all(promises)
        .then(items => items.map(item => item.id))
        .catch(err => console.log(err.message));
    return ids
}

const convertFilenameToId = async (filename) => {
    const id = strapi.query("file", "upload")
        .findOne({ name: filename})
        .then(item => { 
            if (item && item.id) return item.id
        })
    return id;
}

const parseContentFromDrupal = async (contentType, item) => {

    console.log(`importing ${contentType} ${item.title} from drupal`)
    
    if (item.coverImage) item.coverImage = await convertFilenameToId(item.coverImage)
    if (item.teaserImage) item.teaserImage = await convertFilenameToId(item.teaserImage)
    if (item.videoFile) item.videoFile = await convertFilenameToId(item.videoFile)
    if (item.subtitleFile) item.subtitleFile = await convertFilenameToId(item.subtitleFile)
    if (item.file) item.file = await convertFilenameToId(item.file)

    if (item.theme) item.theme = await convertSlugsToIds(item.theme, "theme");
    if (item.body) item.body = await parseBody(item.body);
    if (item.related) {
        item.related.articles = await convertSlugsToIds(item.related.articles, "article"); 
        item.related.publications = await convertSlugsToIds(item.related.publications, "publication");
        item.related.videos = await convertSlugsToIds(item.related.videos, "video"); 
        item.related.interactives = await convertSlugsToIds(item.related.interactives, "interactive"); 
    }

    return item;
}

module.exports = {
    parseContentFromDrupal,
}