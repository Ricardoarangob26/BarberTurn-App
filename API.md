# API Documentation for BarberTurn-App

## User Endpoints

### 1. **Create User**  
**POST** `/api/users`  
- **Description:** Creates a new user account.  
- **Request Body:**  
  ```json
  {
      "name": "string",
      "email": "string",
      "password": "string"
  }
  ```  
- **Responses:**  
  - `201 Created`: User successfully created.  
  - `400 Bad Request`: Invalid input.

### 2. **Get User**  
**GET** `/api/users/{id}`  
- **Description:** Retrieves user data by ID.  
- **Responses:**  
  - `200 OK`: User data returned.  
  - `404 Not Found`: User not found.

## Barber Endpoints

### 1. **Create Barber**  
**POST** `/api/barbers`  
- **Description:** Adds a new barber to the system.  
- **Request Body:**  
  ```json
  {
      "name": "string",
      "specialty": "string"
  }
  ```  
- **Responses:**  
  - `201 Created`: Barber successfully created.
  - `400 Bad Request`: Invalid input.

### 2. **Get Barber**  
**GET** `/api/barbers/{id}`  
- **Description:** Retrieves barber data by ID.  
- **Responses:**  
  - `200 OK`: Barber data returned.
  - `404 Not Found`: Barber not found.

## Appointment Endpoints

### 1. **Create Appointment**  
**POST** `/api/appointments`  
- **Description:** Schedules a new appointment.  
- **Request Body:**  
  ```json
  {
      "userId": "string",
      "barberId": "string",
      "serviceId": "string",
      "date": "string"
  }
  ```  
- **Responses:**  
  - `201 Created`: Appointment successfully created.
  - `400 Bad Request`: Invalid input.

### 2. **Get Appointment**  
**GET** `/api/appointments/{id}`  
- **Description:** Retrieves appointment details by ID.  
- **Responses:**  
  - `200 OK`: Appointment data returned.
  - `404 Not Found`: Appointment not found.

## Service Endpoints

### 1. **Create Service**  
**POST** `/api/services`  
- **Description:** Adds a new service offered by barbers.  
- **Request Body:**  
  ```json
  {
      "name": "string",
      "duration": "number",
      "price": "number"
  }
  ```  
- **Responses:**  
  - `201 Created`: Service successfully created.
  - `400 Bad Request`: Invalid input.

### 2. **Get Service**  
**GET** `/api/services/{id}`  
- **Description:** Retrieves service details by ID.  
- **Responses:**  
  - `200 OK`: Service data returned.
  - `404 Not Found`: Service not found.

## Error Handling

- **Common Error Responses:**  
  - `400 Bad Request`: The server could not understand the request due to invalid syntax.  
  - `404 Not Found`: The requested resource could not be found.  
  - `500 Internal Server Error`: The server has encountered a situation it doesn't know how to handle.