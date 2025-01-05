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
   git clone https://github.com/yourusername/octopus-learning-platform-server.git

2. **Navigate to the project directory**:
   ```bash
   cd octopus-learning-platform-server

3. **Install dependencies**:
   ```bash
   npm install

4. **Set up environment variables**:
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

5. **Start the server**:
   ```bash
   npm start

## API Endpoints

## Authentication

## Contributing

## License