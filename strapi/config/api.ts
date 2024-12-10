export default {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
    cors: {
      enabled: true,
      origin: "*",
      headers: "*",
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      credentials: false,
    },
  },
};
