import React, { useState, useEffect } from 'react';
import "./Chatbot.css";
import { FaRegEdit } from "react-icons/fa";
import logo1 from "./logo1.png";
import Grid from '@mui/material/Grid';
import logo2 from "./logo2.png";
import user from "./user.png";
import bot from "./bot.png";
import { questions } from './Questions';
import { AiFillLike, AiFillDislike } from "react-icons/ai";

export default function Chatbot({ allMessages, setAllMessages }) {
    const [textMessage, setTextMessage] = useState("");
    const [sent, setSent] = useState(false);

    const handleTextChange = (e) => {
        setTextMessage(e.target.value);
    };

    useEffect(() => {
        const storedMessages = localStorage.getItem('chatMessages');
        if (storedMessages) {
            setAllMessages(JSON.parse(storedMessages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(allMessages));
    }, [allMessages]);

    const handleSend = () => {
        const userMessage = textMessage.trim();
        if (userMessage === "") return;

        const question = questions.find(q => q.question.toLowerCase() === userMessage.toLowerCase());

        const newMessage = {
            message: userMessage,
            sender: "user",
            direction: "outgoing"
        };

        let responseMessage;
        if (question) {
            responseMessage = question.response;
        } else {
            responseMessage = "Sorry, I don't understand that question.";
        }

        const botMessage = {
            message: responseMessage,
            sender: "AIChatbot",
            direction: "incoming",
            liked: false,
            disliked: false
        };

        const newMessages = [...allMessages, newMessage, botMessage];
        setAllMessages(newMessages);
        setSent(true);
        setTextMessage("");
    };

    const toggleDislike = (i) => {
        const updatedMessages = allMessages.map((message, index) => {
            if (i === index) {
                return { ...message, disliked: !message.disliked, liked: message.disliked ? message.liked : false };
            }
            return message;
        });
        setAllMessages(updatedMessages);
    };

    const toggleLike = (i) => {
        const updatedMessages = allMessages.map((message, index) => {
            if (i === index) {
                return { ...message, liked: !message.liked, disliked: message.liked ? message.disliked : false };
            }
            return message;
        });
        setAllMessages(updatedMessages);
    };

    return (
        <div className='app-container'>
            <div className='sidebar-container'>
                <div className='newchat'>
                    <img src={logo2} alt="Logo" />
                    <div>New Chat</div>
                    <div><FaRegEdit style={{ marginLeft: "10px" }} /></div>
                </div>
                <button className='past-conversations'>Past conversations</button>
            </div>
            <div className='chat-container'>
                <div className='messages-display'>
                    {sent ?
                        allMessages.map((messageObj, i) => (
                            <div key={i} className='message-container'>
                                <div className='message'>
                                    <img style={{ height: "40px", width: "40px", marginLeft: "15px" }} src={messageObj.sender !== "AIChatbot" ? user : bot} alt="Avatar" />
                                    <div className='message-text'>{messageObj.message}</div>
                                </div>
                                <div className={`message-actions ${messageObj.liked || messageObj.disliked ? 'visible' : ''}`}>
                                    <button onClick={() => toggleLike(i)}>
                                        {messageObj.liked ? <AiFillLike color="blue" /> : <AiFillLike />}
                                    </button>
                                    <button onClick={() => toggleDislike(i)}>
                                        {messageObj.disliked ? <AiFillDislike color="red" /> : <AiFillDislike />}
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div>
                                <div className='welcome-text'>
                                    <h2>How can I help you today?</h2>
                                    <img src={logo1} alt="Welcome" />
                                </div>
                                <div className='message-templates'>
                                    <Grid container spacing={2} className='grid-container'>
                                        <Grid item lg={6}>
                                            <div className='item'>
                                                <h4>Hi, what is my location?</h4>
                                                <p style={{ color: "#00000080" }}>Get immediate AI generated response</p>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <div className='item'>
                                                <h4>Hi, what is the temperature?</h4>
                                                <p style={{ color: "#00000080" }}>Get immediate AI generated response</p>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <div className='item'>
                                                <h4>Hi, how are you?</h4>
                                                <p style={{ color: "#00000080" }}>Get immediate AI generated response</p>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <div className='item'>
                                                <h4>Hi, what is the weather?</h4>
                                                <p style={{ color: "#00000080" }}>Get immediate AI generated response</p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        )}
                </div>
                <div className='chat-textbox-container'>
                    <input
                        className='chat-input'
                        value={textMessage}
                        onChange={handleTextChange}
                    />
                    <button onClick={handleSend}>Ask</button>
                    <button>Save</button>
                </div>
            </div>
        </div>
    );
}
