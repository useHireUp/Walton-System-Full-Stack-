# Technical Assessment: Campaign Runner Dashboard

## What is This Assessment?

This technical challenge evaluates your ability to build a full-stack application that helps marketing teams manage email campaigns. You'll be building a Campaign Runner Dashboard that:

- Fetches a list of lead data from a backend "database"
- Allows the user to trigger a simulated bulk email campaign
- Updates the status of leads in real-time as the campaign runs

The assessment tests your skills in:

- Node.js/Express backend development and API handling
- React frontend development (State Management & Hooks)
- Asynchronous JavaScript (Promises/Async/Await)
- Tailwind CSS for styling and UI design
- Architecture and code organization

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

Then open the local host URL shown in your terminal (usually `http://localhost:5173` or `3000`) in your browser.

**Test the application:**

- Make sure both backend and frontend are running
- Open the frontend in your browser
- If the "Campaign Dashboard" header appears, then the front end is loaded properly.

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

### Backend Requirements (Node.js/Express)

- **GET Endpoint:** Create a `GET /api/leads` endpoint that reads the provided `db.json` file and returns the list of leads.

- **POST Endpoint:** Create a `POST /api/send-campaign` endpoint that accepts an array of Lead IDs.

- **Simulation Logic:**
  - Create a function `sendEmail(email)` that waits 500ms to resolve (simulating network latency).
  - Use `await` or `Promise.all` to ensure the server waits for the "sending" to finish.
  - Update the status of the selected leads in `db.json` from "pending" to "sent".

- **CORS:** Ensure CORS is configured to allow requests from your React client.

### Frontend Requirements (React)

- **Styling:** Use Tailwind CSS for all styling. The project is already configured with Tailwind CSS.

- **Display Data:** Fetch the leads from the API on load and render them in a clean table (Columns: ID, Email, Status). Style the table using Tailwind CSS utility classes.

- **Action Button:** Add a "Send Emails" button at the top of the dashboard. Style the button using Tailwind CSS classes.

- **Interaction:**
  - When "Send Emails" is clicked, trigger the backend POST endpoint.
  - The button must show a "Sending..." state and be disabled while the request is processing.
  - Use Tailwind classes to handle disabled states (e.g., `disabled:opacity-50`, `disabled:cursor-not-allowed`).

- **Updates:**
  - Once the backend responds, the table must update to show the new "sent" status without requiring a browser page refresh.



## Optional Enhancements

While the core requirements above are sufficient to complete the assessment, we encourage you to showcase your creativity and skills by implementing optional features. These additions are **completely optional** but can help demonstrate your ability to think beyond the basic requirements.

### Suggested Ideas

- **Statistics Dashboard:** Display summary metrics (total leads, pending, sent)
- **Styling Improvements:** Add animations, icons, or custom color schemes

## Need Help?

If you encounter any issues, have questions about the requirements, or need clarification on any part of the assessment, please don't hesitate to reach out:

**Email:** ben@usehireup.com

I'm here to help ensure you have everything you need to complete the assessment successfully.

## How to Submit

When you're ready to submit your solution:

**Ensure your code is complete and working:**

- Backend runs and updates the JSON file correctly
- Frontend successfully communicates with the backend
- Loading states are visible during the email sending process
- The UI updates automatically after the process finishes

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
