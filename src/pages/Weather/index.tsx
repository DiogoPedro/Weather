import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import './styles.css';

function useQuery() {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
}

export default function WeatherPage(): JSX.Element {
    
    let query = useQuery();

    return (
        <div style={{color: "white"}}>{query.get("city")}</div>
    );
}