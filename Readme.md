# EPIC Mail
This is a email project to help people to exchange email 
## Features
* Users can sign up
* Users can login
* Users can create groups
* Users can send a message to indiduals
* Users can view their inbox and read messages
* Users can retract sent messages
* Users can save an email as draft and send it later or delete it

## Prerequisites
* NodeJS

## Setup

* ```git clone https://github.com/nnyves/EPIC-Mail.git```
* ```npm install```
* ```npm start```

## Testing

* ```npm test```

## API Documentation
This document describes the EPIC-Mail API at a technical level. It explains the supported data formats and how to interact with the API. 

### Response
#### Response Code
Code|Description
----|-----------
200 All request done correctly
406 The information was not accepted
500 The server has error when was proccessing the request
404 The request was not found

#### Response format
We will be using the JSON Format
* Success
```
{
    'status': 200,
    'data': []
} 
```
* Error
```
{
    'status': 400,
    'errors': []
}
```
### URL Specification

Method|URL|Data|Response
------|---|----|--------
POST|/api/v1/auth/login|email,password|token
POST|/api/v1/auth/register|email,password,firstName,lastname|token
POST|/api/v1/messages|email,subject,message|message sent object
GET|/api/v1/messages|Nothing|Array of messages
GET|/api/v1/messages/sent|Nothing|Array of messages
GET|/api/v1/messages/unread|Nothing| Array of messages
GET|/api/v1/messages/draft|Nothing|Array of messages
GET|/api/v1/messages/:id|id|Messages of the id
DELETE|/api/v1/messages/:id|id|Nothing

##Authors
- Yves Ndagijimana

