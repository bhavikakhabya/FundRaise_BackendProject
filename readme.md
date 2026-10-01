# 💜 FundRaise – Donation & Fundraising System

## 📌 Project Description

FundRaise is a full-stack web application designed to manage fundraising campaigns and donations.

The system allows users to register, log in, view fundraising campaigns, make donations, and view donation history. An admin can create, update, and delete fundraising campaigns through a dedicated admin dashboard.

The application uses React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for database management.

---

## ✨ Key Features

### 👤 User Features

- User registration and login
- JWT-based authentication
- View all fundraising campaigns
- View detailed campaign information
- Make donations to campaigns
- View donation history
- Track campaign progress
- Automatic campaign completion when the target amount is reached
- Prevention of donations exceeding the remaining target amount
- Logout functionality

### 👑 Admin Features

- Admin authentication
- Dedicated admin dashboard
- Create fundraising campaigns
- Update existing campaigns
- Delete fundraising campaigns
- View campaign progress
- View active and completed campaign statistics
- View total amount raised

### 🔐 Security Features

- Password hashing using bcrypt
- JWT authentication
- Protected API routes
- Admin-only authorization middleware
- Environment variables for sensitive configuration
- MongoDB credentials stored securely in `.env`

---

## 🛠 Technologies Used

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- JWT Decode
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- CORS
- dotenv

### Tools

- Visual Studio Code
- MongoDB Atlas
- Postman
- Git
- GitHub

---

# 🖥 Frontend Details

The frontend is developed using React.js and Vite.

It provides the user interface for:

- User registration
- User login
- Campaign listing
- Campaign details
- Donations
- Donation history
- Admin dashboard

Axios is used to communicate with the backend REST APIs.

React Router DOM is used for navigation between different pages.

---

# ⚙️ Backend Details

The backend is developed using Node.js and Express.js.

It provides REST APIs for:

- User registration
- User login
- Authentication
- Campaign management
- Donations
- Donation history

MongoDB is used as the database and Mongoose is used to define schemas and interact with MongoDB.

---

# 📁 Project Structure

```text
Backend_MajorProject/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── admin.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Campaign.js
│   │   └── Donation.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── campaignRoutes.js
│   │   └── donationRoutes.js
│   │
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CampaignList.jsx
│   │   │   ├── CampaignDetails.jsx
│   │   │   └── AdminCampaign.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── screenshots/
│   ├── home.png
│   ├── register.png
│   ├── login.png
│   ├── campaign-details.png
│   ├── donation-history.png
│   └── admin-dashboard.png
│
└── README.md


📦 Required Dependencies

Backend Dependencies
npm install express mongoose dotenv cors bcryptjs jsonwebtoken

Development dependency:
npm install --save-dev nodemon

Backend Packages     Package Purpose

Express.js	         Backend server and REST API

Mongoose	         MongoDB database interaction

dotenv	             Environment variable management

CORS	             Frontend-backend communication

bcryptjs	         Password hashing

jsonwebtoken	     JWT authentication

Nodemon	             Automatic server restart during development


Frontend Dependencies
npm install axios react-router-dom jwt-decode

Frontend Packages      Package Purpose

React	                User interface

Vite	                Frontend development and build tool

Axios	                API requests

React Router           DOM Page navigation

JWT Decode             Reading information from JWT tokens


🚀 Installation Steps

1. Clone the Repository

git clone YOUR_GITHUB_REPOSITORY_URL

Navigate into the project:

cd Backend_MajorProject

2. Install Backend Dependencies

cd backend

npm install

3. Install Frontend Dependencies

Open another terminal:

cd Backend_MajorProject/frontend

npm install

🗄️ MongoDB / Database Configuration

The application uses MongoDB Atlas as the database.

Create a .env file inside the backend folder.

PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

🗃️ Database Models

The application contains three main MongoDB models.

User

Stores:

Name
Email
Password
Role

Roles:

user
admin
Campaign

Stores:

Campaign title
Description
Target amount
Raised amount
Status

Statuses:

active
completed
Donation

Stores:

Donation amount
User reference
Campaign reference
Creation date

Donations are connected to users and campaigns using MongoDB references.

🔌 API Details

The backend runs on:

http://localhost:5001

🔐 Authentication APIs

Register User

POST /api/auth/register

Request body:

{
  "name": "User Name",
  "email": "user@example.com",
  "password": "123456"
}

Login User

POST /api/auth/login

Request body:

{
  "email": "user@example.com",
  "password": "123456"
}

A JWT token is returned after successful login.

📋 Campaign APIs

Get All Campaigns

GET /api/campaigns

Get Single Campaign

GET /api/campaigns/:id

Create Campaign

Admin only

POST /api/campaigns

Authorization:

Bearer <JWT_TOKEN>

Request body:

{
  "title": "Education Support",
  "description": "Help students continue their education.",
  "targetAmount": 10000
}

Update Campaign

Admin only

PUT /api/campaigns/:id

Delete Campaign

Admin only

DELETE /api/campaigns/:id

💰 Donation APIs

Make a Donation

POST /api/campaigns/:id/donate

Authorization:

Bearer <JWT_TOKEN>

Request body:

{
  "amount": 500
}

When a donation is made:

The campaign is checked.

The donation amount is validated.

The remaining campaign amount is calculated.

The donation is stored in MongoDB.

The campaign's raisedAmount is updated.

The campaign status changes to completed when the target is reached.

Get Donation History

GET /api/campaigns/:id/donations

This returns the donation history for a particular campaign.

▶️ How to Run the Backend

Open a terminal:

cd Backend_MajorProject/backend

Run:

npm run dev

The backend will run on:

http://localhost:5001

Expected output:

Server running on http://localhost:5001
MongoDB connected successfully
▶️ How to Run the Frontend

Open another terminal:

cd Backend_MajorProject/frontend

Run:

npm run dev

Vite will provide a local URL, usually:

http://localhost:5173

Open the URL in your browser.

🧪 API Testing

The backend APIs were tested using Postman.

The following functionalities were tested:

User registration

User login

JWT authentication

Admin authorization

Campaign creation

Campaign update

Campaign deletion

Campaign retrieval

Donation creation

Donation history

Over-donation prevention

Automatic campaign completion

Protected routes

⭐ Unique Features Implemented

1. Automatic Campaign Completion

When the raised amount reaches the target amount:

raisedAmount >= targetAmount

the campaign automatically changes from:

active

to:

completed

2. Over-Donation Prevention

Users cannot donate more than the remaining amount required by a campaign.

For example:

Target Amount = ₹1000

Raised Amount = ₹700

Remaining Amount = ₹300

A donation greater than ₹300 will be rejected.

3. Role-Based Admin Access

The system supports two roles:

user
admin

Only administrators can:

Create campaigns

Update campaigns

Delete campaigns

4. Donation History

Every donation is connected to:

User
Campaign
Donation amount
Donation date

This allows campaign-specific donation history to be displayed.

5. Campaign Progress Tracking

The application calculates the percentage of the fundraising target that has been completed.

Example:

₹750 raised / ₹1000 target = 75% funded

The progress is displayed visually using a progress bar.

6. Responsive User Interface

The application provides a responsive and user-friendly interface for:

Campaign browsing

Campaign details

User authentication

Donations

Donation history

Admin management


👩‍💻 Author

Bhavika Khabya

B.Tech Student – ITM Skills University

GitHub

https://github.com/bhavikakhabya

LinkedIn

https://www.linkedin.com/in/bhavika-khabya-9b678a37/

📄 License

This project was developed for academic and educational purposes.