// TODO: Define API_BASE_URL constant
// Should be 'http://localhost:3001/api'

// TODO: Implement fetchLeads function
// This should:
// 1. Make a GET request to /api/leads
// 2. Parse the JSON response
// 3. Return the leads data (likely data.leads or just data depending on your backend response)
export const fetchLeads = async () => {
  // Your code here
};

// TODO: Implement sendCampaign function
// This should:
// 1. Make a POST request to /api/send-campaign
// 2. Send an object with leadIds array in the request body
// 3. Set proper headers (Content-Type: application/json)
// 4. Parse and return the JSON response
export const sendCampaign = async (leadIds) => {
  // Your code here
};

