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
  ],
};
