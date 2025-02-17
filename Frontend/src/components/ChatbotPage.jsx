 import { useState } from "react";
 import { FaRegCommentDots } from 'react-icons/fa';
 const ChatbotPage = () => {
    const [isChatOpen, setChatOpen] = useState(false);

    const toggleChat = () => {
      setChatOpen(prevState => !prevState);
    };
  
    return (
      <div>
        {/* Contact Us Icon (using React Icons) */}
        <div onClick={toggleChat} style={iconStyle}>
          <FaRegCommentDots size={30} color="white" />
        </div>
  
        {/* Chatbot iframe - visible only if the state is true */}
        {isChatOpen && (
          <div style={iframeStyle}>
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/24MwBwG907oJY9Zfq3S5C"
              width="350"
              height="500"
              style={iframeInnerStyle}
              frameBorder="0"
              title="Chatbase Chatbot"
            />
          </div>
        )}
      </div>
    );
  };
  
  // Chatbot icon styling
  const iconStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#007bff",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    zIndex: 9999,
  };
  
  const iframeStyle = {
    position: "fixed",
    bottom: "70px", // Positioned above the contact icon
    right: "20px",
    zIndex: 9999,
    transition: "all 0.3s ease",
  };
  
  const iframeInnerStyle = {
    minHeight: "500px",
    maxHeight: "80vh",
    borderRadius: "8px",
    border: "none",
  };

  export default ChatbotPage