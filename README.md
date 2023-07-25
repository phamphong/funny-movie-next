
# Funny Movie! 🎥
Funny Movie is a website that shares interesting movies. You can watch movies shared by everyone, as well as contribute your favorite movies by sharing them.

## Prerequisites
For docker:
- Docker `24.0.2`
- Docker Compose `2.19.1`

For local:
- NodeJS `18.17.0`
- npm `9.6.7`
- yarn `1.22.19`
- nodemon `3.0.1`

## Installation & Configuration:
### Installation
#### Step by step for docker:
Install [Docker Desktop](https://docs.docker.com/get-docker) for Mac, Windows, or Linux. Docker Desktop includes Docker Compose as part of the installation.

-   1 Clone this repository.
-   2 Change directory into the root of the project.
-   3 Build:
    -   3.1 Development
    `docker compose -f docker-compose.dev.yml build`
    -   3.2 Production
    `docker compose -f docker-compose.prod.yml build`
-   4 Run
    -   4.1 Development
    `docker compose -f docker-compose.dev.yml up`
    -   4.2 Production
    `docker compose -f docker-compose.prod.yml up -d`

#### Step by step for local:
-   1 Clone this repository.
-   2 Change directory into the root of the project.
-   3 Install
    `yarn`
    or
    `yarn install`
    or
    `npm install`
-   4 Build:
    -   4.1 Development
        (no need to build)
    -   4.2 Production
        `yarn build`
        or
        `npm run build`
-   5 Run
    -   5.1 Development
        `yarn dev`
        or
        `npm run dev`
    -   5.2 Production
        `yarn start`
        or
        `npm run start`

### Configuration

Change the configuration by modifying the file:
- Development: `.env.development`
- Production: `.env.production`
Config Google API KEY by replace `GOOGLE_API_KEY` variable in [.env](#configuration) file.
To ensure the security of the production environment, you should copy the file `.env.production` to `.env.local` or `.env.production.local`, Git will ignore these files.

## Database Setup

#### Setting Database
-   Docker: database is configured in `docker-compose.dev.yml` and `docker-compose.prod.yml`
-   Local: please install [mongodb](https://www.mongodb.com/docs/manual/installation/) on local computer or use cloud service
Change database connection information by changing `MONGODB_URI` variable in [.env](#configuration) file. In case of using docker-compose, change this value in the file `docker-compose.dev.yml` or `docker-compose.prod.yml`

#### Running migrations
The application can run without data migration. Or you can run cypress test for development environment, data will be automatically deleted and added during testing.

To backup and restore data please refer [here](https://www.mongodb.com/docs/manual/tutorial/backup-and-restore-tools/)

## Running the Application

#### Step by step for docker:
-   Run
    -   Development
    `docker compose -f docker-compose.dev.yml up`
    -   Production
    `docker compose -f docker-compose.prod.yml up -d`

#### Step by step for local:

-   Build:
    -   Development
        (no need to build)
    -   Production
        `yarn build`
        or
        `npm run build`
-   Run
    -   Development
        `yarn dev`
        or
        `npm run dev`
    -   Production
        `yarn start`
        or
        `npm run start`

-   Test:
    -   Start server and test: `yarn start:e2e`
    -   Start server and test (command line only): `yarn start:e2e:headless`

-   Test separately, need to launch server before:
    - Test: `yarn e2e`
    - Test (command line only): `yarn e2e:headless`
**This end-to-end test is aimed at the development environment, it will change the data in the database. Please do not use in stable environment.**
## Usage

Non-logged in users can:
-    See the movie list right at the homepage
-    Log in by entering your email and password in the form in the header > click login. An account that does not exist will automatically register and log in.

Logged in users can:
-    See the movie list right at the homepage
-    Log out by clicking the logout button in the header
-    Share the movie by clicking the "Share a movie" button in the header bar. When the sharing form appears, enter the url of the youtube video in the "Share URL" input box > press the "Share" button. URLs other than youtube videos will be validated. Videos that do not exist will be successfully shared, existing videos will be reported as duplicates.
-   When a new movie is shared, a notification about it will appear in the lower right corner of the screen.

## Troubleshooting
