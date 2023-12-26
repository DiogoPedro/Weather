# Weather App

## Stacks


## How to run
In the root folder run the commands:
```
  docker build --no-cache -t weather_app .
  docker run --name weather_app_container -dp 127.0.0.1:80:4173 weather_app
```

then access:
**[link](http://localhost:80)**

to stop docker container run:
```
  docker stop weather_app_container
```