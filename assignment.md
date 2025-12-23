# Technical Assessment: Campaign Runner Full-Stack Application

## What is This Assessment?

This technical challenge evaluates your ability to build a full-stack application that helps marketing teams manage email campaigns. You'll be implementing:

- A backend REST API that serves lead data and handles email campaigns
- Frontend API integration functions to connect the UI to the backend

**Note:** The frontend UI is already complete and provided for you. Your task is to implement the backend API endpoints and the frontend API functions that connect the UI to your backend.

The assessment tests your skills in:

- Node.js/Express backend development and API handling
- Frontend API integration (fetch requests, error handling)
- Asynchronous JavaScript (Promises/Async/Await)
- File system operations (reading/writing JSON)
- RESTful API design
- Error handling and validation

## Getting the Code

To begin, clone the repository to your local machine:

```
https://github.com/bfalk1/Telescopic-Intern-Assessment.git
```

## How to Start

### Prerequisites

Before you begin, make sure you have:

- Node.js (v16 or higher)
- A modern web browser
- A code editor (VS Code, or your preferred IDE)

### Getting Started

**Navigate to the server directory:**

```bash
cd server
```

**Install dependencies and run the backend:**

```bash
npm install
npm run dev
```

The API will be available at `http://localhost:3001`

**Set up the frontend:**

Open a new terminal window:

```bash
cd client
npm install
npm run dev
```

Then open the local host URL shown in your terminal (usually `http://localhost:5173`) in your browser.

**Test the application:**

- Make sure both backend and frontend are running
- The frontend UI is already complete - you'll see a dashboard with statistics, a "Send Emails" button, and a leads table
- **Currently, the frontend displays mock/sample data** - this allows you to see the UI working immediately
- Once you implement the backend API and frontend API functions, you'll need to update `App.jsx` to use the real API calls instead of the mock data
- You can test the backend endpoints directly using:
  - Browser: Visit `http://localhost:3001/api/leads` to see the leads data
  - Postman/Insomnia: Test the POST endpoint at `http://localhost:3001/api/send-campaign`
  - curl: Use command line tools to test the endpoints

## Project Structure

```
.
├── server/          # Express backend
│   ├── db.json      # Mock database file
│   └── index.js     # Server entry point & API routes
├── client/          # React frontend (with Tailwind CSS)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── api/
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── assessment.md    # Detailed requirements
```

## Requirements Overview

### Part 1: Backend API (Node.js/Express)

You need to implement the following in `server/index.js`:

- **GET Endpoint:** Create a `GET /api/leads` endpoint that:
  - Reads the provided `db.json` file
  - Returns the list of leads as JSON
  - Handles errors appropriately

- **POST Endpoint:** Create a `POST /api/send-campaign` endpoint that:
  - Accepts an array of Lead IDs in the request body (e.g., `{ leadIds: [1, 2, 3] }`)
  - Validates the input (ensure leadIds is an array)
  - Reads the current leads from `db.json`
  - Filters to find leads matching the provided IDs with status "pending"

- **Simulation Logic:**
  - Create a function `sendEmail(email)` that waits 500ms to resolve (simulating network latency)
  - Use `Promise.all` to send emails to all selected leads concurrently
  - Update the status of the selected leads in `db.json` from "pending" to "sent"
  - Write the updated data back to `db.json`

- **Response Format:**
  - GET `/api/leads` should return: `[{ id: 1, email: "...", status: "pending" }, ...]`
  - POST `/api/send-campaign` should return: `{ message: "...", sent: 5, leads: [...] }`

- **CORS:** Ensure CORS is configured to allow requests from the frontend (already set up in the starter code).

- **Error Handling:** Implement proper error handling for:
  - File read/write errors
  - Invalid request data
  - Missing leads

### Part 2: Frontend API Integration

You need to implement the API functions in `client/src/api/api.js`:

- **fetchLeads function:**
  - Define the `API_BASE_URL` constant as `'http://localhost:3001/api'`
  - Make a GET request to `/api/leads`
  - Parse the JSON response
  - Return the leads data (the backend returns an array directly)
  - Handle errors appropriately

- **sendCampaign function:**
  - Make a POST request to `/api/send-campaign`
  - Send an object with `leadIds` array in the request body: `{ leadIds: [1, 2, 3] }`
  - Set proper headers (`Content-Type: application/json`)
  - Parse and return the JSON response
  - Handle errors appropriately

### Part 3: Connect Frontend to API

After implementing the API functions, you need to update `client/src/App.jsx` to use the real API calls:

- **Uncomment the import statement** at the top: `import { fetchLeads, sendCampaign } from './api/api.js';`
- **Update the useEffect hook** to call `fetchLeads()` instead of using mock data
- **Update the handleSendEmails function** to call `sendCampaign()` and use the response to update the leads state

**Note:** The frontend UI (`App.jsx`) is already complete and currently displays mock data so you can see the UI working. The UI includes:
- Statistics dashboard showing total, pending, and sent leads
- "Send Emails" button with loading states
- Leads table with status badges
- Success/error notifications

Once you implement the API functions and update `App.jsx` to use them, the frontend will connect to your backend and display real data.



## Optional Enhancements

While the core requirements above are sufficient to complete the assessment, we encourage you to showcase your creativity and skills by implementing optional features. These additions are **completely optional** but can help demonstrate your ability to think beyond the basic requirements.

### Suggested Ideas

- **Input Validation:** Add comprehensive validation for lead IDs (check if they exist, are numbers, etc.)
- **Error Logging:** Implement proper error logging to console or a log file
- **Batch Processing:** Add the ability to process emails in smaller batches with configurable batch size
- **Rate Limiting:** Implement rate limiting to prevent too many requests
- **Response Metadata:** Include additional metadata in responses (timestamps, processing time, etc.)
- **Helper Functions:** Organize code with well-structured helper functions for database operations

## Need Help?

If you encounter any issues, have questions about the requirements, or need clarification on any part of the assessment, please don't hesitate to reach out:

**Email:** ben@usehireup.com

I'm here to help ensure you have everything you need to complete the assessment successfully.

## How to Submit

When you're ready to submit your solution:

**Ensure your code is complete and working:**

- Backend server runs without errors
- GET `/api/leads` endpoint returns the list of leads correctly
- POST `/api/send-campaign` endpoint accepts lead IDs and updates the database
- The `db.json` file is updated correctly when emails are sent
- Frontend API functions (`fetchLeads` and `sendCampaign`) are implemented correctly in `api.js`
- `App.jsx` has been updated to use the real API calls (not mock data)
- The frontend successfully fetches and displays leads from the backend
- The "Send Emails" button works and updates the UI after sending (using real API calls)
- Error handling works for invalid requests
- You can test the endpoints using Postman, curl, or the provided frontend

**Prepare your submission:**

- Make sure all your code is committed to the repository
- Include a `README.md` with:
  - Any additional setup steps required
  - Answer all the questions listed (REQUIRED)

**Navigate to submission Tab:**

- Connect to your GitHub
- Select the repository
- Only Upload the files which were edited.

Good luck! We're excited to see what you build.
