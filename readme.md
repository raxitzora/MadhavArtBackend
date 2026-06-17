## Gallery Schema
{
  _id,

  title: String,

  category: String, // customize-bikes, graphics, radium-art

  label: String,

  thumbnail: String,

  variants: [String],

  createdAt: Date,

  updatedAt: Date
}

## Folder structure
backend
│
├── src
│   ├── config
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   ├── controllers
│   │   ├── auth.controller.js
│   │   └── gallery.controller.js
│   │
│   ├── middleware
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── rateLimit.middleware.js
│   │
│   ├── models
│   │   ├── Admin.js
│   │   └── Gallery.js
│   │
│   ├── routes
│   │   ├── auth.routes.js
│   │   └── gallery.routes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md

## login flow
POST /api/auth/login
{
  "username": "admin",
  "password": "xxxxx"
}
{
  "token": "jwt"
}


