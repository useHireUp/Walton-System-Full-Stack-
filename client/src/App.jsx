import { useState, useEffect } from 'react';
import { fetchLeads, sendCampaign } from './api/api.js';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch leads on component mount
  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchLeads();
        setLeads(data);
      } catch (err) {
        setError('Failed to load leads. Please try again.');
        console.error('Error fetching leads:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  // Handle sending emails
  const handleSendEmails = async () => {
    try {
      setSending(true);
      setError(null);
      setSuccessMessage(null);

      // Get all pending lead IDs
      const pendingLeadIds = leads
        .filter(lead => lead.status === 'pending')
        .map(lead => lead.id);

      if (pendingLeadIds.length === 0) {
        setSuccessMessage('No pending leads to send emails to.');
        setSending(false);
        return;
      }

      // Send campaign
      const response = await sendCampaign(pendingLeadIds);

      // Update leads with the response from server
      if (response.leads) {
        setLeads(response.leads);
      }

      setSuccessMessage(`Successfully sent ${response.sent || pendingLeadIds.length} email(s)!`);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (err) {
      setError('Failed to send emails. Please try again.');
      console.error('Error sending campaign:', err);
    } finally {
      setSending(false);
    }
  };

  // Calculate statistics
  const totalLeads = leads.length;
  const pendingLeads = leads.filter(lead => lead.status === 'pending').length;
  const sentLeads = leads.filter(lead => lead.status === 'sent').length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white shadow-lg">
        <h1 className="m-0 text-4xl font-bold text-center">Campaign Dashboard</h1>
      </header>
      
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="text-gray-600 text-sm font-medium">Total Leads</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{totalLeads}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="text-gray-600 text-sm font-medium">Pending</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{pendingLeads}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="text-gray-600 text-sm font-medium">Sent</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{sentLeads}</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={handleSendEmails}
            disabled={sending || pendingLeads === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 flex items-center gap-2"
          >
            {sending ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Emails
              </>
            )}
          </button>
          {pendingLeads === 0 && !sending && (
            <p className="text-gray-500 text-sm">All leads have been sent</p>
          )}
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMessage}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-4 text-gray-600">Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No leads found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          lead.status === 'sent' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {lead.status === 'sent' ? (
                            <>
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Sent
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              Pending
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
