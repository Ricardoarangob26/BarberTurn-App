# Setup Instructions for BarberTurn-App

## Frontend Setup
1. **Clone the Repository**  
   `git clone https://github.com/Ricardoarangob26/BarberTurn-App.git`
2. **Navigate to the Frontend Directory**  
   `cd BarberTurn-App/frontend`
3. **Install Dependencies**  
   `npm install`
4. **Environment Variables**  
   Create a `.env` file in the frontend directory and add the following variables:
   - `REACT_APP_API_URL=http://localhost:5000`
5. **Run the Development Server**  
   `npm start`

## Backend Setup
1. **Navigate to the Backend Directory**  
   `cd BarberTurn-App/backend`
2. **Install Dependencies**  
   `npm install`
3. **Environment Variables**  
   Create a `.env` file in the backend directory and add the following variables:
   - `DATABASE_URL=your_database_url`
   - `PORT=5000`
4. **Run the Development Server**  
   `node server.js`

## Additional Notes
- Ensure that you have Node.js and npm installed on your machine.
- For production builds, use `npm run build` in the frontend directory.
- Make sure your database server is running before starting the backend.