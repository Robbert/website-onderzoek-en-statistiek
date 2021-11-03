'use strict';

const got = require('got');
const jwtDecode = require('jwt-decode');

const config = {
  name: process.env.KEYCLOAK_NAME,
  pass: process.env.STRAPI_ENVIRONMENT !== 'production' ? process.env.KEYCLOAK_PASS_ACC : process.env.KEYCLOAK_PASS_PROD,
  realm: process.env.STRAPI_ENVIRONMENT !== 'production' ? process.env.KEYCLOAK_REALM_ACC : process.env.KEYCLOAK_REALM_PROD,
  prefix: process.env.STRAPI_ENVIRONMENT !== 'production' ? 'acc.' : '',
};

const themesMap = {
  Bestuur: 'theme:bestuur',
  Bevolking: 'theme:bevolking',
  'Cultuur en recreatie': 'theme:cultuur-en-recreatie',
  'Duurzaamheid en milieu': 'theme:duurzaamheid-en-milieu',
  'Economie en toerisme': 'theme:economie-en-toerisme',
  'Onderwijs en wetenschap': 'theme:onderwijs-en-wetenschap',
  'Openbare orde en veiligheid': 'theme:openbare-orde-en-veiligheid',
  'Ruimte en topografie': 'theme:ruimte-en-topografie',
  Verkeer: 'theme:verkeer',
  'Werk en sociale zekerheid': 'theme:werk-en-sociale-zekerheid',
  Wonen: 'theme:wonen',
  'Zorg en welzijn': 'theme:zorg-en-welzijn',
};

const periodicityMap = {
  onbekend: 'unknown',
  realtime: 'realtime',
  dagelijks: 'day',
  'twee keer per week': '2pweek',
  wekelijks: 'week',
  tweewekelijks: '2weeks',
  maandelijks: 'month',
  'eens per kwartaal': 'quarter',
  halfjaarlijks: '2pyear',
  jaarlijks: 'year',
  tweejaarlijks: '2years',
  vierjaarlijks: '4years',
  vijfjaarlijks: '5years',
  tienjaarlijks: '10years',
  regelmatig: 'reg',
  onregelmatig: 'irreg',
  'op afroep': 'req',
  anders: 'other',
};

const temporalMap = {
  onbekend: 'na',
  realtime: 'realtime',
  minuten: 'minutes',
  uren: 'hours',
  dagdelen: 'parttime',
  dagen: 'days',
  weken: 'weeks',
  maanden: 'months',
  kwartalen: 'quarters',
  jaren: 'years',
  anders: 'other',
};

const spacialMap = {
  onbekend: 'na',
  specifiek: 'specific',
  land: 'nation',
  regio: 'region',
  gemeente: 'city',
  stadsdeel: 'district',
  gebied: 'area',
  wijk: 'borrow',
  buurt: 'neighborhood',
  bouwblok: 'block',
  postcode: 'zip6',
  anders: 'other',
};

const extensionMap = {
  '.csv': 'text/csv',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.doc': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
};

const typeMap = {
  databestand: 'data',
  api: 'data',
  documentatie: 'doc',
  visualisatie: 'vis',
};

const distributionMap = {
  databestand: 'file',
  api: 'api',
  documentatie: 'web',
  visualisatie: 'web',
};

const tokenIsValid = (token) => {
  const { exp } = jwtDecode(token);
  const currentTime = new Date().getTime() / 1000;
  return (currentTime < exp);
};

const getToken = async (token) => {
  if (token && tokenIsValid(token)) return token;

  const url = `https://iam.amsterdam.nl/auth/realms/${config.realm}/protocol/openid-connect/token`;
  const auth = Buffer.from(`${config.name}:${config.pass}`).toString('base64');

  try {
    const response = await got.post(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: { grant_type: 'client_credentials' },
    }).json();
    return response.access_token;
  } catch (error) {
    console.log('failed to get a token');
    return null;
  }
};

const getETag = async (id, slug) => {
  const url = `https://${config.prefix}api.data.amsterdam.nl/dcatd/datasets/${id}`;
  try {
    const response = await got(url);
    return response.headers.etag;
  } catch (error) {
    console.log(`failed to get an etag for ${slug}`);
    return null;
  }
};

const getIdentifier = (location) => location.substring(location.lastIndexOf('/') + 1);

const createDataset = async (data, slug, token) => {
  const url = `https://${config.prefix}api.data.amsterdam.nl/dcatd/datasets`;
  try {
    return await got.post(url, {
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/hal+json',
      },
    });
  } catch (error) {
    console.log(`failed to create ${slug} in data catalog`, error);
    return null;
  }
};

const updateDataset = async (id, etag, data, slug, token) => {
  const url = `https://${config.prefix}api.data.amsterdam.nl/dcatd/datasets/${id}`;
  try {
    return await got.put(url, {
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/hal+json',
        'If-Match': etag,
      },
    });
  } catch (error) {
    console.log(`failed to update ${slug} in data catalog`, error);
    return null;
  }
};

const deleteDataset = async (id, etag, slug, token) => {
  const url = `https://${config.prefix}api.data.amsterdam.nl/dcatd/datasets/${id}`;
  try {
    return await got.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/hal+json',
        'If-Match': etag,
      },
    });
  } catch (error) {
    console.log(`failed to delete ${slug} in data catalog`, error);
    return null;
  }
};

const transformResources = (resources) => resources.map((resource) => ({
  'dct:title': resource.title,
  'dcat:accessURL': resource.file ? `https://${config.prefix}cms.onderzoek-en-statistiek.nl${resource.file.url}` : resource.url,
  'ams:resourceType': typeMap[resource.type],
  'ams:distributionType': resource.file ? 'file' : distributionMap[resource.type],
  'dcat:mediaType': resource.file ? extensionMap[resource.file.ext] : null,
  'ams:classification': 'public',
  'dct:license': 'cc-by',
  'dct:modified': resource.file ? resource.file.updated_at : null,
  'foaf:isPrimaryTopicOf': {
    'dct:modified': resource.file ? resource.file.updated_at : null,
    'dct:issued': resource.file ? resource.file.created_at : null,
  },
}));

const transformDataset = (dataset) => ({
  'dct:title': dataset.title,
  'dct:description': dataset.body.reduce((allText, bodyItem) => allText + bodyItem.text, ''),
  'ams:status': 'beschikbaar',
  'dcat:distribution': transformResources(dataset.resources),
  'dcat:theme': dataset.theme ? dataset.theme.map((theme) => themesMap[theme.title]) : [],
  'dcat:keyword': [],
  'ams:license': dataset.license.replace('_', '-'),
  'overheid:authority': 'overheid:Amsterdam',
  'dct:identifier': '',
  'dct:publisher': {
    'foaf:name': dataset.publisherName,
    'foaf:mbox': dataset.publisherMail,
  },
  'dct:accrualPeriodicity': periodicityMap[dataset.frequency],
  'ams:temporalUnit': temporalMap[dataset.temporalUnit],
  'ams:spatialUnit': spacialMap[dataset.spatialUnit],
  'dct:language': 'lang1:nl',
  'ams:owner': dataset.owner,
  'dcat:contactPoint': {
    'vcard:fn': dataset.contactName,
    'vcard:hasEmail': dataset.contactMail,
  },
  'overheidds:doel': dataset.purpose,
  'foaf:isPrimaryTopicOf': {
    'dct:issued': dataset.published_at,
    'dct:modified': dataset.updated_at,
  },
});

module.exports = {
  getToken,
  getETag,
  getIdentifier,
  updateDataset,
  createDataset,
  deleteDataset,
  transformDataset,
};
