import { useState, useEffect } from 'react';
// TODO: Import API functions from './api/api.js'

function App() {
  // TODO: Set up state for leads (array)
  // TODO: Set up state for loading (boolean)
  // TODO: Set up state for sending (boolean)
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // TODO: Implement useEffect to fetch leads on component mount
  // Use the GET /api/leads endpoint
  useEffect(() => {
    // Your code here
  }, []);

  // TODO: Implement handleSendEmails function
  // This should:
  // 1. Set sending state to true
  // 2. Call POST /api/send-campaign with all lead IDs
  // 3. Update the leads state after the campaign completes
  // 4. Set sending state back to false
  const handleSendEmails = async () => {
    // Your code here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 p-5 text-white text-center">
        <h1 className="m-0 text-4xl">Campaign Dashboard</h1>
      </header>
      
      <main className="flex-1 p-10 max-w-6xl mx-auto w-full">
        {/* TODO: Add "Send Emails" button here */}
        {/* The button should:
            - Use Tailwind classes for styling (e.g., bg-blue-500, hover:bg-blue-600, px-4, py-2, rounded, etc.)
            - Show "Sending..." when sending is true
            - Be disabled when sending is true (use disabled:opacity-50, disabled:cursor-not-allowed)
            - Call handleSendEmails when clicked
        */}
        
        {/* TODO: Create a table to display leads */}
        {/* Table should have columns: ID, Email, Status */}
        {/* Use the leads state to render the table rows */}
        {/* Use Tailwind classes for table styling (e.g., w-full, border-collapse, shadow-lg, etc.) */}
        <div className="mt-8">
          <p>Leads table will appear here</p>
        </div>
      </main>
    </div>
  );
}

export default App;

