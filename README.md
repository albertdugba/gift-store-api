## GiftStore REST api

This is a REST api that has the CRUD functionalities authentication and product reviews.

**Packages Used**

- mongoose
- jsonwebtoken
- cookie-parser
- nodemailer
- bcryptjs
- slugify

[gifstoreapi](Url)

> ### To run this application successfully:

- `npm install to install dependencies or yarn add`
- `npm run dev to fire your local dev server on localhost:5000`

### API Endpoints ~ Products

```
[localhost:5000/api/v1/products GET all Products

[localhost:5000/api/v1/product/:id GET Get a single product

[localhost:5000/api/v1/product/:id  POST a product

[localhost:5000/api/v1/product/:id  PUT a Product

[localhost:5000/api/v1/product/:id DELETE a product

```

### API Endpoints ~ Authentication

```
localhost:5000/api/v1/auth/register

localhost:5000/api/v1/auth/login

localhost:5000/api/v1/auth/me

localhost:5000/api/v1/auth/updateuserdetails

localhost:5000/api/v1/auth/forgotpassword

localhost:5000/api/v1/auth/resetpassword

localhost:5000/api/v1/auth/forgotpassword
```
