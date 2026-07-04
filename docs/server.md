To build the Docker image and run a container:
```
docker build -t activity-points-backend .
docker run -p 5000:5000 --env-file .env activity-points-backend
```

When the server is running, you can send the following request:
```
GET http://localhost:5000/health
```
A normal response would be
```
{
    "status": "UP",
    "message": "Server is online"
}
```

