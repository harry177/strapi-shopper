"use strict";

module.exports = {
  async addToCart(ctx) {
    if (!ctx.request.body) {
      return ctx.badRequest("Missing request body");
    }

    const { userId, productId } = ctx.request.body;

    if (!userId || !productId) {
      return ctx.badRequest("Missing userId or productId");
    }

    const user = await strapi
      .documents("plugin::users-permissions.user")
      .findOne({
        documentId: userId,
        populate: ["cart"],
      });

    const updatedUser = await strapi
      .documents("plugin::users-permissions.user")
      .update({
        documentId: userId,
        data: { cart: [...user.cart, { product: { connect: [productId] } }] },
        status: "published",
      });

    ctx.send(updatedUser);
  },

  async removeFromCart(ctx) {
    if (!ctx.request.body) {
      return ctx.badRequest("Missing request body");
    }

    const { userId, productId } = ctx.request.body;

    if (!userId || !productId) {
      return ctx.badRequest("Missing userId or productId");
    }

    const user = await strapi
      .documents("plugin::users-permissions.user")
      .findOne({
        documentId: userId,
        populate: {
          cart: {
            populate: {
              product: {
                populate: [],
              },
            },
          },
        },
      });

    const indexToDelete = user.cart.findIndex(
      (product) => product.product[0].slug === productId
    );

    let updatedCart;

    if (indexToDelete !== -1) {
      user.cart.splice(indexToDelete, 1);
      updatedCart = user.cart;
    } else {
      updatedCart = user.cart;
    }
    
    const updatedUser = await strapi.documents("plugin::users-permissions.user").update({
      documentId: userId,
      data: { cart: updatedCart },
      status: "published",
    });

    ctx.send(updatedUser);
  },
};
