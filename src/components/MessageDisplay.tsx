import React from "react";

interface UserMessage {
  role: string;
  content: string;
}
interface MessageDisplayProps {
  message: UserMessage;
}
export const MessageDisplay = ({ message }: MessageDisplayProps) => {
  return (
    <div className="message-display">
      <p id="icon">X</p>
      <p>{message.role}</p>
      <p>{message.content}</p>
    </div>
  );
};
