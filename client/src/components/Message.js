import "./css/Message.css";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMessages } from "../api";
import { Link } from "react-router-dom";

function Message() {
    let { id } = useParams();
    let [messages, setMessages] = useState([]);
    let [loading, setLoading] = useState(false);

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
                    </div>
                </div>
                : <div>There is no Message!</div>
            }
            <Footer />
        </>
    );
}

export default Message;