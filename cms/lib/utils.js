/* eslint-disable no-param-reassign */
const slugify = require('slugify');
const got = require('got');

const parseBodyText = async (body) => {
  const regex = /\(([^)]+)\)/g;

  const parseItem = async (item) => {
    const last5 = item.slice(-5).toLowerCase();
    if (['.gif)', '.png)', '.jpg)', 'jpeg)'].includes(last5)) {
      const filename = item.slice(1, -1);
      const imageData = await strapi.query('file', 'upload')
        .findOne({ name: filename })
        .then((image) => {
          if (image && image.url) return `(${image.url})`;

          console.log(`image ${filename} not found`);
          return '()';
        });
      return imageData;
    }

    return item;
  };

  const promises = [];
  body.replace(regex, (match, ...args) => {
    const promise = parseItem(match, ...args);
    promises.push(promise);
  });

  const data = await Promise.all(promises);

  return body.replace(/\n\n\n/g, '\n\n').replace(regex, () => data.shift());
};

const convertSlugsToIds = async (slugs, category, itemSlug) => {
  const promises = slugs.map(async (slug) => strapi.query(category).findOne({ slug }));
  const ids = await Promise.all(promises)
    .then((items) => items.map((item) => item.id))
    .catch((err) => console.log(`problem converting slug to id in ${itemSlug} `, err.message));
  return ids;
};

const convertFilenameToId = async (filename, itemSlug) => {
  const id = strapi.query('file', 'upload')
    .findOne({ name: filename })
    .then((item) => item.id)
    .catch((err) => console.log(`problem converting filename to id in ${itemSlug} `, err.message));
  return id;
};

const parseContentFromDrupal = async (contentType, item) => {
  // console.log(`importing ${contentType} ${item.title} from drupal`);

  if (item.rectangularImage) {
    item.rectangularImage = await convertFilenameToId(item.rectangularImage, item.slug);
  }
  if (item.squareImage) {
    item.squareImage = await convertFilenameToId(item.squareImage, item.slug);
  }
  if (item.coverImage) {
    item.coverImage = await convertFilenameToId(item.coverImage, item.slug);
  }
  if (item.file) {
    item.file = await convertFilenameToId(item.file);
  }
  if (item.theme) {
    item.theme = await convertSlugsToIds(item.theme, 'theme', item.slug);
  }
  if (item.videoFile) {
    item.videoFile = await convertFilenameToId(item.videoFile, item.slug);
  }
  if (item.subtitleFile) {
    item.subtitleFile = await convertFilenameToId(item.subtitleFile, item.slug);
  }

  if (item.bodyText) {
    item.body.push({
      __component: 'shared.text',
      text: await parseBodyText(item.bodyText),
    });
  }

  if (item.links) {
    const linkList = {
      __component: 'shared.link-list',
    };

    // none of the content types can link to articles because they are imported last
    // publications can not link to other publications while they are imported
    if (item.links.articles.length > 0) {
      linkList.articles = await convertSlugsToIds(item.links.articles, 'article', item.slug);
    }
    if (item.links.publications.length > 0) {
      linkList.publications = await convertSlugsToIds(item.links.publications, 'publication', item.slug);
    }
    if (item.links.videos.length > 0) {
      linkList.videos = await convertSlugsToIds(item.links.videos, 'video', item.slug);
    }
    if (item.links.interactives.length > 0) {
      linkList.interactives = await convertSlugsToIds(item.links.videos, 'interactive', item.slug);
    }
    if (item.links.links.length > 0) {
      linkList.links = item.links.links;
    }

    item.body.push(linkList);
  }

  delete item.bodyText;
  delete item.links;

  return item;
};

const parseContentFromDcat = async (item) => {
  console.log(`importing dataset ${item.title} from dcat`);

  item.slug = slugify(item.title, { lower: true });

  if (item.theme) item.theme = await convertSlugsToIds(item.theme, 'theme');

  const promises = item.resources.map(async (resource) => {
    resource.file = await convertFilenameToId(resource.file);
    return resource;
  });
  item.resources = await Promise.all(promises);

  return item;
};

const rebuildSearchContent = async () => {
  const baseUrl = process.env.WEBSITE_DOMAIN || 'http://localhost:3000';
  const headers = {
    Authorization: `Basic ${Buffer.from('OenS:@Weesper113').toString('base64')}`,
  };
  try {
    await got(`${baseUrl}/api/build-search`, { headers });
  } catch (error) {
    console.log('failed to rebuild search content:', error);
  }
};

module.exports = {
  parseContentFromDrupal,
  parseContentFromDcat,
  rebuildSearchContent,
};
