
# Simple Notes REST API

This is a simple REST API for managing notes, built using the Serverless Framework. The API utilizes AWS Lambda functions for handling requests and AWS API Gateway for endpoint management. Authentication for the API is implemented using Lambda authorizers and Amazon Cognito user pools.

## Features

- Create, read, update, and delete notes through RESTful API endpoints.
- Authentication using Lambda authorizers and Amazon Cognito user pools.
- Separate stages of deployment for development and production environments.

## Authentication

Authentication for the API is handled using Lambda authorizers and Amazon Cognito user pools. Some endpoints require authentication using Lambda authorizers, while others require authentication via Amazon Cognito user pools.

### Lambda Authorizers

Lambda authorizers are used for endpoints that require custom authentication logic. These authorizers validate tokens and authorize access based on custom logic implemented in AWS Lambda functions.

### Amazon Cognito User Pools

Amazon Cognito user pools are used for endpoints that require user authentication. These user pools manage user authentication and authorization, providing a secure way to authenticate users for accessing protected resources.

## Deployment

### Development Deployment (CI/CD with AWS CodeBuild)

The development deployment is triggered automatically on the `main` branch using AWS CodeBuild. This stage deploys to a development environment for testing and iteration.

### Production Deployment (CI/CD with GitHub Actions)

The production deployment is triggered manually or automatically on the `github-actions` branch using GitHub Actions. This stage deploys to the production environment for public use.


### Endpoints

The following endpoints are available:

- `GET /notes`: Retrieve a list of notes.
- `POST /notes`: Create a new note.
- `PUT /notes/{id}`: Update an existing note.
- `DELETE /notes/{id}`: Delete a note by ID.



## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

