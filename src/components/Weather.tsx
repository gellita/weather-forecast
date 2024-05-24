import React from 'react';

interface WeatherProps {
    city: string;
    temperature: number;
    description: string;
};

const Weather: React.FC<WeatherProps> = ({ city, temperature, description }) => (
    <div>
        <h2>{city}</h2>
        <p>{temperature}°C</p>
        <p>{description}</p>
    </div>
);

export default Weather;
