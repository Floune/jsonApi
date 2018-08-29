# jsonApi
Json api with 
- CRUD
- research by name or last name
- sorting

nodejs version: 8.10.0

mongo version: 4.0.2

Simply clone, `npm install` && `node server.js`

online test : 
https://simplonchallenge.herokuapp.com/

# Routes available
- /api/contacts (POST request with sort params such as `param: mail` and `order: desc`
- /api/view (POST request with search params such as `name: foo` and `lastName: bar`
- /api/edit/id (POST request with id in url param and edited informations such as `tel: 0555555555`
- /api/create/contact (POST request with all required fields for a new contact: name, lastName, tel, mail, fonction
- /api/delete/id (DELETE request with id in url)
