'use client'
import React, { useState } from 'react';
import { Button } from "./button";

const ToxicityPredictionForm = () => {
    const [username, setUsername] = useState('');
    const [prediction, setPrediction] = useState({ total_toxicity : null, most_toxic_message: null, why_toxicity: null, detoxified_most_toxic: null});
    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };

    const predictToxicity = async () => {
        try {
            const response = await fetch('http://localhost:8000/predict/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username }) 
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log(data);
            setPrediction(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="col-span-6">
            <div className="flex flex-wrap gap-4 items-center content-start relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden justify-center">
                <h2 className="w-full text-xl text-center">Enter a twitter username, we'll analyze how toxic is the content it produces</h2>
                <input type="text" className="w-2/4 p-4 text-lg text-center bg-neutral-300/20 rounded-lg" placeholder="Enter your twitter username" value={username} onChange={handleInputChange} />
                <div className="col-span-6">
                    <Button className="bg-red-600 hover:bg-red-700" onClick={predictToxicity}>Analyze</Button>
                </div>
                <div>
                    {prediction.total_toxicity !== null && (
                        <div>
                            <p style={{ color: '#000000' }}>
                                <p>{prediction.total_toxicity}</p>
                                <p>{prediction.most_toxic_message}</p>
                                <p>{prediction.why_toxicity}</p>
                                <p>{prediction.detoxified_most_toxic}</p>
                            </p>
                            <p style={{ color: '#000000' }}>
                                {`The message score is: ${prediction.toxicity_score}.`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ToxicityPredictionForm;
