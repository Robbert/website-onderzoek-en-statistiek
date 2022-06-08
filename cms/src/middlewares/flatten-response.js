const isObject = (data) => Object.prototype.toString.call(data) === '[object Object]';

const flatten = (data) => (!data.attributes ? data : data.attributes);

const flattenApiResponse = (data) => {
  let mutableData = data;

  if (Array.isArray(mutableData)) {
    return mutableData.map((item) => flattenApiResponse(item));
  }

  if (isObject(mutableData)) {
    if (Array.isArray(mutableData.data)) {
      mutableData = [...mutableData.data];
    } else if (isObject(mutableData.data)) {
      mutableData = flatten({ ...mutableData.data });
    } else if (mutableData.data === null) {
      mutableData = null;
    } else {
      mutableData = flatten(mutableData);
    }

    if (mutableData) {
      Object.keys(mutableData).forEach((key) => {
        // don't mutate vega-lite specifications
        if (key !== 'specification') {
          mutableData[key] = flattenApiResponse(mutableData[key]);
        }
      });
    }

    return mutableData;
  }

  return mutableData;
};

async function respond(ctx, next) {
  await next();
  if (!ctx.url.startsWith('/api') || ctx.url.startsWith('/api/upload')) {
    return;
  }
  ctx.response.body = {
    data: flattenApiResponse(ctx.response.body.data),
    meta: ctx.response.body.meta,
  };
}

module.exports = () => respond;
