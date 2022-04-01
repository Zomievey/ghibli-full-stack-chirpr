import React from 'react'
import { Link } from "react-router-dom";

const ChirpCard = ({ id, username, content, created }) => {
    return (
        <>
            <h3>{username}</h3>
            <p>{content}</p>
            <small>{created}</small>
            <Link to={`/chirp/${id}`}>
               <button className='btn btn-sm btn-dark'>Admin Options</button> 
            </Link>
        </>
    )
}

export default ChirpCard;