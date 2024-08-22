const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  },
  e2e: {
    baseUrl: 'https://reqres.in',
    setupNodeEvents(on, config) {
      // implement node event listeners here
       // Get the environment variable CYPRESS_ENV and decide the base URL
       const env = process.env.CYPRESS_ENV || 'development'; // Default to development
       let baseUrl;
 
       if (env === 'staging') {
         baseUrl = 'https://reqres.in.staging';
       } else {
         baseUrl = 'https://reqres.in';
       }
 
       config.baseUrl = baseUrl;
 
       // Return the updated config object
       return config;
    },
  },
});
