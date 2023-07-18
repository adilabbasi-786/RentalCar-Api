"use strict";

/**
 * booking controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::booking.booking", ({ strapi }) => ({
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: "en" };

    // Calling the default core action
    const userId = ctx.state.user.id;
    const entries = await strapi.db.query("api::booking.booking").findMany({
      select: ["name"],
      where: { users_permissions_user: userId },
    });
    console.log(entries);
    // const { data, meta } = await super.find(ctx);

    // some more custom logic
    // meta.date = Date.now();

    return { data: entries };
  },
  async create(ctx) {
    ctx.request.body.data.users_permissions_user = ctx.state.user.id;
    let entity = await strapi
      .service("api::booking.booking")
      .create(ctx.request.body);
    return entity;
  },
}));
