# MultiCreatify - Employee Management System

MultiCreatify monitors employee workload, manages payroll, and maintains activity records.

## Links

[Live Site](https://multi-creatify.web.app)

[Server Repo](https://github.com/najim2004/MultiCreatify-server)

## Features

- User roles and authentication with email/password and Google social login.
- Fully responsive design for mobile, tablet, and desktop.
- Dashboard functionality for logging tasks, viewing payment history, managing employees and payments, and overseeing operations.

## Technologies

React, Tailwind CSS, Material Tailwind, daisyUI, Node.js, Express.js, MongoDB, Firebase (Authentication), TanStack Query (Data Fetching)

## Packages

React Router DOM, Swiper JS, Axios, TanStack Table, React Rating, Lottie React, React Helmet Async, React Hook Form, SweetAlert2, React Hot Toast, React Pagination, React Icons, Recharts, dotenv, CORS, Cookie Parser

## Setup and Installation

### Prerequisites

- Node.js (>= 14.x)
- MongoDB Atlas account or local MongoDB instance
- Firebase project setup for authentication

### Environment Variables

Create a `.env` file in the root directory of both the client and server projects with the following variables:

#### Client-side `.env`

```
VITE_APIKEY=<your-firebase-api-key>
VITE_AUTHDOMAIN=<your-firebase-auth-domain>
VITE_PROJECTID=<your-firebase-project-id>
VITE_STORAGEBUCKET=<your-firebase-storage-bucket>
VITE_MESSAGINGSENDERID=<your-firebase-messaging-sender-id>
VITE_APPID=<your-firebase-app-id>
VITE_IMGBBAPIKRY=<your-imgbb-api-key>
```

#### Server-side `.env`

```
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

### Installation

#### Client

```bash
cd client
npm install
npm start
```

#### Server

```bash
cd server
npm install
npm start
```
