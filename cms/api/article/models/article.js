'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {

    lifecycles: {
        beforeCreate: async (data) => {
            const user = await strapi.query("strapi::user").findOne({id: data.created_by})
            data.createdBy = `${user.firstname} ${user.lastname}`
        },
        beforeUpdate: async (params, data) => {
            const user = await strapi.query("strapi::user").findOne({id: data.updated_by})
            data.updatedBy = `${user.firstname} ${user.lastname}`
        },

      },

};
