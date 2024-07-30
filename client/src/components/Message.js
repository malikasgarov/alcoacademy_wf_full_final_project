import "./css/Message.css";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMessages } from "../api";
import { Link, useNavigate } from "react-router-dom";

function Message() {
    let { id } = useParams();
    let [messages, setMessages] = useState([]);
    let [loading, setLoading] = useState(false);
    let tomessages = useNavigate();

    useEffect(() => {
        async function fetchMessages() {
            setLoading(true);
            try {
                const data = await getMessages();
                setMessages(data);
            } catch (error) {
                console.error("Failed to fetch results", error);
            }
            setLoading(false);
        }
        fetchMessages();
    }, []);
    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`http://localhost:3001/delete-message/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const result = await response.json();
                setMessages(result.message);
                tomessages("/messages");
            } else {
                const errorResult = await response.json();
                setMessages(errorResult.message || 'Error deleting message.');
            }
        } catch (error) {
            setMessages('Error deleting message.');
        }
    };
    const message = messages.find(mesage => mesage._id === id);

    return (
        <>
            <Header />
            {loading ? <Loading /> : message?
                <div className="messageDetails container">
                    <div>
                        <h3><b>Message: </b> {message.contactmessage}</h3>
                        <div><b>Username:</b> {message.username}</div>
                        <div><b>Email:</b> {message.email}</div>
                        <button onClick={handleDeleteAccount} className="deletebutton">Done</button>
                    </div>
                </div>
                : <div>There is no Message!</div>
            }
            <Footer />
        </>
    );
}

export default Message;