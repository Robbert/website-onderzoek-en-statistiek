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
  return !list? [] : list.map(section => ([
      ...section.articles?.map(entry => (
        {
          ...entry,
          type: 'article',
          name: 'artikel',
          path: `/artikel/${entry.slug}`
        }
      )) || [],
      ...section.publications?.map(entry => (
        {
          ...entry,
          type: 'publication',
          name: 'publicatie',
          path: `/publicatie/${entry.slug}`
        }
      ))  || [],  
      ...section.videos?.map(entry => (
        {
          ...entry,
          type: 'video',
          name: 'video',
          path: `/video/${entry.slug}`
        }
      )) || [],
      ...section.collections?.map(entry => (
        {
          ...entry,
          type: 'collection',
          name: 'dossier',
          path: `/dossier/${entry.slug}`
        }
      )) || []
    ]
  )).flat();
};

