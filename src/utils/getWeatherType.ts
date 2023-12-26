import { WeatherType } from "@entities/WeatherType";

export default function getWeatherType (weather: string, date: Date): WeatherType {

    if (weather === "Clear" && isNight(date)) return "starry";
    if (weather === "Clear" && isDay(date)) return "sunny";
    if (weather === "Clouds" && isNight(date)) return "cloudy-night";
    if (weather === "Clouds" && isDay(date)) return "cloudy-day";
    if (weather === "Rain" || weather === "Drizzle") return "rainy";
    if (weather === "Thunderstorm") return "thundery";
    if (weather === "Snow") return "snowy";

    return "unknown";
}

function isNight(date: Date) {
    if(date.getHours() < 6 || date.getHours() > 18) return true;
    return false;
}

function isDay(date: Date) {
    if(date.getHours() >= 6 || date.getHours() <= 18) return true;
    return false;
}