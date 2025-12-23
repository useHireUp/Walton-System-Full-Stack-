// API base URL
const API_BASE_URL = 'http://localhost:3001/api';

// Fetch leads from the API
export const fetchLeads = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/leads`);
    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

// Send campaign to selected leads
export const sendCampaign = async (leadIds) => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-campaign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ leadIds }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send campaign');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending campaign:', error);
    throw error;
  }
};

