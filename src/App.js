import logo from './logo.svg';
import './App.css';
import Chatbot from './Chatbot';
import { useState } from 'react';

function App() {

  const [allMessages, setAllMessages] = useState([
    {
      message: "Hello, I am AI chatbot",
      sender: "AIChatbot"
    }
  ]);

  return (
    <div className="App">
      <Chatbot allMessages={allMessages} setAllMessages={setAllMessages}></Chatbot>
    </div>
  );
}

export default App;
