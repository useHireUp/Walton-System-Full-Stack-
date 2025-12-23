const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Define the path to db.json file
const DB_PATH = path.join(__dirname, 'db.json');

// Helper function to read the database
const readDatabase = async () => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    throw error;
  }
};

// Helper function to write to the database
const writeDatabase = async (data) => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to database:', error);
    throw error;
  }
};

// GET /api/leads endpoint
app.get('/api/leads', async (req, res) => {
  try {
    const data = await readDatabase();
    res.json(data.leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// POST /api/send-campaign endpoint
app.post('/api/send-campaign', async (req, res) => {
  try {
    const { leadIds } = req.body;
    
    if (!leadIds || !Array.isArray(leadIds)) {
      return res.status(400).json({ error: 'leadIds must be an array' });
    }

    // Read the database
    const data = await readDatabase();
    
    // Filter leads to find the ones matching the provided IDs
    const leadsToSend = data.leads.filter(lead => 
      leadIds.includes(lead.id) && lead.status === 'pending'
    );

    if (leadsToSend.length === 0) {
      return res.json({ 
        message: 'No pending leads found to send',
        sent: 0,
        leads: data.leads
      });
    }

    // Create sendEmail function that waits 500ms
    const sendEmail = (email) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ email, success: true });
        }, 500);
      });
    };

    // Use Promise.all to send emails to all selected leads concurrently
    await Promise.all(leadsToSend.map(lead => sendEmail(lead.email)));

    // Update lead statuses to "sent"
    data.leads = data.leads.map(lead => {
      if (leadIds.includes(lead.id) && lead.status === 'pending') {
        return { ...lead, status: 'sent' };
      }
      return lead;
    });

    // Write updated data back to db.json
    await writeDatabase(data);

    // Return success response
    res.json({ 
      message: `Successfully sent ${leadsToSend.length} email(s)`,
      sent: leadsToSend.length,
      leads: data.leads
    });
  } catch (error) {
    console.error('Error sending campaign:', error);
    res.status(500).json({ error: 'Failed to send campaign' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

