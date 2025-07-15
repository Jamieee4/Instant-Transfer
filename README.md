
# Instant Transfer

Instant Transfer is a full-stack application that allows users to transfer money between accounts, view their account balance, and search for other users to initiate transactions. Built with **ReactJS**, **ExpressJS**, **MongoDB**, and **NodeJS**, it provides a secure, user-friendly interface for financial transactions. 

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Features
- **User Registration**: Sign up new users securely with encrypted passwords.
- **User Login**: Authenticate users with JWT tokens.
- **Account Balance**: Check the available balance.
- **Money Transfer**: Transfer money to other users with transaction validation.
- **User Search**: Find other users by name for easy transfers.
- **Protected Routes**: Secure routes with authorization checks.

## Tech Stack
- **Frontend**: ReactJS, Tailwind CSS
- **Backend**: NodeJS, ExpressJS, MongoDB
- **Libraries**: Zod, Axios, Mongoose, JSON Web Token (JWT)
- **Deployment**: Vercel, Render, MongoDB Atlas

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vvssgowtham/InstantTransfer.git
   cd InstantTransfer
   ```

2. **Install dependencies:**
   ```bash
   # Install server dependencies
   cd frontend
   npm install
   cd backend
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root and add:
   ```plaintext
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the application:**
   ```bash
   # Start backend server
   node index.js

   # Start frontend
   cd client
   npm run dev
   ```

The server runs at `http://localhost:5000` and the client at `http://localhost:5173`.

## Usage
1. **Sign Up**: Register a new account on the `/signup` page.
2. **Sign In**: Login with your credentials on the `/signin` page.
3. **View Balance**: Check your account balance on the Dashboard.
4. **Transfer Money**: Use the search bar to find users and transfer money securely.

## API Endpoints

### Authentication
- **POST** `/api/v1/user/signup` - Sign up a new user
- **POST** `/api/v1/user/signin` - Log in a user

### Account Management
- **GET** `/api/v1/account/balance` - Get the balance for the logged-in user
- **POST** `/api/v1/account/transfer` - Transfer money to another account

### User Management
- **GET** `/api/v1/user/bulk?filter=...` - Search for users

## Folder Structure
```plaintext
instant-transfer/
│
├── frontend/                # Frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # App pages (SignUp, SignIn, Dashboard)
│   │   ├── hooks/           # Custom hooks
│   │   └── App.js           # Main App component
|
├── backend/                 # Backend application
│   ├── models/                  # MongoDB models (User, Account)
|   ├── routes/                  # Express routes
|   ├── controllers/             # API logic
|   middleware.js            # Authentication middleware
└── index.js                 # Express server 

```

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

### Steps to Contribute
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.
