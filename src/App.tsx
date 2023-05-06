import "./App.css";
import { useState } from "react";
import { CodeDisplay } from "./components/CodeDisplay";
import { MessagesDisplay } from "./components/MessagesDisplay";

interface ChatData {
  role: string;
  content: string;
}

function App() {
  const [value, setValue] = useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([]);
  const clearChat = () => {
    setValue("");
    setChat([]);
  };
  const getQuery = async () => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ message: value }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        "http://localhost:8080/completions",
        options
      );
      const data = await response.json();
      console.log("data", data);
      const userMessage = {
        role: "user",
        content: value,
      };
      setChat((oldChat) => [...oldChat, data, userMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUserMessages = chat.filter(
    (message) => message.role === "user"
  );
  const latestCode = chat
    .filter((message) => message.role === "assistant")
    .pop();

  return (
    <div className="app">
      <MessagesDisplay userMessages={filteredUserMessages} />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <CodeDisplay text={latestCode?.content || ""} />
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>
          Get Query!
        </button>
        <button id="clear-chat" onClick={clearChat}>
          Clear Chat
        </button>
      </div>
    </div>
  );
}

export default App;
