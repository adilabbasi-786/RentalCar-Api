"use strict";
const YOUR_DOMAIN = "http://localhost:1337";
const stripe = require("stripe")(
  "sk_test_51NI3o0G4I4pCcBDE8RH1cOQAjpqGCfYJvyY3ZsFxUvSUMIfnXbU5sFnmyCSva31xikNU8dXWIcsjYPXa9OGGHLjk00itDXlPTh"
);

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
  async newBooking(ctx) {
    const bookingId = ctx.request.body.bookingId;
    const userId = ctx.state.user.id;
    console.log(userId);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1NVyWwG4I4pCcBDEnk4JQRnm",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}/mybooking`,
    });

    return session.url;
  },
  async updatePayment(ctx) {
    const bookingId = ctx.request.body.bookingId;
    const transactionId = ctx.request.body.transactionId;
    console.log(ctx.request.body);
    const entry = await strapi.entityService.update(
      "api::booking.booking",
      bookingId,
      {
        data: {
          Status: "confirmed",
          transactionId: transactionId,
        },
      }
    );
    return "hello";
  },
}));
