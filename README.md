# Notes App - Frontend

This is the frontend for the Notes App where users can create, read, update, and delete notes.


## Features
- User authentication with JWT (Login, Signup, Refresh Token, Logout)
- CRUD operations for notes
- Protected routes with authentication and role-based access

## API Endpoints

### **Auth Routes**
| Method | Route            | Description                  | Body / Cookies                    |
|--------|-----------------|-----------------------------|----------------------------------|
| POST   | `/auth/signup`  | Signup new user             | `{ username, email, password }`   |
| POST   | `/auth/login`   | Login user                  | `{ email, password }`             |
| GET    | `/auth/refresh` | Refresh access token        | Cookie: `refreshToken`            |
| POST   | `/auth/logout`  | Logout user                 | Cookie: `refreshToken`            |

### **Notes Routes**
| Method | Route                  | Description                        | Auth Required | Body |
|--------|-----------------------|------------------------------------|---------------|------|
| GET    | `/note`               | Get all notes for user              | Yes           | -    |
| GET    | `/note/:id`           | Get note by ID                      | Yes           | -    |
| POST   | `/note`               | Create a new note                   | Yes           | `{ title, body }` |
| PATCH  | `/note/:id`           | Update note by ID                   | Yes           | `{ title?, body? }` |
| DELETE | `/note/:id`           | Delete note by ID                   | Yes           | -    |

## Postman Collection
- Import your Postman collection and set base URL to your backend URL.
- Make sure to enable **`withCredentials`** in frontend requests for cookie-based auth.

## Getting Started

```bash
1. Clone the repo:
git clone <backend-repo-url>
2. Install dependencies:
npm install
```
## Postman :[Link](https://cloudy-station-159893.postman.co/workspace/My-Workspace~4c5469b0-a603-4880-8acc-d620e5499494/collection/undefined?action=share&creator=22654952)
