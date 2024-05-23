'use client'
import React, { useState } from 'react';

const ToxicityPredictionForm = () => {
    const [message, setMessage] = useState('');
    const [prediction, setPrediction] = useState({ isToxic: false, toxicityScore: null });

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const predictToxicity = async () => {
        try {
            const response = await fetch('http://localhost:8000/predict/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            setPrediction(data);
            console.log(data.is_toxic); 
            console.log(data.toxicity_score);
        } catch (error) {
            console.error('Error predicting toxicity:', error);
        }
    };

    return (
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px' }}>
            <h1 style={{ color: '#000000' }}>Toxicity Prediction</h1>
            <label htmlFor="message" style={{ color: '#000000' }}>Enter your message:</label><br />
            <textarea style={{ color: '#000000' }} id="message" name="message" rows="4" cols="50" value={message} onChange={handleInputChange}></textarea><br />
            <button className="bg-red-600 text-white px-6 py-4 rounded-lg text-sm font-semibold flex items-center hover:bg-red-700 transition-colors whitespace-nowrap" onClick={predictToxicity}>Predict Toxicity</button>
            <div>
                {prediction.toxicityScore !== null && (
                    <div>
                        <p style={{ color: '#000000' }}>
                            {prediction.isToxic ?  'The message is not toxic.' : 'The message is toxic.'}
                        </p>
                        <p style={{ color: '#000000' }}>
                            {`The message score is: ${prediction.toxicity_score}.`}
                        </p>

                    </div>
                )}
            </div>
        </div>
    );
};

export default ToxicityPredictionForm;
