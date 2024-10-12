# Assignment Submission App

## Project Overview

This project is an **Assignment Submission App** built using **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **Mongoose**. The app enables **users** to upload their assignments, while **admins** can either **accept** or **reject** them. The application also uses **JWT-based authentication** for secure access by both users and admins, and **Zod** for schema validation.

### Key Features
- **User Registration & Login**: Users and admins can register and log in with secure, hashed passwords.
- **JWT Authentication**: Secure sessions are managed using JWT tokens stored in HTTP-only cookies.
- **Assignment Management**:
  - Users can upload assignments.
  - Admins can view, accept, or reject assignments.
- **Admin Control**: Admins have exclusive rights to manage assignment acceptance or rejection.
- **MongoDB & Mongoose**: The app uses MongoDB for data storage and Mongoose for database modeling.
- **Zod Schema Validation**: Ensures that incoming data follows the required structure, adding an extra layer of security and reliability.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for handling HTTP requests.
- **TypeScript**: Type safety and better development experience.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **MongoDB**: NoSQL database for storing user and assignment data.
- **Mongoose**: ODM for MongoDB, handling schema validation and querying.
- **Zod**: For validating and parsing request bodies and parameters.
- **bcrypt.js**: For hashing and securing user passwords.

## API Endpoints

### **User Endpoints** (`/api/users`)
- `POST /register` - Register a new user.
- `POST /login` - User login.
- `POST /logout` - User logout.
- `POST /upload` - Upload an assignment.
- `GET /admins` - Fetch all admins.

### **Admin Endpoints** (`/api/admin`)
- `POST /register` - Register a new admin.
- `POST /login` - Admin login.
- `POST /logout` - Admin logout.
- `GET /assignments` - View assignments tagged to the admin.
- `POST /assignments/:id/accept` - Accept an assignment.
- `POST /assignments/:id/reject` - Reject an assignment.

## Setup Instructions

### Prerequisites
- **Node.js** (version 14.x or later)
- **MongoDB** (local or cloud instance)
- **pnpm**: Package manager
- **for npm users**: steps below

### Steps to Run Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mohammedarbaz119/AssigmentSubmission
   cd AssignmentSubmission
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Environment variables**: Create a `.env` file in the root directory with the following variables and fill in the appropriate Secrets:
   ```
   MONGO_URL=mongodb://localhost:27017/your-db-name
   SECRET=your_jwt_secret
   ADMIN_SECRET=scretadmin
   ```

4. **Run the app in development mode**:

   ```bash
   pnpm run dev
   ```

5. **Access the app**: The app will be running on `http://localhost:4000`.


### For NPM Users

1.  **Install dependencies**:
```bash
npm install
```

2.  **run tsc**
```bash
tsc
```
3. **Environment variables**: Create a `.env` file in the root directory with the following variables and fill in the appropriate Secrets:
   ```
   MONGO_URL=mongodb://localhost:27017/your-db-name
   SECRET=your_jwt_secret
   ADMIN_SECRET=scretadmin
   ```

4.  **run the Javascript file**
```bash
node dist/index.js
```

4. **Access the app**: The app will be running on `http://localhost:4000`.


### Production Setup

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Build the TypeScript code**:

   ```bash
   tsc
   ```
   
3. **Environment variables**: Create a `.env` file in the root directory with the following variables and fill in the appropriate Secrets:
   ```
   MONGO_URL=mongodb://localhost:27017/your-db-name
   SECRET=your_jwt_secret
   ADMIN_SECRET=scretadmin
   ```

4. **Start the app**:

   ```bash
   pnpm start
   ```

## Authentication

The app uses **JWT tokens** for authentication:
- After logging in, a **JWT token** is generated and stored in a **HTTP-only cookie**.
- This token is required for accessing protected routes (e.g., submitting an assignment or viewing all assignments as an admin).

## Validation with Zod

The project uses **Zod** for schema validation to ensure the correctness of incoming data:
- Zod is used to validate request payloads for user registration, assignment uploads, and admin actions.
- This ensures that only valid data is processed by the server, reducing the risk of errors and vulnerabilities.


