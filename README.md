# Student Management System

A front-end application for managing student records with authentication features.

## Features

- User login and registration
- Email verification
- View student records in a paginated table
- Search students by name
- Add, edit, and delete student records
- Responsive design with Bootstrap

## Project Structure

```
├── index.html           # Main dashboard
├── index.js             # Dashboard functionality
├── login.html           # Login page
├── regiter.html         # Registration page
├── verify.html          # Email verification page
└── js/
    ├── login.js         # Login logic
    ├── register.js      # Registration logic
    └── verify.js        # Verification logic
```

## Setup

1. Ensure the backend API is running at `http://localhost:3000/api/students`
2. Open `login.html` in a browser to get started
3. Create an account or log in with existing credentials

## Requirements

- Modern web browser
- Backend API server running locally
- Bootstrap 5.3.5 (CDN)
