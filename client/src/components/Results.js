import "./css/Results.css";
import { getResults } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";
import Loading from "./Loading";

function Results() {
    const { id } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchResults() {
            setLoading(true);
            try {
                const data = await getResults();
                setResults(data);
            } catch (error) {
                console.error("Failed to fetch results", error);
            }
            setLoading(false);
        }
        fetchResults();
    }, []);

    const result = results.find(result => result._id === id);

    return (
        <>
            <Header />
            <div className="resultt container">
                {loading ? (
                    <Loading />
                ) : result ? (
                    <div className="result">
                        <h2>Result for ID: {id}</h2>
                        <p>Username: {result.username}</p>
                        <p>Subject: {result.subject}</p>
                        <p>Score: {result.result}</p>
                        <p>Hour: {result.date.hour}:{result.date.minute < 10 ? `0${result.date.minute}` : result.date.minute}</p>
                        <p>Date: {result.date.day}.{result.date.month}.{result.date.year}</p>
                    </div>
                ) : (
                    <p>"No Results!"</p>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Results;
