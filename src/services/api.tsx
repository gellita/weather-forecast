import axios, { AxiosRequestConfig } from 'axios';

const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const API_KEY = 'cd84b4bc8bmsh2e50e1d8a926863p19244ejsnc57f6bd5c04a';
const WEATHER_API_KEY = '109ccd2be489454db7cbe1d42142e971';

export const geoApiOptions = (cityName: string): AxiosRequestConfig => {
    return {
        method: 'GET',
        url: GEO_API_URL,
        params: {
            namePrefix: cityName,
            types: 'CITY',
            limit: 10,
            sort: '-population',
        },
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
    } as AxiosRequestConfig;
};

export const fetchCities = async (query: string) => {
    const config = geoApiOptions(query);
    const response = await axios.request(config);
    return response.data.data;
};

export const fetchWeather = async (city: string) => {
    const response = await axios.get(
        `${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    return response.data;
};
