"use strict";

module.exports = {
    async updateCart(ctx) {
        if (!ctx.request.body) {
          return ctx.badRequest('Missing request body');
        }
    
        const { userId, productId } = ctx.request.body;
    
        if (!userId || !productId) {
          return ctx.badRequest('Missing userId or productId');
        }
    
        const user = await strapi.documents('plugin::users-permissions.user').findOne({
          documentId: userId,
          populate: ['cart']
        });
    
        const updatedUser = await strapi.documents('plugin::users-permissions.user').update({
          documentId: userId,
          data: { cart: [...user.cart, {product: {connect: [productId]}}]} ,
          status: 'published',
        });

        
    
        ctx.send(updatedUser);
      }
};
