import './styles.css';
import earthLogo from '@assets/earth.svg';

import { useNavigate } from 'react-router-dom';

export default function HomePage(): JSX.Element {
    const navigate = useNavigate();

    const goToWeatherPage = (event: React.MouseEvent<HTMLDivElement>) => navigate({
      pathname: '/weather',
      search: '?city=' + (event.target as HTMLDivElement)?.innerText.toLowerCase(),
    });
    
    return (
        <main className="HomePage">
            <h1 className="title">WEATHER</h1>
            <h2 className="subtitle">select a city</h2>
            <img src={earthLogo} style={{width: "35vw", height: "35vh"}}/>
            <div className="cities-wrapper">
                <div className="city" onClick={goToWeatherPage}>Dallol</div>
                <div className="city" onClick={goToWeatherPage}>Fairbanks</div>
                <div className="city" onClick={goToWeatherPage}>London</div>
                <div className="city" onClick={goToWeatherPage}>Recife</div>
                <div className="city" onClick={goToWeatherPage}>Vancouve</div>
                <div className="city" onClick={goToWeatherPage}>Yakutsk</div>
            </div>
        </main>
    );
}