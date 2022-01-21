import { NextComponentType } from 'next';
import Image from 'next/image';
import { useState, useEffect, BaseSyntheticEvent } from 'react';
import axios from 'axios';
import { AxiosResponse } from 'axios';

import style from './Main.module.css';

import search from '../../assets/search.png';

export const Main: NextComponentType = () => {

    const keyAPI = '655b1ff0cc5b2682a466d6a4410a1e95';
    const [city, setCity] = useState <string> ('');
    const [response, setResponse] = useState <null | AxiosResponse<any>> (null);
    const [error, setError] = useState <Boolean> (false);
    const [results, setResults] = useState <any[]> ([]);

    function handleCity({target}: BaseSyntheticEvent): void {
        const { value } = target;
        setCity(value);
    }

    async function forecast(event: BaseSyntheticEvent): Promise<void> {
        try {
            event.preventDefault();
            const res = await axios({
                method: 'GET',
                url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}&lang=pt_br&units=metric`
            });
            setCity('');
            setResponse(res);
        } catch(err) {
            setCity('');
            setError(true);
        }
    }

    useEffect(() => {
        if (response) {
            setError(false);
            const c = results.find(result => result.id == response.data.id);
            if (!c) {
                if (results.length > 5) {
                    results.pop();
                }
                setResults([response.data, ...results]);
            }
        }
    }, [response]);

    useEffect(() => {
        setTimeout(() => setError(false), 5000);
    }, [error]);


    return (
        <main className={style.main}>
            <div className={style.container}>
                <h3>Busque por uma cidade ...</h3>
                <form onSubmit={forecast} className={style.formulario}>
                    <input 
                        type="search" 
                        id='city' 
                        value={city} 
                        onChange={handleCity} 
                        placeholder='Ex: Salvador, BR' 
                        className={style.box}
                    />
                    <button className={style.search}>
                        <Image
                            src={search}
                            alt='search'
                            width={15}
                            height={15}
                        />
                    </button>
                </form>
                {error && <h3 className={style.error}>Nenhuma cidade encontrada</h3>}
            </div>
            
            <div className={response ? style.gridOn : style.gridOff}>
                {response && results.map((result) => { 
                    return (
                        <div key={result.id} className={style.card}>
                            <h2 className={style.city}>{result.name}</h2>
                            <div className={style.weather}>
                                    <img 
                                        src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`} 
                                        alt={result.weather[0].main}
                                        className={style.img}
                                    />
                                <h2 className={style.temp}>
                                    {Math.round(result.main.temp)}
                                    <strong className={style.graus}>
                                        °C
                                    </strong>
                                </h2>
                                <div className={style.desc}>
                                    <p>
                                        {result.weather[0].description[0].toUpperCase() + result.weather[0].description.slice(1)} <br /> 
                                        <strong className={style.st}>SENSAÇÃO TÉRMICA</strong> {Math.round(result.main.feels_like)}°
                                    </p>
                                </div>
                            </div>
                            <div className={style.details}>
                                <p>
                                    {result.sys.country}
                                    <br/>
                                    <img 
                                        src={`https://openweathermap.org/images/flags/${result.sys.country.toLowerCase()}.png`} 
                                        alt={result.sys.country} 
                                    />
                                </p>
                                <p>Máx <br/> {Math.round(result.main.temp_max)}°</p>
                                <p>Mín <br/> {Math.round(result.main.temp_min)}°</p>
                                <p>Umidade <br/> {result.main.humidity}%</p>
                                <p>Vento <br/> {result.wind.speed} km/h</p>
                            </div>
                        </div>
                    )}) 
                }
            </div>
        </main>
    )

}