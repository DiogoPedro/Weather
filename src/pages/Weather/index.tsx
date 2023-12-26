import './styles.css';
import { IoArrowBackSharp } from "react-icons/io5";
import { HiMiniArrowLongUp } from "react-icons/hi2";
import { HiArrowLongDown } from "react-icons/hi2";
import { PiMoonLight } from "react-icons/pi";
import { GoSun } from "react-icons/go";
import { BsCloudSnow } from "react-icons/bs";
import { BsCloudLightningRain } from "react-icons/bs";
import { BsCloudRain } from "react-icons/bs";
import { IoCloudyNightOutline } from "react-icons/io5";
import { WiDayCloudy } from "react-icons/wi";
import { RiQuestionMark } from "react-icons/ri";

import { motion } from 'framer-motion';

import LoadingPage from "@pages/Loading";

import { City } from '@entities/City';
import { WeatherType } from '@entities/WeatherType';

import GetCurrentWeather from '@services/GetCurrentWeather';
import GetHourlyWeather from '@services/GetHourlyWeather';

import getWeatherType from '@utils/getWeatherType';
import rewriteWeatherType from '@utils/rewriteWeatherType';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import searchNextDayWeather from '@utils/searchNextDayWeather';
import searchNextDayTemperature from '@utils/searchNextDayTemperature';
import getSunrise from '@utils/getSunrise';
import getSunset from '@utils/getSunset';

export default function WeatherPage(): JSX.Element {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [weather, setWeather] = useState<WeatherType | null>(null);
    
    const WeatherIcon = (weather: WeatherType) => {
        switch(weather){
            case "sunny": return <GoSun className='Weather-icon Icon'/> 
            case "starry": return <PiMoonLight className='Weather-icon Icon'/>
            case "rainy": return <BsCloudRain className='Weather-icon Icon'/>
            case "snowy": return <BsCloudSnow className='Weather-icon Icon'/>
            case "cloudy-day": return <WiDayCloudy className='Weather-icon Icon'/>
            case "cloudy-night": return <IoCloudyNightOutline className='Weather-icon Icon'/>
            case "thundery": return <BsCloudLightningRain className='Weather-icon Icon'/>
            default: return <RiQuestionMark className='Weather-icon Icon'/>
        }
    }

    const getCurrentWeatherResult = GetCurrentWeather(searchParams.get("city") as City);
    const getHourlyWeatherResult = GetHourlyWeather(searchParams.get("city") as City);

    useEffect(()=>{
        if(import.meta.env.DEV){
            console.log(getCurrentWeatherResult);
            console.log(getHourlyWeatherResult);
        }
        if(getCurrentWeatherResult.loaded && getHourlyWeatherResult.loaded && getCurrentWeatherResult.data) {
            const weatherPage = (document.getElementsByClassName("WeatherPage")[0] as HTMLElement);
            const weatherType = getWeatherType(getCurrentWeatherResult.data?.weather[0].main, new Date());
            weatherPage?.setAttribute("weather", weatherType); 
            setWeather(weatherType);
        }
    }, [getCurrentWeatherResult, getHourlyWeatherResult, weather]);

    if(getCurrentWeatherResult.isLoading || getHourlyWeatherResult.isLoading) return <LoadingPage/>
    
    return (
        <main className='WeatherPage'>
            
            <aside className='Back-bar'>
                <div className='Rounded' onClick={()=>navigate(-1)}>
                    <IoArrowBackSharp className='Back-icon Icon'/>
                </div>
            </aside>

            <motion.article 
                className='Weather-container'
                initial={{ x: window.innerWidth/2, opacity: 0}}
                animate={{x: 0, opacity: 1, transition:{type: "easeIn", duration: 0.6}}}
            >

                <div className='Title-wrapper'>
                    {searchParams && searchParams.get("city") &&
                        <h1 className='Title Text'>{searchParams.get("city")?.toUpperCase()}</h1>
                    }
                    <h2 className='Subtitle Text-bright'>{weather?rewriteWeatherType(weather):"unknown"}</h2>
                </div>

                <div className='Today-temperature Text'>
                    {getCurrentWeatherResult && getCurrentWeatherResult.data &&
                    <>
                        <span className='Temperature'>{(getCurrentWeatherResult.data.main.temp - 273).toFixed(1)}</span>
                        <div className='Temperature-complement'>
                            <span className='Measure Text'><i>°</i>C</span>
                            <div className='Max-min-temperature'>
                                <div className='Temperature-plus-arrow'>
                                    <HiMiniArrowLongUp className='Arrow Icon-brighter'/>
                                    <span className='Temperature Text'>{(getCurrentWeatherResult.data.main.temp_max - 273).toFixed(0)}°</span>
                                </div>
                                <div className='Temperature-plus-arrow Icon-brighter'>
                                    <HiArrowLongDown className='Arrow'/>
                                    <span className='Temperature Text'>{(getCurrentWeatherResult.data.main.temp_min - 273).toFixed(0)}°</span>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                </div>
                
                {weather && 
                    WeatherIcon(weather)
                }
                
                {getHourlyWeatherResult.data &&
                    <div className='Previsions'>
                        <div className='Day-period'>
                            <span className='Title Text-bright'>dawn</span>
                            {WeatherIcon(searchNextDayWeather(getHourlyWeatherResult.data, 3))}
                            <div>
                                <span className='Temperature Text-bright'>{searchNextDayTemperature(getHourlyWeatherResult.data, 3)}</span>
                                <span className='Measure Text-bright'><i>°</i>C</span>
                            </div>
                        </div>
                        <div className='Day-period'>
                            <span className='Title Text-bright'>morning</span>
                            {WeatherIcon(searchNextDayWeather(getHourlyWeatherResult.data, 9))}
                            <div>
                                <span className='Temperature Text-bright'>{searchNextDayTemperature(getHourlyWeatherResult.data, 9)}</span>
                                <span className='Measure Text-bright'><i>°</i>C</span>
                            </div>
                        </div>
                        <div className='Day-period'>
                            <span className='Title Text-bright'>afternoon</span>
                            {WeatherIcon(searchNextDayWeather(getHourlyWeatherResult.data, 15))}
                            <div>
                                <span className='Temperature Text-bright'>{searchNextDayTemperature(getHourlyWeatherResult.data, 15)}</span>
                                <span className='Measure Text-bright'><i>°</i>C</span>
                            </div>
                        </div>
                        <div className='Day-period'>
                            <span className='Title Text-bright'>night</span>
                            {WeatherIcon(searchNextDayWeather(getHourlyWeatherResult.data, 21))}
                            <div>
                                <span className='Temperature Text-bright'>{searchNextDayTemperature(getHourlyWeatherResult.data, 21)}</span>
                                <span className='Measure Text-bright'><i>°</i>C</span>
                            </div>
                        </div>
                    </div>
                }

                {getCurrentWeatherResult.data &&
                    <div className='More-infos'>
                        <div className='Wrapper'>
                            <span className='Title Text-brighter'>wind speed</span>
                            <span className='Value Text-bright'>{getCurrentWeatherResult.data.wind.speed} m/s</span>
                        </div>
                        <div className='Wrapper'>
                            <span className='Title Text-brighter'>sunrise</span>
                            <span className='Value Text-bright'>{getSunrise(getCurrentWeatherResult.data)}</span>
                        </div>
                        <div className='Wrapper'>
                            <span className='Title Text-brighter'>sunset</span>
                            <span className='Value Text-bright'>{getSunset(getCurrentWeatherResult.data)}</span>
                        </div>
                        <div className='Wrapper'>
                            <span className='Title Text-brighter'>humidity</span>
                            <span className='Value Text-bright'>{getCurrentWeatherResult.data.main.humidity}%</span>
                        </div>
                    </div>
                }
            </motion.article>
        </main>
    );
}