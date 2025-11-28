import React, { useState } from "react";
import './Chatbot.css';
import chatbotIcon from './chatbot.jpg';

const intents = [
  {
    patterns: ["how to register", "register", "signup", "get started", "create account"],
    response: "To register, click on 'Get Started' and select your role as either a Mentor or Mentee. Then, follow the steps to fill in your information and verify your account.",
  },
  {
    patterns: ["how to go to mentor signup", "mentor signup", "mentor register"],
    response: "To sign up as a Mentor, select the 'Get Started' option, choose 'Mentor' as your role, and complete the registration form with your details.",
  },
  {
    patterns: ["can i add resume as proof id", "resume proof id", "upload resume", "college id"],
    response: "Yes, you may upload your resume or college ID as part of your identification during registration. Make sure it is in PDF format.",
  },
  {
    patterns: ["can i register without making it a pdf", "non-pdf resume", "resume format"],
    response: "For ease of processing, please make sure your resume is saved in PDF format before uploading it to the system.",
  },
  {
    patterns: ["how is the test conducted", "test process", "mentor test"],
    response: "Your assigned mentor will conduct the test in a one-on-one session. You’ll receive more details once you’re registered and assigned a mentor.",
  },
  {
    patterns: ["hello", "hi", "hey", "greetings", "good morning", "good evening"],
    response: "Hello! I'm here to help with any questions you have about registration, mentorship, or general assistance. How can I assist you?",
  },
  {
    patterns: ["how to choose my mentor", "mentor selection", "choose mentor", "mentor match"],
    response: "Mentors are assigned based on your area of interest. You can specify your preferences during registration to help us find the best match for you.",
  },
  {
    patterns: ["what can i ask", "help", "assist me", "i need help"],
    response: "You can ask about registration steps, mentor selection, document requirements, or the testing process. Try asking something like, 'How do I register as a Mentee?'",
  }
];

const getResponse = (input) => {
  const message = input.toLowerCase().trim();

  for (const intent of intents) {
    if (intent.patterns.some(pattern => message.includes(pattern))) {
      return intent.response;
    }
  }

  return "I'm here to help, but I couldn't understand your question. Try asking about registration, mentor selection, or required documents!";
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today? You can ask about registration, mentor selection, document requirements, or anything related.", fromBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, fromBot: false };
    setMessages([...messages, userMessage]);

    const botResponse = getResponse(input);

    setTimeout(() => {
      const botMessage = { text: botResponse, fromBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 500);

    setInput("");
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Toggle Icon */}
      <img
        src={chatbotIcon}
        alt="Chatbot Icon"
        className="chatbot-icon"
        onClick={toggleChat}
      />

      {/* Chatbot UI */}
      {isChatOpen && (
        <div className="chatbot-box">
          <h2 className="chatbot-header">Chatbot Assistant</h2>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${
                  msg.fromBot ? "chatbot-message-bot" : "chatbot-message-user"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input-row">
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
    placeholder="Type your question here..."
    className="chatbot-input"
  />
  <button
    type="button"
    aria-label="Send"
    onClick={handleSendMessage}
    className="chatbot-send"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.4 20.6l17.8-8.6c.9-.4.9-1.6 0-2L3.4 1.4C2.6 1 1.8 1.7 2 2.6l1.6 6.8c.1.5.5.8 1 .9l7.8 1.7-7.8 1.7c-.5.1-.9.5-1 .9L2 21.4c-.2.9.6 1.6 1.4 1.2z"/>
    </svg>
  </button>
</div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
