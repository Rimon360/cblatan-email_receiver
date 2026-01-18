import React, { useState, useEffect } from "react"
import { Mail, Clock, LogOut, Inbox } from "lucide-react"
import axios from "axios"

// Mock email data (replace with MongoDB fetch)
const mockEmails = []

export default function EmailViewer() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [emails, setEmails] = useState(mockEmails)
  const [selectedEmail, setSelectedEmail] = useState(null)
  const token = localStorage.getItem("token")

  // Function to mark email as read
  const markAsRead = async (emailId, email_body, email_title) => {
    // Update local state
    setEmails((prevEmails) => prevEmails.map((email) => (email._id === emailId ? { ...email, isRead: true } : email)))

    // MongoDB update call would go here:

    try {
      await axios.patch(
        BACKEND_URL + "/api/email/mark-read",
        { emailId, email_body, email_title },
        {
          headers: { Authorization: "Bearer " + token },
        },
      )
    } catch (error) {
      console.error("Error marking email as read:", error)
    }
  }

  const handleEmailClick = (email) => {
    setSelectedEmail(email)
    if (!email.isRead) {
      markAsRead(email._id, email.body, email.title)
    }
  }

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...")
    // Example: clear tokens, redirect to login
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  // Fetch emails from MongoDB on component mount
  useEffect(() => {
    // Replace with actual API call to fetch emails from MongoDB

    const fetchEmails = async () => {
      try {
        const response = await axios.get(BACKEND_URL + "/api/email/get", { headers: { Authorization: "Bearer " + token } })
        const data = response.data
        setEmails(data?.emailList || [])
      } catch (error) {
        console.error("Error fetching emails:", error)
      }
    }
    fetchEmails()
    setInterval(() => {
      fetchEmails()
    }, 10 * 1e3)
  }, [])

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
          <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Logout">
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {emails.length > 0 ? (
            emails.map((email) => (
              <div
                key={email._id}
                onClick={() => handleEmailClick(email)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${selectedEmail?._id === email._id ? "bg-blue-50" : ""} ${
                  !email.isRead ? "bg-blue-25" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className={`text-sm font-medium text-gray-900 ${!email.isRead ? "font-semibold" : ""}`}>{email.title}</h3>
                  {!email.isRead && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                </div>
                <p className="text-xs text-gray-600 mb-2">{email.sender}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{email.time}</span>
                </div>
              </div>
            ))
          ) : (
            <h1 className="p-2 text-gray-300 text-center">Empty List</h1>
          )}
        </div>
      </div>

      {/* Right Panel - Email Content */}
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            {/* Email Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{selectedEmail.title}</h2>
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
            <div className="flex-1 bg-white p-6 shadow-2xl rounded-md">
              <iframe
                title="email"
                sandbox="allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation"
                srcDoc={selectedEmail.body}
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No email selected</h3>
              <p className="text-gray-500">Select an email from the list to view its contents</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
