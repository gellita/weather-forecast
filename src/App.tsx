import React, { useState } from 'react';
import './App.css';

import Input from "./components/Input";
import Button from "./components/Button";
import Weather from "./components/Weather";
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import debounce from 'lodash.debounce';
import { fetchCities, fetchWeather } from "./services/api";

const queryClient = new QueryClient();

const App: React.FC = () => {
    const [city, setCity] = useState('');
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const { data: cities } = useQuery(['cities', city], () => fetchCities(city), {
        enabled: city.length > 2,
    });

    const { data: weather, isLoading, error } = useQuery(
        ['weather', selectedCity],
        () => fetchWeather(selectedCity!),
        { enabled: !!selectedCity },
    );

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
        fetchCityDebounced(e.target.value);
    };

    const fetchCityDebounced = debounce((city: string) => {
        console.log("Fetching cities for:", city);
    }, 300);

    const handleSearchClick = () => {
        setSelectedCity(city);
    };

    return (
        <div className="container">
            <h1>Weather forecast</h1>
            <div>
                <Input value={city} onChange={handleCityChange} placeholder="Enter city" />
                <Button onClick={handleSearchClick}>Search</Button>
                {cities && (
                    <ul>
                        {cities.map((city: unknown) => (
                            <li key={city.id}>{city.name}</li>
                        ))}
                    </ul>
                )}
                {isLoading && <p>Loading...</p>}
                {error && <p>Error loading weather data</p>}
                {weather && (
                    <Weather
                        city={weather.name}
                        temperature={weather.main.temp}
                        description={weather.weather[0].description}
                    />
                )}
            </div>
        </div>
    );
};

const AppWrapper: React.FC = () => (
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);

export default AppWrapper;
