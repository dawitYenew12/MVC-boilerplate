
# MVC Boilerplate

This repository provides a clean and scalable Model-View-Controller (MVC) boilerplate structure, suitable for web application development. It is designed to help developers quickly set up the foundation of their applications with a modular and organized architecture.


## Features

 

- Separation of Concerns: A well-organized structure that divides the application logic into Models, Views, and Controllers.
- Modular: Easily extend or modify different layers (Models, Views, Controllers) without affecting the rest of the codebase.
- Routing System: Built-in routing mechanism to handle various HTTP requests and map them to the appropriate controllers.
- Environment Configuration: Supports .env files for environment-based configurations.
- Joi Validation: Integrated Joi schema validation for handling and validating user input.
- Error Handling: Pre-configured error handling for better debugging and development.
- Scalability: Easily scalable for growing applications with support for multiple modules.


## Installation

1. Clone the repository

```bash
git clone https://github.com/dawitYenew12/MVC-boilerplate.git
cd MVC-boilerplate
```
2. Install dependencies

```bash
npm i
```
3. Set up your environment variables in the .env file:

4. Run the application

```bash
node index
```
## Usage

- Add your routes in the routes/ directory.
- Create your controllers in the controllers/ folder and link them to the routes.
- Define models in the models/ folder to interact with the database.
- Use the views/ folder for rendering templates or handling API responses.
- Add your Joi validation schemas in the validation/ folder and import them into controllers to validate incoming data.
