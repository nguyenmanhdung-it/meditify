import axios from 'axios';
import "./medium.scss";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";

export default function Medium() {
    const [links, setlinks] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);                console.log(loading);


        const res = await axios.get("/crawl?website=" + links)
            .then(res => {
                setContent(res.data);
                setLoading(false);
                console.log(loading);
                const element = document.getElementById("medium");
                if (element) {
                    element.innerHTML = res.data;
                    sessionStorage.setItem('mediumData',  element.innerHTML)
                }
                window.location.replace("/writev2/");
            }
            );
    }
    return (
        <div className="t60">
            <h1>
                Medium ?
            </h1>
            <form action="post"
                onSubmit={handleSubmit}>
                <input type="text" placeholder="Search"
                    onChange={(e) => setlinks(e.target.value)}
                />
                <button type="submit">Search</button>
                {/* {loading ?
                    <div className="BlogStyle CustomEditor"
                        style={{ maxWidth: "600px" }}
                        id="medium"
                    ></div>
                    :
                    <Loading /> 
                } */}
                <div className="BlogStyle CustomEditor"
                        style={{ maxWidth: "600px" }}
                        id="medium"
                    ></div>
                    {loading? <Loading /> : ""}
            </form>
        </div>
    )
}
