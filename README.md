# Octopus Learning Platform - Server API

Welcome to the Octopus Learning Platform! This server is built using Node.js, Express, and MongoDB, providing a robust backend for our SQL learning application. The platform is designed to help users learn SQL through interactive tests and quizzes.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User  Registration and Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
- **SQL Learning Modules**: Access to various SQL learning modules with interactive tests.
- **RESTful API**: A well-structured REST API that allows for easy integration and interaction with the frontend application.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and test information.
- **JWT**: JSON Web Tokens for secure user authentication.

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shheeeeshka/octopus-learning-server.git

2. **Navigate to the project directory**:
   ```bash
   cd octopus-learning-platform-server

3. **Install dependencies**:
   ```bash
   npm install

4. **Set up environment variables**:
    ```
    PORT=5070
    ATLAS_URI=mongodb+srv://<username>:<password>@cluster0.dnnr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

    JWT_ACCESS_SECRET_KEY=е)@7iMy2pmzU[=N;,#DT)7=6d~5{WU4KF]P<
    JWT_REFRESH_SECRET_KEY=/–EQ_@+hQooB!w<JFseB[uW6–JiXT9b+_7(

    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=
    SMTP_USER=
    SMTP_PASSWORD=

    API_URL=http://192.168.0.104:5070
    CLIENT_URL=http://192.168.0.104:5173
    ```

5. **Start the server**:
   ```bash
   npm start

## API Endpoints

### Auth Endpoints

- **POST /auth/registration**: Register a new user.
  - Request Body: `{ "name": "<string>", "surname": "<string>", "password": "<string>", "email": "<string>" }`
  - Response: `{ "message": "User registered successfully!" }`

- **POST /auth/login**: Log in an existing user.
  - Request Body: `{ "email": "<string>", "password": "<string>" }`
  - Response: `{ "accessToken": "<token>", "refreshToken": "<token>", "user": "<user>", }`

- **POST /auth/logout**: Log out user.
  - Request Body: `{ "email": "<string>", "password": "<string>" }`
  - Response: `{ "message": "User logged out successfully!" }`

- **GET /auth/refresh**: Refresh your access token using your refresh token stored in cookies.
   - Response: `{ "accessToken": "<token>", "refreshToken": "<token>", "user": "<user>" }`

### User Account Endpoints

- **GET /account/activation/<link>**: Confirm your email.

- **DELETE /account/delete-account/<id>**: Delete your account using your id.
  - Response: `{ "user": "<user>" }`

### SQL Learning Endpoints

- **GET /lessons/all-modules**: Fetch all SQL learning modules.
  - Response: `[ { "id": "<string>", "title": "<string>", "description": "<string>" }, ... ]`

- **POST /tests/create-test**: Create a new SQL test.
  - Request Body: `{ "moduleId": "<string>", "questions": [ { "question": "<string>", "options": ["<option1>", "<option2>"], "correct": "<option>" } ] }`
  - Response: `{ "message": "Test created successfully!" }`

## Authentication

All protected routes require a valid JWT. Upon successful login, the server will return an access token and a refresh token. The access token should be sent in the `Authorization` header as a Bearer token for any protected routes.

Example of an Authorization header:

To refresh the access token, use the refresh token by sending a request to:
- **GET /api/auth/refresh**
  - Request Body: `{ "token": "<refresh_token>" }`
  - Response: `{ "accessToken": "<new_access_token>", "refreshToken": "<new_refresh_token>", "user": "<user>" }`

## Contributing

Contributions are welcome! If you would like to contribute to the Octopus Learning Platform, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write code and tests for your changes.
4. Create a pull request detailing your changes and why you believe they should be merged.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.