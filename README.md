# Notes Backend

Notes application backed by Express.js and MongoDB Atlas.

# API Referenece

## Base URL: https://notes-express-backend.vercel.app

## 1. User Signup

Make a POST request at the endpoint `/signup`

### Request Body

All parameters are required

```
{
    "name": "User",
    "email": "user@mail.com",
    "password": "123456"
}
```

### Response Body

```
{
    "message": "Signup successful"
}
```

## 2. User Signin

Make a POST request at the endpoint `/signin`

### Request Body

All parameters are required

```
{
    "email": "user@mail.co",
    "password": "123456"
}
```

### Response Body

```
{
    "_id": "645d714e52b7487455017f5b",
    "name": "User",
    "email": "user@mail.co",
    "bio": null
}
```

## 3. Create Note

Make a POST request at the endpoint `/create-note/:userId`

### Request Body

All parameters are required

```
{
    "title": "Title",
    "description": "Description"
}
```

### Response Body

```
{
    "_id": "645d78c5943b679fbbd9eac9",
    "title": "Title",
    "description": "Description",
    "updatedAt": "2023-05-11T23:22:46.002Z"
}
```

## 4. Read Note

Make a GET request at the endpoint `/note/:userId/:noteId`

### Response Body

```
{
    "_id": "645d78c5943b679fbbd9eac9",
    "title": "Title",
    "description": "Description",
    "updatedAt": "2023-05-11T23:22:46.002Z"
}
```

## 5. Update Note

Make a PUT request at the endpoint `/update-note/:userId/:noteId`

### Request Body

Parameters are optional

```
{
    "title": "Title - Updated",
    "description": "Description - Updated"
}
```

### Response Body

```
{
    "_id": "645d78c5943b679fbbd9eac9",
    "title": "Title - Updated",
    "description": "Description - Updated",
    "updatedAt": "2023-05-11T23:29:02.237Z"
}
```

## 6. Delete Note

Make a DELETE request at the endpoint `/delete-note/:userId/:noteId`

### Response Body

```
{
    "message": "Note deleted"
}
```

## 7. Fetch all notes

Make a POST request at the endpoint `/notes/:userId`

### Response Body

```
[
    {
        "_id": "645d7afb943b679fbbd9ead7",
        "title": "Title",
        "description": "Description",
        "updatedAt": "2023-05-11T23:32:11.213Z"
    },
    {
        "_id": "645d7b07943b679fbbd9eadb",
        "title": "Title2",
        "description": "Description2",
        "updatedAt": "2023-05-11T23:32:23.359Z"
    }
]
```

## 8. Update User name/email/bio

Make a PUT request at the endpoint `/update-details/:userId`

### Request Body

Parameters are optional

```
{
    "name": "User - Updated",
    "email": "user.updated@mail.co",
    "bio": "Bio - Updated"
}
```

### Response Body

```
{
    "name": "User - Updated",
    "email": "user.updated@mail.co",
    "bio": "Bio - Updated"
}
```
