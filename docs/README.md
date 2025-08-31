# 🚀 Project Name

## 🌟 Overview

A full-stack application featuring a Go backend API, React frontend, and PostgreSQL database. Supports database migrations, automated testing, and Dockerized deployment for seamless setup.

---

## 🧭 Repository Files Navigation

- `README.md` — Project documentation
- `Apache-2.0` — License file
- `migrations/` — Database migration scripts
- `docs/` — Additional documentation

---

## 📚 Table of Contents

1. [Project Structure](#project-structure)
2. [Setup](#setup)
3. [Environment Variables](#environment-variables)
4. [Database Migration](#database-migration)
5. [Running the Project](#running-the-project)
6. [Testing](#testing)
7. [Docker](#docker)
8. [API Specification](#api-specification)
9. [Docs](#docs)
10. [Resources](#resources)
11. [About](#about)

---

## 🗂️ Project Structure

```
project-root/
├─ server/
│  ├─ controller/
│  ├─ model/
│  ├─ service/
│  └─ main.go
├─ client/
│  ├─ src/
│  ├─ package.json
│  └─ pnpm-lock.yaml
├─ migrations/
├─ docs/
└─ docker-compose.yml
```

---

## ⚡ Setup

```sh
git clone <repository-url>
cd <project-folder>
cd server
go mod tidy
cd ../client
pnpm install
```

---

## 🔑 Environment Variables

**Backend (`server/.env`):**

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db
```

**Frontend (`client/.env`):**

```env
REACT_APP_API_URL=http://localhost:8080
```

---

## 🗄️ How to Migrate

Create a migration:

```sh
migrate create -ext sql -dir migrations -seq create_users_table
```

---

## ▶️ Running the Project

```sh
cd server
go run main.go
cd ../client
pnpm start
```

---

## 🧪 Testing

```sh
go test -v ./controller
pnpm jest --watchAll
```

---

## 🐳 Docker

**`docker-compose.yml`**

```yaml
version: "3.8"
services:
    api:
        build: ./server
        ports:
            - "8080:8080"
        env_file:
            - ./server/.env
        depends_on:
            - db
    db:
        image: postgres:15
        ports:
            - "5432:5432"
        environment:
            POSTGRES_USER: user
            POSTGRES_PASSWORD: password
            POSTGRES_DB: mydb
        volumes:
            - db_data:/var/lib/postgresql/data
    frontend:
        build: ./client
        ports:
            - "3000:3000"
        env_file:
            - ./client/.env
        depends_on:
            - api
volumes:
    db_data:
```

Start the stack:

```sh
docker-compose up --build
```

---

## 📦 API Specification

### 🔐 Authentication

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/refresh`

### 👤 Users

- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

#### Example Request

```http
POST /auth/login
Content-Type: application/json

{
        "username": "MANAGER1",
        "password": "securepassword"
}
```

#### Example Response

```json
{
        "message": "Login successful.",
        "data": {
                "id": "13ab4545-1ad8-4e35-8cc8-3667a4b9d7f8",
                "username": "MANAGER1"
        }
}
```

---

## 📄 Docs

```
/docs
├─ README.md
├─ Design-decision.md
```

---

## 📚 Resources

- [Go Documentation](https://golang.org/doc/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Migrate Tool](https://github.com/golang-migrate/migrate)

---

## ℹ️ About

Full Stack Engineer Test related to Pickup Queue.

