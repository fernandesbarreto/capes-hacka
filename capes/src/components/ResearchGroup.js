import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../style/ResearchGroup.css";

const ResearchGroup = () => {

    const location = useLocation();
    const { title, description } = location.state || {};

    const persons = [
        { id: 1, name: "Pedro Montes"},
        { id: 2, name: "Caroleta Costa" },
        { id: 3, name: "João Mergulhão" },
        { id: 4, name: "Rodrigo Pereira" },
    ];

    return (
        <div>
            <h1>Workcapes</h1>
            <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid #ccc" }} />

            <div>
                <h1>{title}</h1>
                <h1>{description}</h1>

                <div className="tags-container">
                    {persons.map((person) => (
                        <div key={person.id} className="tag">
                        <p>{person.name}</p>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default ResearchGroup;
