const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// TODO: Define the path to db.json file
// Hint: Use path.join(__dirname, 'db.json')

// TODO: Implement helper function to read the database
// This function should read db.json and return the parsed JSON data

// TODO: Implement helper function to write to the database
// This function should write data to db.json

// TODO: Implement GET /api/leads endpoint
// This endpoint should read db.json and return the list of leads
app.get('/api/leads', async (req, res) => {
  // Your code here
  res.json({ message: 'GET /api/leads endpoint - TODO: Implement this' });
});

// TODO: Implement POST /api/send-campaign endpoint
// This endpoint should:
// 1. Accept an array of Lead IDs from req.body
// 2. Create a sendEmail(email) function that waits 500ms to resolve (simulating network latency)
//    Hint: Use setTimeout wrapped in a Promise, or use a delay utility
// 3. Use Promise.all to send all emails concurrently
// 4. Update the status of selected leads from "pending" to "sent" in db.json
// 5. Return a success response
app.post('/api/send-campaign', async (req, res) => {
  // Your code here
  // TODO: Extract leadIds from req.body
  // TODO: Read the database
  // TODO: Filter leads to find the ones matching the provided IDs
  // TODO: Create sendEmail function that waits 500ms
  // TODO: Use Promise.all to send emails to all selected leads
  // TODO: Update lead statuses to "sent"
  // TODO: Write updated data back to db.json
  // TODO: Return success response
  res.json({ message: 'POST /api/send-campaign endpoint - TODO: Implement this' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

