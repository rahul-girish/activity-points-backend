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