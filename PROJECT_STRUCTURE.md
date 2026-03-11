# Project Structure

## Overview  
This document outlines the directory structure of the **BarberTurn-App** project, including the important files and the location of various features in both the backend and frontend.

### Root Directory  
- **README.md**: Provides an overview of the project, installation instructions, and usage.  
- **PROJECT_STRUCTURE.md**: This file you are currently reading.  
- **.gitignore**: Specifies files and directories that should be ignored by Git.

### Frontend  
- **/frontend**: Contains all frontend-related code.  
  - **/src**: Source code for the frontend application.  
    - **/components**: Reusable UI components.  
    - **/pages**: Components representing different pages of the application.  
    - **/styles**: CSS/SCSS files for styling the application.  
    - **App.js**: The main application component.  
    - **index.js**: The entry point for the React application.

### Backend  
- **/backend**: Contains all server-related code and configurations.  
  - **/controllers**: Defines request handling logic and business logic.  
  - **/models**: Database models for the application.  
  - **/routes**: Defines API routes for the application.  
  - **server.js**: The entry point for the backend server.  

### Important Files  
- **/frontend/package.json**: For managing frontend dependencies and scripts.  
- **/backend/package.json**: For managing backend dependencies and scripts.  
- **/.env**: Contains environment variables for both frontend and backend configurations.  

## Conclusion  
This structure promotes organized development and enables easier navigation through the project. Feel free to explore each section for insights into features and functionalities.