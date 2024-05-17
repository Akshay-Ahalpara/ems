import React, { useState } from 'react';

const JourneyDetails: React.FC = () => {
    const [postalCode1, setPostalCode1] = useState('');
    const [postalCode2, setPostalCode2] = useState('');
    const [travelTime, setTravelTime] = useState<string | null>(null);
    const [travelDistance, setTravelDistance] = useState<string | null>(null);
    const [exception, setException] = useState<string | null>(null);

    const handleCalculate = async () => {
        setException(null);
        setTravelTime(null);
        setTravelDistance(null);

        if (!postalCode1 || !postalCode2) {
            setException('You are required to enter both postal codes.');
            return;
        }

        try {
            const API_URL = "https://media.carecontrolsystems.co.uk/Travel/JourneyPlan.aspx";
            const req_Url = `${API_URL}?Route=${postalCode1},${postalCode2}`;
            const response = await fetch(req_Url);
            const textResponse = await response.text();

            if (textResponse.includes(',')) {
                const [time, distance] = textResponse.split(',').map(item => item.trim());
                setTravelTime(time);
                setTravelDistance(distance);
            } else {
                setException('Invalid Postal Code');
            }
        } catch (error) {
            setException('An error occurred while retrieving the data.');
        }
    };

    return (
        <div >
            <h1>Journey Calculator</h1>
            <div>
                <label>
                    Postcode 1:
                    <input
                        type="text"
                        value={postalCode1}
                        onChange={(e) => setPostalCode1(e.target.value)}
                    />
                </label>
                <label>
                    Postcode 2:
                    <input
                        type="text"
                        value={postalCode2}
                        onChange={(e) => setPostalCode2(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleCalculate}>Calculate Journey</button>
            {exception && <div>{exception}</div>}
            {(travelTime && travelDistance) && (
                <div >
                    <h2>Journey Details</h2>
                    <p>Travel Time: {travelTime} minutes</p>
                    <p>Travel Distance: {travelDistance} miles</p>
                </div>
            )}
        </div>
    );
};

export default JourneyDetails;
