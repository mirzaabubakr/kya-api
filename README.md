## Overview

This project is a KYC (Know Your Customer) API that helps in verifying the identity of users. It provides endpoints for uploading documents, verifying identities, and retrieving user information.

## Features

- User registration and authentication
- Document upload and verification
- Identity verification
- Retrieve user information

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mirzaabubakr/kyc-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd kyc-api
   ```
3. Install dependencies:

   ```sh
   npm install

   ```

4. Add .env file as specified in .env.sample:
   ```sh
   npm install
   ```

## Usage

1. Start the server:
   ```sh
   npm run dev
   ```
2. The API will be available at `http://localhost:{PORT}`.

## API Endpoints

- `POST /register` - Register a new user
- `POST /login` - Authenticate a user
- `POST /kyc` - Submit KYC (requires authentication and user role)
- `GET /kyc` - Get KYC information (requires authentication)
- `PATCH /kyc/:id` - Update KYC information (requires authentication and admin role)
- `GET /kyc/generate-presigned-url` - Generate a presigned URL for document upload

## License

This project is licensed under the MIT License.
