'use client'
import React, { useState } from 'react';
import { Button } from "./button";
import { useEffect } from 'react';


const ToxicityPredictionForm = () => {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [prediction, setPrediction] = useState({
        total_toxicity: null,
        most_toxic_message: null,
        why_toxicity: null,
        detoxified_most_toxic: null,
        toxicity_score: null
    });
    useEffect(() => {
        let timer;
        if (isLoading) {
            setLoadingMessage('Obtaining messages...');
            timer = setTimeout(() => {
                setLoadingMessage('Analyzing toxicity...');
            }, 8000);
        }
        return () => clearTimeout(timer);
    }, [isLoading]);

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };
    const getImageSrc = (totalToxicity) => {
        if (totalToxicity > 0.5) {
            return "/3.png";
        } else if (totalToxicity > 0.3) {
            return "/2.png";
        } else if (totalToxicity > 0.25) {
            return "/1.png";
        } else {
            return "/0.png";
        }
    }
    const predictToxicity = async () => {
        setIsLoading(true);  
        try {
            // const response = await fetch('http://localhost:8000/predict/', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ username: username })  
            // });
    
            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
    
            // const data = await response.json();
            // console.log("Response Data:", data); 
            const data = {
                total_toxicity: 0.60,
                most_toxic_message: "States want to correct their votes, which they now know were based on irregularities and fraud, plus corrupt process never received legislative approval.  All Mike Pence has to do is send them back to the States, AND WE WIN. Do it Mike, this is a time for extreme courage!",
                why_toxicity: "The message is 🔴 Highly Toxic due to its inflammatory language and accusations.",
                detoxified_most_toxic: "States have identified issues with their initial vote counts and are working to correct them. It would be beneficial if the Vice President could assist in this process to ensure all votes are accurately counted and legitimate.",
                toxicity_score: 0.85
            };
            setPrediction(data); 
        } catch (error) {
            console.error('Error:', error);
            if(error.name == 'TypeError'){
                setError("Oops! Something happened, our services aren't working right now. Please try again later 😌")
            }
            else{
                setError("Oops! Something happened, please try again later 😌")
            }
        }
        finally{
            setIsLoading(false);  
        }
    };
    
    const onClick = () => {
        console.log("Button clicked!");
    }

    const getToxicity = (totalToxicity) => {
        if (totalToxicity > 0.5) {
            return "🔴 Highly Toxic";
        } else if (totalToxicity > 0.3) {
            return "🟠 Moderately Toxic";
        } else if (totalToxicity > 0.25) {
            return "🟡 Slightly Toxic";
        } else {
            return "🟢 Non Toxic";
        }
    }

    return (
                <div className="col-span-6">
                <div className="flex flex-wrap gap-4 p-10 items-center justify-center border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                    <h2 className="w-full text-xl text-center">
                        Enter a Twitter username, we'll analyze how toxic the content it produces
                    </h2>
                    {isLoading ? (
                        <div className="mt-4 p-4 bg-red-600 text-white rounded-lg flex justify-center items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {loadingMessage}
                        </div>
                    ) : (
                        <>
                            <input
                                type="text"
                                className="w-2/4 p-4 text-lg text-center bg-neutral-300/20 rounded-lg"
                                placeholder="Enter your twitter username"
                                value={username}
                                onChange={handleInputChange}
                            />
                            <div className="bg-red-600 hover:bg-red-700 p-4 rounded-lg text-white" onClick={predictToxicity}>Analyze</div>
                        </>
                    )}
                    {!isLoading && (
                        <>
                            {error && (
                            <div className="mt-4 p-4 bg-red-600 text-white rounded-lg">
                                {error}
                            </div>
                            )}
                            {prediction.total_toxicity !== null && (
                            <div className="flex flex-col items-start p-10 mt-4 border border-neutral-200 gap-4 rounded-lg">
                                <div className="flex flex-row">
                                    <img 
                                        src={getImageSrc(prediction.total_toxicity)} 
                                        alt="Toxicity" 
                                        className="w-2/6 h-full mr-8" 
                                    />              
                                    <div>
                                        <h3 className="text-lg font-semibold mb-0">This twitter account seems to be...</h3>
                                        <div className=""><span className="text-xl">{getToxicity(prediction.total_toxicity)}</span></div>
                                        <p><span className="font-bold">Why?</span><br/> {prediction.why_toxicity}</p>
                                    </div>
                                </div>
                                <p><span className="font-bold">The most toxic tweet is...</span><br/></p>
                                <p>{prediction.most_toxic_message}</p>
                                <p><span className="font-bold">Here you have a detoxified version...</span><br/>  {prediction.detoxified_most_toxic}</p>
                            </div>
                            
                            )}
                        </>
                    )}
                </div>
            </div>        
    );
};

export default ToxicityPredictionForm;
