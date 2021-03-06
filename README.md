# simple-weather-app

A simple app for the weather

## Setting Up For Local Runs

* Copy **.env.sample** as **.env** in the project root and fill in required env vars, likely the WEATHER_API_KEY.
* Run `npm install`
* You can optionally use a local redis instance or use an existing redis instance for this. On Mac with homebrew, all it takes is `brew install redis` and then `redis-server /usr/local/etc/redis.conf` to run the redis-server. [Here is a link for other platforms](https://redis.io/topics/quickstart). If you run redis locally, REDIS_HOST and REDIS_PORT are 127.0.0.1 and 6379 respectively.
* Run `npm run dev`
* App will be running at http://localhost.com:3000
## Setting Up For Local Docker Build

* [Install Docker Compose and prereqs](https://docs.docker.com/compose/gettingstarted/)
* Run `docker-compose -f docker-compose.local.yml build`. You won't have to run this again unless you update the code.
* Run `docker-compose -f docker-compose.local.yml up`. Then you can access the dockerized version of the app from `localhost:3000`
* If you need to destroy the app, then run `docker-compose -f docker-compose.local.yml down`
* You don't need to run local redis for this because the docker-compose config sets up it's own local redis
