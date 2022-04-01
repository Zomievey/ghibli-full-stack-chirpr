import React, { useState, useEffect } from 'react';
import ChirpCard from "../components/ChirpCard.jsx";

const Home = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [chirps, setChirps] = useState([]);

    useEffect(() => {
        fetchChirps();
    }, []);

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleMessageChange = (e) => setMessage(e.target.value);
    const handleChirpSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            name: username
        };

        const newUserRes = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        });

        const newUserFromDB = await newUserRes.json();

        const newChirp = {
            userid: newUserFromDB.insertId,
            content: message,
            location: "Bham"
        };

        const newChirpRes = await fetch("http://localhost:3000/api/chirps", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newChirp)
        }) // POST request

        console.log(await newChirpRes.json());
        fetchChirps()
    };

    const fetchChirps = () => {
        fetch("http://localhost:3000/api/chirps") // GET request
            .then(res => res.json())
            .then(chirps => setChirps(chirps.reverse()))
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className="container text-body text-center">
                <div className="row">
                    <div className="col-12 p-0">
                        <nav>
                            <img
                                className="banner"
                                src="./assets/banner.jpg"
                                alt="logo for awesome site yay"
                            />
                            <h1>Ghibli Chirpr</h1>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <form action="">
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control mb-1"
                                placeholder="Username"
                                aria-label="Username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            <textarea
                                className="form-control mb-2"
                                aria-label="With textarea"
                                placeholder="(500 characters max)"
                                value={message}
                                onChange={handleMessageChange}
                                cols="30"
                                rows="10"
                            ></textarea>
                            <button className="btn btn-dark" onClick={handleChirpSubmit}>
                                Chirp It!
                            </button>
                        </div>
                    </form>
                    <div className=" chirps mb-4">
                        {chirps.map((chirp) => (
                            <ChirpCard
                                key={chirp.id}
                                id={chirp.id}
                                username={chirp.name}
                                content={chirp.content}
                                created={chirp._created}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;