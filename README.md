<h1 id="title" align="center">Tickitz Back End</h1>


Tickitz is a user-friendly web application that simplifies the process of booking and purchasing movie tickets online. Users can search for movies showing in nearby theatres, select their preferred seats, and make secure payments using various methods. With Tickitz, users can enjoy an effortless and enjoyable movie-watching experience.

<h2>💻 Built with</h2>

Technologies used in the project:

*   [NodeJS](https://nodejs.org/)
*   [ExpressJS](https://expressjs.com/)
*   [PostgreSQL](https://www.postgresql.org/)
*   [JWT](https://github.com/auth0/express-jwt)
*   [Nodemailer](https://nodemailer.com/)

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone this repository</p>

```bash
git clone https://github.com/hore-tim/tickitz-be.git
```

<p>2. Enter folder directory</p>

```bash
cd tickitz-be
```

<p>3. Install with npm</p>

```bash
npm install
```

<p>4. Create .env file</p>

```env
HOST = [YOUR HOST LINK]
LOCAL_HOST = [YOUR LOCAL HOST]
SERVER_PORT = [YOUR SERVER PORT]
JWT_SECRET = [YOUR JWT SECRET]

DB_HOST = [YOUR DATABASE HOST]
DB_NAME = [YOUR DATABASE NAME]
DB_PORT = [YOUR DATABASE PORT]
DB_USER = [YOUR DATABASE USER]
DB_PWD = [YOUR DATABASE PASSWORD]

MAIL_EMAIL = [YOUR EMAIL]
MAIL_PASSWORD = [YOUR EMAIL PASSWORD]

CLOUD_NAME = [YOUR CLOUDINARY NAME]
CLOUD_KEY = [YOUR CLOUDINARY KEY]
CLOUD_SECRET = [YOUR CLOUDINARY SECRET]
```

<p>5. Run in development mode</p>

```bash
npm run dev
```

<h2>🚀 Demo</h2>

You can click it [here!](https://tickitz-be.vercel.app/)

<h2>📫 Postman Documentation</h2>

You can click it [here](https://documenter.getpostman.com/view/26776035/2s93m8xf4j)

<h2>Database Structure</h2>

You can click it [here](https://dbdiagram.io/d/644d3f5edca9fb07c4408259)

## 𓆙 Route

| Endpoint             |    Method    | Info         | Remark                               |
| -------------------- | :----------: | :----------- | :----------------------------------- |
| /auth                |    `POST`    | Auth         | Login                                |
| /auth/logout         |   `PATCH`    | Auth         | LOGOUT                               |
| /auth/register       |    `POST`    | Auth         | Register                             |
| /auth                |   `PATCH`    | User         | Change Password                      |
| /auth/otp            |   `PATCH`    | User         | get otp                              |
| /auth/forgot         |   `PATCH`    | User         | fotgot password                      |
| /transactions/admin  |    `GET`     | Transactions | History transactios all users(admin) |
| /transactions        |    `GET`     | Transactions | History Transaction                  |
| /transactions        |    `POST`    | Transactions | Create Transaction                   |
| /transactions        |   `DELETE`   | Transactions | Delete Transaction                   |
| /transactions        |   `PATCH`    | Transactions | status Transaction done (admin)      |
| /products            | `POST` `GET` | Products     | Create and See Products              |
| /products/promo      |    `POST`    | Products     | Create product with prom             |
| /products/:id        |    `GET`     | Products     | Get detail product                   |
| /products/promo/:id  |    `GET`     | Products     | Get detail product With promo        |
| /products/:productId |   `PATCH`    | Products     | Edit product                         |
| /products/promo/:id  |   `PATCH`    | Products     | Edit product with promo              |
| /products/:id        |   `DELETE`   | Products     | Delete product                       |
| /promo               |    `GET`     | Promo        | Get all Promo                        |
| /promo/:id           |    `GET`     | Promo        | Get Detail promo                     |
| /promo               |    `POST`    | Promo        | Create promo                         |
| /promo/:id           |   `PATCH`    | Promo        | Edit Promo                           |
| /promo/:id           |   `DELETE`   | Promo        | Delete Promo                         |
| /profile             |    `GET`     | Profile      | Get Profile                          |
| /profile             |   `PATCH`    | Profile      | Edit Profile                         |

<h2>👨‍💻 Contributors</h2>

*   [M. Pria Admaja](https://github.com/priaadmaja) - Project manager & full-stack developer
*   [Damar Anggoro](https://github.com/marrdamar) - Full-stack developer
*   [Redha Definto](https://github.com/redhadefinto) - Back-end developer
*   [Yanu Setiawan](https://github.com/yanu-setiawan) - Front-end developer
*   [Akmal Susetio](https://github.com/wyakaga) - Front-end developer

<h2>🛡️ License:</h2>

This project is licensed under the ISC license

<h2>Related Projects</h2>

* [tickitz-fe](https://github.com/hore-tim/tickitz-fe) - front-end
