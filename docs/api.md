# Travel Planner Backend API Documentation

---

## Authentication & User Endpoints

### Register
- **POST** `/api/users/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
- **Error Response (validation):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "msg": "Password must be at least 8 characters long.", "param": "password" }
  ]
}
```

---

### Login
- **POST** `/api/users/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```
- **Error Response (invalid credentials):**
```json
{
  "success": false,
  "message": "Email or password is incorrect"
}
```

---

### Get Current User
- **GET** `/api/users/`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:**
```json
{
  "success": true,
  "user": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
- **Error Response (unauthorized):**
```json
{
  "success": false,
  "message": "No token provided"
}
```

---

## Trip Endpoints (All require `Authorization: Bearer <token>`)

### Create Trip
- **POST** `/api/trips/`
- **Body:**
```json
{
  "trip_name": "Paris Vacation",
  "location": "Paris",
  "start_date": "2024-07-01",
  "end_date": "2024-07-10",
  "notes": "Eiffel Tower visit",
  "is_completed": false
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Trip created successfully",
  "trip": {
    "trip_id": 1,
    "trip_name": "Paris Vacation",
    "location": "Paris",
    "start_date": "2024-07-01",
    "end_date": "2024-07-10",
    "notes": "Eiffel Tower visit",
    "is_completed": false
  }
}
```
- **Error Response (validation):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "msg": "Trip name is required.", "param": "trip_name" }
  ]
}
```

---

### Get All Trips
- **GET** `/api/trips/`
- **Success Response:**
```json
{
  "success": true,
  "trips": [
    {
      "trip_id": 1,
      "trip_name": "Paris Vacation",
      "location": "Paris",
      "start_date": "2024-07-01",
      "end_date": "2024-07-10",
      "notes": "Eiffel Tower visit",
      "is_completed": false
    }
  ]
}
```

---

### Get Single Trip
- **GET** `/api/trips/:id`
- **Success Response:**
```json
{
  "success": true,
  "trip": {
    "trip_id": 1,
    "trip_name": "Paris Vacation",
    "location": "Paris",
    "start_date": "2024-07-01",
    "end_date": "2024-07-10",
    "notes": "Eiffel Tower visit",
    "is_completed": false
  }
}
```
- **Error Response (not found):**
```json
{
  "success": false,
  "message": "Unauthorized or trip not found"
}
```

---

### Update Trip
- **PUT** `/api/trips/:id`
- **Body:** (same as create)
- **Success Response:**
```json
{
  "success": true,
  "message": "Trip update successful",
  "trip": { ... }
}
```
- **Error Response (not found):**
```json
{
  "success": false,
  "message": "Failed to update trip"
}
```

---

### Delete Trip
- **DELETE** `/api/trips/:id`
- **Success Response:**
```json
{
  "success": true,
  "message": "Trip deletion successful.",
  "trip": { ... }
}
```
- **Error Response (not found):**
```json
{
  "success": false,
  "message": "Trip not found or already deleted"
}
```

---

## Plan Endpoints (All require `Authorization: Bearer <token>`)

### Add Plan to Trip
- **POST** `/api/trips/:id/plans`
- **Body:**
```json
{
  "category": "Transport",
  "budget_amount": 200.00
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Plan created successfully",
  "plan": {
    "plan_id": 1,
    "trip_id": 1,
    "category": "Transport",
    "budget_amount": 200.00
  }
}
```
- **Error Response (validation):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "msg": "Category is required.", "param": "category" }
  ]
}
```

---

### Get All Plans for a Trip
- **GET** `/api/trips/:id/plans`
- **Success Response:**
```json
{
  "success": true,
  "plans": [
    {
      "plan_id": 1,
      "trip_id": 1,
      "category": "Transport",
      "budget_amount": 200.00
    }
  ]
}
```

---

### Delete Plan
- **DELETE** `/api/plans/:id`
- **Success Response:**
```json
{
  "success": true,
  "message": "Plan deletion successful",
  "plan": { ... }
}
```
- **Error Response (not found):**
```json
{
  "success": false,
  "message": "Unauthorized or plan not found"
}
```

---

## Document Endpoints (All require `Authorization: Bearer <token>`)

### Add Document to Trip
- **POST** `/api/trips/:id/documents`
- **Body:**
```json
{
  "document_type": "Passport",
  "status": "Valid"
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Document added successfully",
  "document": {
    "document_id": 1,
    "trip_id": 1,
    "document_type": "Passport",
    "status": "Valid"
  }
}
```
- **Error Response (validation):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "msg": "Document type is required.", "param": "document_type" }
  ]
}
```

---

### Get All Documents for a Trip
- **GET** `/api/trips/:id/documents`
- **Success Response:**
```json
{
  "success": true,
  "documents": [
    {
      "document_id": 1,
      "trip_id": 1,
      "document_type": "Passport",
      "status": "Valid"
    }
  ]
}
```

---

### Delete Document
- **DELETE** `/api/documents/:id`
- **Success Response:**
```json
{
  "success": true,
  "message": "Document deletion successful",
  "document": { ... }
}
```
- **Error Response (not found):**
```json
{
  "success": false,
  "message": "Document not found"
}
```

---

## General Error Response Example
```json
{
  "success": false,
  "message": "Route not found"
}
``` 