import React, { useState, useEffect } from 'react';
import { Mail, Clock, LogOut, Inbox } from 'lucide-react';

// Mock email data (replace with MongoDB fetch)
const mockEmails = [
  {
    _id: '1',
    title: 'Welcome to our platform',
    sender: 'admin@example.com',
    time: '10:30 AM',
    body: 'Welcome! We are excited to have you on board. This is your first email in the inbox.',
    isRead: false
  },
  {
    _id: '2',
    title: 'Monthly Newsletter',
    sender: 'newsletter@example.com',
    time: '9:15 AM',
    body: 'Check out our latest updates and features for this month. We have added several new improvements.',
    isRead: false
  },
  {
    _id: '3',
    title: 'Password Reset Request',
    sender: 'security@example.com',
    time: 'Yesterday',
    body: 'We received a request to reset your password. If this was not you, please contact support immediately.',
    isRead: true
  },
  {
    _id: '4',
    title: 'New Feature Announcement',
    sender: 'product@example.com',
    time: 'Yesterday',
    body: 'We are thrilled to announce new features that will enhance your experience. Check them out in your dashboard.',
    isRead: false
  }
];

export default function EmailViewer() {
  const [emails, setEmails] = useState(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Function to mark email as read
  const markAsRead = async (emailId) => {
    // Update local state
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email._id === emailId ? { ...email, isRead: true } : email
      )
    );

    // MongoDB update call would go here:
    /*
    try {
      await fetch('/api/emails/mark-read', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailId })
      });
    } catch (error) {
      console.error('Error marking email as read:', error);
    }
    */
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    if (!email.isRead) {
      markAsRead(email._id);
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    // Example: clear tokens, redirect to login
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Fetch emails from MongoDB on component mount
  useEffect(() => {
    // Replace with actual API call to fetch emails from MongoDB
    /*
    const fetchEmails = async () => {
      try {
        const response = await fetch('/api/emails');
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };
    fetchEmails();
    */
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel - Email List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800">Inbox</h1>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {emails.map((email) => (
            <div
              key={email._id}
              onClick={() => handleEmailClick(email)}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedEmail?._id === email._id ? 'bg-blue-50' : ''
              } ${!email.isRead ? 'bg-blue-25' : ''}`}
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className={`text-sm font-medium text-gray-900 ${!email.isRead ? 'font-semibold' : ''}`}>
                  {email.title}
                </h3>
                {!email.isRead && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
              </div>
              <p className="text-xs text-gray-600 mb-2">{email.sender}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{email.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Email Content */}
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            {/* Email Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {selectedEmail.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{selectedEmail.sender}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedEmail.time}</span>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 bg-white p-6 overflow-y-auto">
              <div className="max-w-3xl">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedEmail.body}
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No email selected
              </h3>
              <p className="text-gray-500">
                Select an email from the list to view its contents
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}