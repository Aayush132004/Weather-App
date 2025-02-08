import React, { useEffect, useState } from 'react';
import Inputs from './components/Inputs';
import getFormattedWeatherData from './services/WeatherService';
import TopButtons from './components/TopButtons';
import TimeandLocation from './components/TimeandLocation';
import TempAndDetails from './components/TempAndDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import winterVideo from './assets/winter.mp4';
import summerVideo from './assets/summer.mp4';
import hotImage from './assets/images/hot.jpg';
import coldImage from './assets/images/cold.jpg';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [query, setQuery] = useState({ q: 'Bhopal' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const cityName = query.q ? query.q : 'current location';
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);
    await getFormattedWeatherData({ ...query, units })
      .then((data) => {
        toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
        setWeather(data);
      })
      .catch((error) => {
        toast.error('Error fetching weather data');
        console.error(error);
      });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackgroundVideo = () => {
    if (!weather) return winterVideo; 
    const threshold = units === 'metric' ? 20 : 68;
    return weather.temp <= threshold ? winterVideo : summerVideo;
  };

  const formatInnerImage = () => {
    if (!weather) return coldImage; 
    const threshold = units === 'metric' ? 20 : 68;
    return weather.temp <= threshold ? coldImage : hotImage;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-blue-500 to-gray-400 relative">
      
      <video
        className="absolute inset-0 object-cover w-full h-full opacity-60 z-0"
        src={formatBackgroundVideo()}
        autoPlay
        loop
        muted
      />

      
      <div
        className="relative mx-auto max-w-screen mt-6 py-5 px-10 bg-white/80 backdrop-blur-md rounded-xl shadow-xl shadow-gray-400 z-10"
        style={{
          backgroundImage: `url(${formatInnerImage()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          
        }}
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} setUnits={setUnits} />
        {weather && (
          <>
            <TimeandLocation weather={weather} />
            <TempAndDetails weather={weather} units={units} />
          </>
        )}
      </div>

      
      <ToastContainer 
        autoClose={2500} 
        hideProgressBar={true} 
        theme="colored" 
        position="top-right"
      />
    </div>
  );
};

export default App;
