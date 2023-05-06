import React from "react";
import { MessageDisplay } from "./MessageDisplay";
interface UserMessage {
  role: string;
  content: string;
}
interface MessagesDisplayProps {
  userMessages: UserMessage[];
}
export const MessagesDisplay = ({ userMessages }: MessagesDisplayProps) => {
  return (
    <div className="messages-display">
      {userMessages.map((userMessage, index) => (
        <MessageDisplay key={index} message={userMessage} />
      ))}
    </div>
  );
};
