import "./css/Messages.css";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { getMessages } from "../api";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Home from "./index";

function Messages() {
    let [messages, setMessages] = useState('');
    let [loading, setLoading] = useState('');
    let [show, setShow] = useState(true);

    useEffect(() => {
        const isadmin = JSON.parse(localStorage.getItem("admin")) || false;
        if (isadmin) {
            setShow(false);
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
        }
        else {
            setShow(true)
        }
    }, []);
    return (
        show ? 
          <Home /> :
          <>
            <Header />
            <div className="messageHolder container">
              {loading ? <Loading /> : messages && messages.length > 0 ? (
                messages.map(message => (
                  <div key={message._id} className="messageContainer">
                    <Link className="message" to={`${message._id}`}>
                      <h3>{message.contactmessage}</h3>
                    </Link>
                  </div>
                ))
              ) : (
                <div>There is no message!</div>
              )}
            </div>
            <Footer />
          </>
      );
      
}

export default Messages;