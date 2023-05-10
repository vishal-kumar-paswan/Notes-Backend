# Notes Backend

[FOLLOWING APIS WONT WORK NOW SINCE IT IS GOING THROUGH DEVELOPMENT STAGE FOR VERSION 2 :)]

Notes application backed by Express.js and MongoDB Atlas.

# API Referenece

## 1. Fetch all notes

Send a GET request at the following URL : https://notes-express-backend.vercel.app/fetch-notes

## Response Body

```
[
    {
        "_id": "64391582b16326abbaeaf862",
        "title": "title 1",
        "description": "description 1"
    },
    {
        "_id": "6439158ab16326abbaeaf864",
        "title": "title  2",
        "description": "description 2"
    },
]
```

## 2. Create note

Send a POST request at the following URL : https://notes-express-backend.vercel.app/create-note

## Required parameters

### title: String

### description: String

## Request Body

```
{
    "title": "title 1",
    "description": "description 1"
}
```

## Response Body

```
{
    "message": "Note added"
}
```

## 3. Read note

Send a GET request at the following URL : https://notes-express-backend.vercel.app/read-note/:noteId

## Response Body

```
{
  "title": "title 1",
  "description": "description 1"
}
```

## 4. Update note

Send a PUT request at the following URL : https://notes-express-backend.vercel.app/update-note/:noteId

## Required parameters

### title: String

### description: String

## Request Body

```
{
    "title": "title 1",
    "description": "description 1"
}
```

## Response Body

```
{
  "message": "Note updated"
}
```

## 5. Delete note

Send a DELETE request at the following URL : https://notes-express-backend.vercel.app/delete-note/:noteId

## Response Body

```
{
    "message": "Note deleted"
}
```
