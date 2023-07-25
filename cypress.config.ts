import { defineConfig } from 'cypress'
import mongoose from 'mongoose'

export default defineConfig({
  env: {
    codeCoverage: {
      url: '/api/__coverage__',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    async setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      let connection = await mongoose.connect("mongodb://localhost:27017/funny-movie")
      let collectionName = await connection.connection.db.listCollections().toArray()

      on("task", {
        async clearUsers() {
          console.log('clear users')
          if (collectionName.find(k => k.name === "users")) {
            await connection.connection.collection("users").deleteMany({})
          }
          return null
        },
        async clearMovies() {
          console.log('clear movies')
          if (collectionName.find(k => k.name === "movies")) {
            await connection.connection.collection("movies").deleteMany({})
          }
          return null
        },
      })

      return config;
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
