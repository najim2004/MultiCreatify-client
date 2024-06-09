# MultiCreatify - Employee Management System

A comprehensive solution to monitor employee workload, manage payroll, and maintain records of employee activities and contracts. The system offers functionalities for employees to log their workflow, HR to manage payments and verify employees, and admins to oversee all activities.

## Admin Credentials

- **Admin Email:** `admin@multicreatify.com`
- **Admin Password:** `Admin@MultiCreatify`

## Live Site

[MultiCreatify](https://multi-creatify.web.app)

## Features

1. **User Roles and Authentication:**

   - Email and Password-based Registration and Login.
   - Social Login with Google.
   - Different user roles: Employee, HR, and Admin.
   - Conditional navigation and access based on roles.

2. **Responsive Design:**

   - Fully responsive for mobile, tablet, and desktop views.
   - Includes a responsive dashboard for easy monitoring.

3. **Employee Dashboard:**

   - **/work-sheet:** Employees can log their daily tasks with hours worked.
   - **/payment-history:** View monthly payment history with pagination.

4. **HR Dashboard:**

   - **/employee-list:** Manage employee details, verify employees, and process payments.
   - **/details/:slug:** View detailed employee information and salary vs. month/year chart.
   - **/progress:** View and filter employees' submitted work records.

5. **Admin Dashboard:**

   - **/all-employee-list:** Manage all verified employees, promote to HR, or fire employees.
   - Toggle between table view and card grid view.
   - Increase salary but not decrease.

6. **Workflow Logging:**

   - Employees can add tasks with hours worked and date.
   - Real-time updates to the work log table.

7. **Salary Management:**

   - HR can pay verified employees.
   - Ensure no duplicate payments for the same month/year.

8. **Security:**

   - JWT token-based authentication and role verification.
   - Secure handling of Firebase and MongoDB credentials via environment variables.

9. **Additional Functionalities:**
   - Banner and slider showcasing company success.
   - Services section detailing company offerings.
   - Testimonials and additional sections for company promotion.
   - Contact Us form for visitor messages.

## Technologies

- **Frontend:** React, Tailwind CSS, Material Tailwind, daisyUi
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase
- **Data Fetching:** TanStack Query (React Query)

## Packages

- **Frontend:** React Router dom, Swiperjs, Axios, TansStack Table and Query, React rating, Lottie react, React Helmet Async, React Hook Form, SweetAlert2, React Hot Toast, React pagination, React icons, Recharts
- **Back End:** dot env, cors, cookie parser

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

## GitHub Repositories

- **Client Side:** [Employee Management Client](https://github.com/yourusername/employee-management-client)
- **Server Side:** [Employee Management Server](https://github.com/yourusername/employee-management-server)

## Usage Instructions

1. **Register or Login:**

   - Access the homepage and register or log in using email/password or Google.
   - Choose role during registration: Employee or HR.

2. **Employee Functionality:**

   - Log tasks via the `/work-sheet` route.
   - View payment history via the `/payment-history` route.

3. **HR Functionality:**

   - Manage employees via the `/employee-list` route.
   - Pay employees, view details, and monitor progress.

4. **Admin Functionality:**
   - Oversee all employee activities via `/all-employee-list`.
   - Promote, fire, and adjust salaries for employees and HRs.
