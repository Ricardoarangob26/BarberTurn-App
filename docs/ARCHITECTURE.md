# Project Architecture

## Overview
This document outlines the architecture of the BarberTurn-App project, detailing the connections between the backend and frontend, the tech stack used, API endpoints, data flow, and system design.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Heroku

## Backend and Frontend Connection
The frontend connects to the backend via RESTful API calls. All API requests are handled by the Express server in the Node.js backend.

### API Endpoints
- **GET /api/users**: Retrieve user information.
- **POST /api/users**: Create a new user.
- **POST /api/login**: Authenticate a user.
- **GET /api/services**: Fetch available services.
- **POST /api/appointments**: Create a new appointment.

## Data Flow
1. The user interacts with the frontend to make an appointment.
2. The frontend sends a POST request to the backend API to create the appointment.
3. The backend processes the request, interacts with the database if necessary, and sends a response back to the frontend.
4. The frontend updates the UI based on the response received.

## System Design
- The architecture follows a client-server model with the frontend and backend operating independently but communicating through API calls.
- Data management is handled by MongoDB, ensuring efficient storage and retrieval of data.
- Scalability is a key consideration, with plans to optimize both frontend and backend deployments as user load increases.

## Conclusion
This architecture provides a robust framework for the BarberTurn-App, facilitating a smooth interaction between users and the application while ensuring maintainability and scalability.