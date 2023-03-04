## node project for auth user

backend: nodejs
db: mongodb

#list of item is this project

-> user register api
-> user login api
-> without auth(token) api
-> with auth api

## What's in this project?

-> Correct error handling throughout all authentication APIs.
-> Validation terms used correctly.
-> Verify that all user data formats can be checked.
-> Follow the proper folder structure.
-> Well defined coding standards.

## how to start or use this project

npm i
npm start

## how to call APIs

--------------user register----------------
method: post
url: "http://localhost:8000/api/register"
body: {
"email": "test23@gmail.com",
"password": "test23@gmail.com",
"first_name": "test",
"last_name": "test"
}

--------------user login----------------
method: post
url: "http://localhost:8000/api/login"
body: {
"email": "test23@gmail.com",
"password": "test23@gmail.com"
}

--------------without auth----------------
method: get
url: "http://localhost:8000/"

--------------with auth----------------
method: get
url: "http://localhost:8000/api/user/{id}"
header:{
"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzc4NDI2ODEsImV4cCI6MTY3Nzg0MjcxMSwiYXVkIjoiNjQwMWJiZTdjYWYwZDJlY2UwZGUxZmFmIiwiaXNzIjoidGVzdCJ9.N6NOTO4-GI2rigRSuICsq_N6rHv0jrfKnG9TcG5V9bM"
}
