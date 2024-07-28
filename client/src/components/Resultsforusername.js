import "./css/Resultsforusername.css";
import { getResults } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";
import Loading from "./Loading";

function Resultsforusername() {
    const { namee } = useParams();
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

    const result = results.filter(result => result.username === namee);

    return (
        <>
            <Header />
            <div className="resultt container">
                {loading ? (
                    <Loading />
                ) : result.length > 0 ? (<>
                    <h3 style={{textAlign:"center"}}>{namee}</h3>
                    {result.map((res, index) => (<>
                        <div key={index} className="result">
                            <p>Subject: {res.subject}</p>
                            <p>Score: {res.result}</p>
                            <p>Hour: {res.date.hour}:{res.date.minute}</p>
                            <p>Date: {res.date.day}.{res.date.month}.{res.date.year}</p>
                        </div>
                        <hr></hr>
                    </>))}</>
                ) : (
                    <p style={{textAlign:"center"}}>No Results for {namee}!</p>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Resultsforusername;
