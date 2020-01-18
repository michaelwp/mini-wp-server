# mini-wp

### Web Url : http://miniwp.mputong.com/

### api-Documentation : 
``` API-BASE-URL: http://35.184.99.60:3000 ```
### postman : https://documenter.getpostman.com/view/6308027/SWE58KR8?version=latest

List of available endpoints:
## Articles
- `POST /articles`
- `GET /articles`
- `GET /articles/:title`
- `DELETE /articles/:id`
- `PUT /articles/:id`

## Authors
- `POST /authors`
- `POST /authors/login`
- `POST /authors/login/oauth/:googleToken`
- `GET /authors`

### Error response format:
```json
{
  "message": "..."
}
```

#### POST /articles
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded`
  - `Authorization`: `token <jwt token>` 
- Request Body:
  - `title: {
                type: String,
                required: true,
                unique: true,
                minlength: 10,
                maxlength: 100
            }`
  - `tags: [{
                 type: String,
                 required: true,
                 minlength: 3,
                 maxlength: 15
             }],`
  - `content: {
                 type: String/ html,
                 required: true,
                 minlength: 100,
                 maxlength: 50000
             }`
  - `featured_image: {
                 file
             }`          
- Response:
  - `status`: `201`
  - `details`:
    ```json
    {
        "message": "...",
        "details": {
            "tags": [
                "...",
                "..."
            ],
            "_id": "...",
            "title": "...",
            "author": "...",
            "content": "...",
            "featured_image": "...",
            "created_at": "...",
            "__v": 0
        }
    }
    ```

#### GET /articles
- Request Header(s):
  - `Authorization`: `token <jwt token>` 
- Response:
  - `status`: `200`
  - `details`:
    ```json
        [{
            "tags": [
                "...",
                "..."
            ],
            "_id": "...",
            "title": "...",
            "author": {
                "_id": "...",
                "name": "..."
            },
            "content": "...",
            "featured_image": "...",
            "created_at": "...",
            "__v": 0
        }]
    ```
    
#### GET /articles/:title
- Request Header(s):
  - `Authorization`: `token <jwt token>` 
- Response:
  - `status`: `200`
  - `details`:
    ```json
        [{
            "tags": [
                "...",
                "..."
            ],
            "_id": "...",
            "title": "...",
            "author": {
                "_id": "...",
                "name": "..."
            },
            "content": "...",
            "featured_image": "...",
            "created_at": "...",
            "__v": 0
        }]
    ```

#### DELETE /articles/:id
- Request Header(s):
  - `Authorization`: `token <jwt token>`  
- Response:
  - `status`: `200`
  - `details`:
    ```json
    {
        "message": "...",
        "details": {
            "tags": [
                "...",
                "..."
            ],
            "_id": "...",
            "title": "...n",
            "author": "...",
            "content": "...",
            "featured_image": "...",
            "created_at": "...",
            "__v": 0
        }
    }
    ```

#### PUT /articles/:id
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded`
  - `Authorization`: `token <jwt token>` 
- Request Body:
  - `title: {
                type: String,
                required: true,
                unique: true,
                minlength: 10,
                maxlength: 100
            }`
  - `tags: [{
                 type: String,
                 required: true,
                 minlength: 3,
                 maxlength: 15
             }],`
  - `content: {
                 type: String/ html,
                 required: true,
                 minlength: 100,
                 maxlength: 50000
             }`
  - `featured_image: {
                 file
             }`          
- Response:
  - `status`: `201`
  - `details`:
    ```json
    {
        "message": "...",
        "details": {
            "n": 1,
            "nModified": 1,
            "opTime": {
                "ts": "...",
                "t": 5
            },
            "electionId": "...",
            "ok": 1,
            "$clusterTime": {
                "clusterTime": "...",
                "signature": {
                    "hash": "...",
                    "keyId": "..."
                }
            },
            "operationTime": "..."
        }
    }
    ```
#### POST /authors
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
- Request Body:
  - `name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 30
            }`
  - `email: [{
                 type: String,
                 required: true,
                 unique: true
             }],`
  - `password: {
                 type: String,
                 required: true,
                 minlength: 8,
             }`      
- Response:
  - `status`: `201`
  - `details`:
    ```json
    {
        "message": "...",
        "token": "..."
    }
    ```
    
#### POST /authors/login
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
- Request Body:
  - `email: [{
                 type: String,
                 required: true,
                 unique: true
             }],`
  - `password: {
                 type: String,
                 required: true,
                 minlength: 8,
             }`      
- Response:
  - `status`: `200`
  - `details`:
    ```json
    {
        "message": "...",
        "token": "..."
    }
    ```
    
#### POST /authors/login/oauth/:googleToken
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
- Request Body:
  - `email: [{
                 type: String,
                 required: true,
                 unique: true
             }],`
  - `password: {
                 type: String,
                 required: true,
                 minlength: 8,
             }`      
- Response:
  - `status`: `200` or `201`
  - `details`:
    ```json
    {
        "message": "...",
        "token": "..."
    }
    ```
    
#### GET /authors
- Request Header(s):
  - `Authorization`: `token <jwt token>`      
- Response:
  - `status`: `200`
  - `details`:
    ```json
    {
        "message": "...",
        "details": {
            "_id": "...",
            "name": "...",
            "email": "...",
            "password": "...",
            "__v": 0
        }
    }
    ```