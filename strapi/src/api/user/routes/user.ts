"use strict";

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/users/:userId/add-to-cart",
      handler: "user.addToCart",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/users/:userId/remove-from-cart",
      handler: "user.removeFromCart",
      config: {
        policies: [],
      },
    },
  ],
};
