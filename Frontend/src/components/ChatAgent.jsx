import React from "react";

const ChatAgent = () => {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/24MwBwG907oJY9Zfq3S5C"
        width="100%"
        height="100%" // Makes iframe fill the screen
        style={{ minHeight: "700px" }}
        frameBorder="0"
        title="Chatbase Chatbot"
      />
    </div>
  );
};

export default ChatAgent;
