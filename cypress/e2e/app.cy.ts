/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

import { validateYoutubeURL } from "@/utils/validateYoutubeURL"

const validAccount = {
  email: "phamphong.theblue@gmail.com",
  password: "123456",
  wrongPassword: "123456789"
}

const invalidMovie = [
  { url: "https://google.com", code: undefined },
  { url: "https://youtube.com", code: undefined }
]

const movies = [
  { url: "https://www.youtube.com/watch?v=jfKfPfyJRdk", code: "jfKfPfyJRdk" },
  { url: "https://www.youtube.com/watch?v=VOpCTyKgXNQ", code: "VOpCTyKgXNQ" },
  { url: "https://www.youtube.com/watch?v=wKXuPVoAr7A", code: "wKXuPVoAr7A" },
  { url: "https://www.youtube.com/watch?v=xED1JpA6JyY", code: "xED1JpA6JyY" },
  { url: "https://www.youtube.com/watch?v=3U3zvV0X_do", code: "3U3zvV0X_do" },
  { url: "https://www.youtube.com/watch?v=f-CXu-YWep8", code: "f-CXu-YWep8" },
  { url: "https://www.youtube.com/watch?v=ZsIuOMY6G3o", code: "ZsIuOMY6G3o" },
  { url: "https://www.youtube.com/watch?v=qtviSeCDV_M", code: "qtviSeCDV_M" },
  { url: "https://www.youtube.com/watch?v=mYAonZ0eY2E", code: "mYAonZ0eY2E" },
  { url: "https://www.youtube.com/watch?v=-a4_A1L-SF8", code: "-a4_A1L-SF8" },
  { url: "https://www.youtube.com/watch?v=nqHHAacbUDY", code: "nqHHAacbUDY" },
  { url: "https://www.youtube.com/watch?v=N4QdGNHcp5s", code: "N4QdGNHcp5s" },
  { url: "https://www.youtube.com/watch?v=uKU1JevaNjE", code: "uKU1JevaNjE" },
  { url: "https://www.youtube.com/watch?v=YwGNnYrzpKw", code: "YwGNnYrzpKw" },
  { url: "https://www.youtube.com/watch?v=F8JmpbNuJIM", code: "F8JmpbNuJIM" },
  { url: "https://www.youtube.com/watch?v=5ZPuKgsJgMA", code: "5ZPuKgsJgMA" },
  { url: "https://www.youtube.com/watch?v=p4p_ri2j6pQ", code: "p4p_ri2j6pQ" },
  { url: "https://www.youtube.com/watch?v=A8yeJkAuD7I", code: "A8yeJkAuD7I" },
  { url: "https://www.youtube.com/watch?v=a7tovXvJ86M", code: "a7tovXvJ86M" },
  { url: "https://www.youtube.com/watch?v=XmUS7buTjtc", code: "XmUS7buTjtc" },
  { url: "https://www.youtube.com/watch?v=WMkMUnKc5js", code: "WMkMUnKc5js" },
  { url: "https://www.youtube.com/watch?v=1eAsdWOVRxA", code: "1eAsdWOVRxA" },
  { url: "https://www.youtube.com/watch?v=1nl5YuXuV0c", code: "1nl5YuXuV0c" },
  { url: "https://www.youtube.com/watch?v=aZ_ujjtnstw", code: "aZ_ujjtnstw" },
  { url: "https://www.youtube.com/watch?v=TEKqNo9wyfI", code: "TEKqNo9wyfI" },
  { url: "https://www.youtube.com/watch?v=JYsE5J5wQoU", code: "JYsE5J5wQoU" }
]

// Cypress E2E Test
describe('Authen', () => {
  it('Login and Logout', () => {
    cy.dropDBUser()
    cy.visit('http://localhost:3000/')
    cy.login(validAccount.email, validAccount.password)
    cy.get('button[data-cy=share-button]').should("exist");
    cy.logout()
  })
  it('Login Wrong', () => {
    cy.visit('http://localhost:3000/')
    cy.login(validAccount.email, validAccount.wrongPassword)
    cy.get('button[data-cy=share-button]').should("not.exist");
  })
  it("Login and navigate to share", () => {
    cy.visit('http://localhost:3000/')
    cy.get('button[data-cy=share-button]').should("not.exist");
    cy.login(validAccount.email, validAccount.password)
    cy.get('button[data-cy=share-button]').should("exist");
    cy.navigateToShare();
  })
})
describe('Share Movie', () => {
  it("Clear movie and check data", () => {
    cy.dropDBMovie()
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=movie-empty]').should("exist");
  })
  it("Share invalid movie", () => {
    cy.visit('http://localhost:3000/')
    cy.login(validAccount.email, validAccount.password)
    cy.navigateToShare();
    invalidMovie.map((movie) => {
      expect(validateYoutubeURL(movie.url)).equal(movie.code);
      cy.share(movie.url, "URL is not valid!");
    })
  })
  it("Share list movie", () => {
    cy.visit('http://localhost:3000/')
    cy.login(validAccount.email, validAccount.password)
    cy.navigateToShare();
    movies.map((movie) => {
      expect(validateYoutubeURL(movie.url)).equal(movie.code);
      cy.share(movie.url, "The movie has been shared successfully!");
    })
  })
  it("Share list movie duplicate", () => {
    cy.visit('http://localhost:3000/')
    cy.login(validAccount.email, validAccount.password)
    cy.navigateToShare();
    movies.map((movie) => {
      expect(validateYoutubeURL(movie.url)).equal(movie.code);
      cy.share(movie.url, "Fail! Duplicate movie.");
    })
  })
})
// Prevent TypeScript from reading file as legacy script
export { }
