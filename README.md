## Deployment frontend: [https://strapi-shopper.vercel.app/](https://strapi-shopper.vercel.app/)

## Deployment backend: [https://strapi-shopper-backend-c8c4fe79471e.herokuapp.com/](https://strapi-shopper-backend-c8c4fe79471e.herokuapp.com/)

## About:

Strapi-shopper is an example of how the modern Strapi CMS full-stack application can be.
For this project Strapi 5 was selected, which means that for the backend part new Strapi documents API was used for making and customizing controllers.

To get access for adding / removing products to / from cart user needs to create an account.

This repo contains both sides - frontend and backend, including copy of my local sqlite database. However, if you decide to clone it and launch locally you can`t access CMS account without credentials. Therefore the best way - to delete .env file and .tmp folder from strapi folder and then to create your own sqlite local database independently (Cloudinary credentials from .env can be copied to new .env file).

If you will have any questions - please contact me.

## ATTENTION!!!

- Strapi-plugin-io is still incompatible with Strapi 5, therefore just REST api was used.
- For media storage was used Cloudinary

## Technology stack

- **Frontend:** SCSS, TypeScript, React, Ant Design, Redux Toolkit, RTK Query
- **Backend:** Node.js, Strapi v.5, Typescript
- **Bundler:** Vite
- **Database and model:** SQLite
- **Linters and helpers:** Eslint

## Author

Artem Prygunov