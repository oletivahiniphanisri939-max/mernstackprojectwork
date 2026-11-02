# Student Management and Attendance Management System

## Project Overview
The Student Management and Attendance Management System is a web-based application designed to simplify student information management and attendance tracking.

It provides separate functionalities for students and administrators, making it easier to manage student records, attendance, notices, and communication.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JSON Web Token (JWT), bcryptjs

## Main Features
- Student registration and login
- Admin login and dashboard
- Student information management
- Attendance marking and editing
- Attendance viewing
- Notice management
- Student profile management
- Contact and messaging functionality

## Project Architecture

The project follows a basic client-server architecture.

1. Frontend – Provides the user interface.
2. Backend – Handles requests using Node.js and Express.js.
3. Routes – Direct requests to the appropriate controllers.
4. Controllers – Handle application logic.
5. Models – Define database structures using Mongoose.
6. MongoDB – Stores student, attendance, notice, and other application data.

## Data Flow

1. The user interacts with the frontend.
2. The frontend sends requests to the Express backend.
3. Express routes forward requests to the appropriate controllers.
4. Controllers process the requests and interact with MongoDB through Mongoose models.
5. The backend sends the response back to the frontend.
6. The frontend displays the updated information.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/oletivahiniphanisri939-max/mernstackprojectwork.git
   ```

2. Navigate to the project folder:

   ```bash
   cd mernstackprojectwork
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Make sure MongoDB is running locally.

5. Start the application:

   ```bash
   npm run dev
   ```

6. Open the application in your browser using the configured local server address.

## Technical Trade-off

I used a simple Express.js backend with MongoDB and Mongoose because it provides a flexible way to manage student-related data and makes development easier.

## Future Enhancements
- Improved input validation
- Better error handling
- Enhanced security
- Responsive user interface
- Attendance reports and analytics

## GitHub Repository

https://github.com/oletivahiniphanisri939-max/mernstackprojectwork

## Author
Vahini
