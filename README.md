# 📝 SMARTHABITS - FRONTEND 🎨

Smarthabits is an application with three features all in one place

✨ Track your habits by creating new ones, check when a part of the habit is completed and see how your routines are colored the more you complete it.

✨ Keep track of your todos, you can quickly create new ones, mark as completed and delete todos.

✨ Keep your notes tidy and in order by creating a note with a title and then content. You can quickly and easily change your notes or delete when needed.

Mainly developed for mobile use!

## 💻 Demo

Live at https://mathildap.github.io/SMARTHABITS-FRONTEND/

#### Test user

| email         | password |
| ------------- | -------- |
| test@mail.com | testing  |

### 🙋🏼‍♀️ Rules for developer:

-   🌸 Always use gitmoji in commits. (https://gitmoji.dev/)
-   Name files, maps and variables clearly and according to purpose.
-   Comment all code and functions.
-   Clear folder structure.

### 🛠 Tech Stack

**Client:** React (17.0.2), Sass

**Server:** Node.js, Express, MongoDB Atlas

### 🎁 Npm packages:

-   react-router-dom@6. For routing and navigation.
-   date-and-time. Get and manipulate date.
-   react-icons. Icon library.
-   firebase. For google login.
-   gsap. Svg animation.

### 💽 Run locally

Clone repo and run

```
npm install
npm start
```

and open http://localhost:3000.

### 💡 Good to know

Each page has its own component in /src/Pages/. Components that do not have their own page, can be found in /src/components/

### 🌁 Screenshot

![App Screenshot](https://github.com/Mathildap/SMARTHABITS-FRONTEND/blob/main/src/images/screenshot.png)

## ⚙️ BACK END

---

[Back end repo](https://github.com/Mathildap/SMARTHABITS-BACKEND.git)

Backend are deployed at Heroku.
Build with Node.js, Express and MongoDB Atlas as database.

### Npm packages:

-   crypto-js. To encrypt passwords.
-   dotenv. For .env files.
-   mongoose. For MongoDB.

### Run locally

Clone repo

```
npm install
```

```
npm start
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file in back end.

`DB_CONNECT`

`USER_KEY`

`JWT_KEY`
