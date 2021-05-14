export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

export function getStrapiMedia(media) {
  if (!media) return null;
  const imageUrl = media.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media.url;
  return imageUrl;
}

export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  if (response.status === 200) {
    const  data = await response.json();
    return data;
  }
  else {
    return [];
  }
}

// for future use
export function translateContentType(type) {
  const contentTypes = {
    "article": "Artikel",
    "publication": "Publicatie",
    "video": "Video",
    "theme": "Thema",
    "collection": "Dossier"
  }
  return contentTypes[type];
}

export function flattenFeatureList(list) {
  if (!list) return [];

  let flattendList = [];
  
  list.forEach(section => {
    const articles = section.articles?.map(entry => (
      {
        ...entry,
        type: 'article',
        name: 'artikel',
        path: `/artikel/${entry.slug}`
      }
    )) || [];
    const publications = section.publications?.map(entry => (
      {
        ...entry,
        type: 'publication',
        name: 'publicatie',
        path: `/publicatie/${entry.slug}`
      }
    ))  || [];   
    const videos = section.videos?.map(entry => (
      {
        ...entry,
        type: 'video',
        name: 'video',
        path: `/video/${entry.slug}`
      }
    )) || [];
    const collections = section.collections?.map(entry => (
      {
        ...entry,
        type: 'collection',
        name: 'dossier',
        path: `/dossier/${entry.slug}`
      }
    )) || [];

    flattendList = [...flattendList, ...articles, ...publications, ...videos, ...collections]
    
  });
    
  return flattendList;
};

