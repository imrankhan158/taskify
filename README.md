# Taskify

Taskify is a web application developed using the MERN stack, which stands for MongoDB, Express.js, React.js, and Node.js. It is designed to manage tasks efficiently. The application uses RabbitMQ for messaging, Redis for caching, and NGINX as a reverse proxy to enhance performance and scalability. Docker Compose is utilized to orchestrate the containers for easy deployment.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- Docker
- Docker Compose

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/imrankhan158/taskify.git
   ```

2. Navigate to the project directory:

   ```bash
   cd taskify
   ```

3. Start the Docker containers using Docker Compose:

   ```bash
   docker-compose up --build
   ```

The Docker Compose file (`docker-compose.yml`) includes configurations for Redis, MongoDB, and NGINX as a reverse proxy, along with the Node.js server and React client.

## Usage

Once the containers are up and running, you can access the Taskify application at http://localhost:80. NGINX will act as a reverse proxy and route requests to the appropriate services.

## Folder Structure

The project has the following structure:

- **taskify-client**: Frontend React application.
- **taskify-server**: Backend Express server.
- **nginx-config**: Nginx Configuration.
- **docker-compose.yml**: Docker compose file for setup project.

## Technologies Used

- MongoDB: Database for storing task data.
- Express.js: Backend framework for the Node.js server.
- React.js: Frontend library for building the user interface.
- Node.js: JavaScript runtime environment for the server.
- RabbitMQ: Messaging system for handling asynchronous tasks.
- Redis: In-memory caching for improved performance.
- NGINX: Reverse proxy server for routing requests.
- Docker Compose: Simplifies the setup of the development environment.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).
