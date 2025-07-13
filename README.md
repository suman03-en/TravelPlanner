# TravelPlanner Backend

**TravelPlanner** is a smart and organized trip planning system designed to help users efficiently manage trips, budgets, and related travel documents.
This repository contains the **backend API**, developed with **Node.js**, **Express.js**, and **PostgreSQL**, supporting user management, trip handling, and document management.

---

## Table of Contents

* [Introduction](#introduction)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Database Migration](#database-migration)
* [Running the App](#running-the-app)
* [API Endpoints](#api-endpoints)
* [Expected Outcomes](#expected-outcomes)
* [Authors](#authors)
* [License](#license)

---

## Introduction

In today’s fast-paced world, organizing trips can be complicated due to the lack of time and tools. **TravelPlanner** addresses this problem by providing a centralized system for trip planning, budget management, and document storage. This backend system is built to support an Android application where users can register, create trips, manage budgets, and securely store travel-related documents.

---

## Features

### 1️⃣ User Authentication & Authorization

* **Register**: New user account creation.
* **Login / Logout**: Secure access with JWT tokens.
* **Data Privacy**: Users can only access their own data.

### 2️⃣ Trip Management

* **Create Trip**: Add new trips with details such as trip title, destination, dates, and budget.
* **View Trips**: List all trips for a user.
* **Edit Trip**: Update trip details.
* **Delete Trip**: Remove a trip if no longer needed.

### 3️⃣ Document Management

* **Upload Documents**: Add tickets, insurance, passport scans, etc.
* **View Documents**: Access uploaded documents per trip.
* **Track Document Status**: Mark documents as available or pending.

---

## Tech Stack

| Layer                | Technology                            |
| -------------------- | ------------------------------------- |
| **Frontend**         | React Native (Separate Mobile Client) |
| **Backend**          | Node.js, Express.js                   |
| **Database**         | PostgreSQL                            |
| **ORM**              | No(Raw sql)                           |

---

## Project Structure

```
TravelPlanner-backend/
├── controllers/       # API logic
├── models/            # Sequelize models
├── routes/            # API route definitions
├── migrations/        # DB migration files
├── middlewares/       # Auth and error handlers
├── views/              # EJS templates (optional UI layer)
├── config/             # DB configurations
├── server.js           # Entry point
└── README.md           # Documentation
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/suman03-en/TravelPlanner-backend.git
cd TravelPlanner-backend
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```


## Running the App

Start the server:

```bash
npm start
```

For development with hot reload:

```bash
npm run dev
```

---

## API Endpoints

| Method     | Endpoint             | Description              |
| ---------- | -------------------- | ------------------------ |
| **POST**   | `/users/register`    | Register new user        |
| **POST**   | `/users/login`       | Login user               |
| **GET**    | `/trips`             | Get all trips (by user)  |
| **POST**   | `/trips`             | Create a new trip        |
| **PUT**    | `/trips/:id`         | Update trip              |
| **DELETE** | `/trips/:id`         | Delete trip              |
| **POST**   | `/documents`         | Upload document          |
| **GET**    | `/documents/:tripId` | Get documents for a trip |

---

## Expected Outcomes

* A **backend system** that helps users plan and manage trips.
* **Secure authentication and data management**.
* Practical **academic demonstration of DBMS concepts**.
* **Scalable architecture** for future enhancements.

---

## Authors

* **Prenisha Upreti** (THA079BEI029)
* **Suman Phuyal** (THA079BEI042)

---

## License

This project is licensed under the **MIT License**.

---

## Contact

For any inquiries, please reach out via [GitHub Issues](https://github.com/suman03-en/TravelPlanner-backend/issues).
