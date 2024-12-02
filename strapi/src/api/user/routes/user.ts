"use strict";

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/users/:userId/cart",
      handler: "user.updateCart",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/users/:userId/removecart",
      handler: "user.removeFromCart",
      config: {
        policies: [],
      },
    },
  ],
};
