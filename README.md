# Mini Wallet Application
MINI WALLET APPLICATION
This project is a simple fintech-style web application built to demonstrate frontend development, mock API integration, business logic, and basic testing.

The application allows a user to manage a wallet by adding money, transferring money with fees and limits, and viewing transaction history.

---

## Features

- Wallet balance display
- Add money to wallet
- Transfer money with validation and confirmation
- Transaction history with filters and pagination
- Soft delete for transactions
- Dark mode toggle
- Mock backend using JSON Server

---

## Tech Stack

- React (Create React App)
- JavaScript
- JSON Server (Mock API)
- Axios
- CSS
- Jest & React Testing Library

---

## Setup Instructions

### Install dependencies
From the project root directory:

# Mini Wallet Application

This project is a simple fintech-style web application built to demonstrate frontend development, mock API integration, business logic, and basic testing.

The application allows a user to manage a wallet by adding money, transferring money with fees and limits, and viewing transaction history.

---

## Features

- Wallet balance display
- Add money to wallet
- Transfer money with validation and confirmation
- Transaction history with filters and pagination
- Soft delete for transactions
- Dark mode toggle
- Mock backend using JSON Server

---

## Tech Stack

- React (Create React App)
- JavaScript
- JSON Server (Mock API)
- Axios
- CSS
- Jest & React Testing Library

---

## Setup Instructions

### Install dependencies
From the project root directory:

```bash
npm install


Start the mock API server

In one terminal window:
json-server --watch db.json --port 3001


The API will be available at:
http://localhost:3001

Start the React application

In a second terminal window:
npm start


The app will run at:
http://localhost:3000

Running Tests

Tests can be started with:
npm test


Basic component tests are included. API calls are mocked during testing.

Project Structure

src/components – UI components

src/api – API abstraction layer

App.js – Main application logic and state management

db.json – Mock API data for JSON Server

Architecture Notes:
State is managed using React hooks.
Business rules such as fees, limits, and balance checks are handled on the client side.
API interactions are separated from UI logic.
Pagination and filtering are implemented on the frontend.

Assumptions:
Single-user wallet (no authentication).
All data is stored using a mock API.
Pagination is handled on the client side.

Limitations:
No real backend or database.
No authentication or user roles.
Limited automated test coverage.
Client-side pagination only.

Screenshots:
Screenshots demonstrating the main flows of the application are available in the /screenshots folder.



```bash
npm install
