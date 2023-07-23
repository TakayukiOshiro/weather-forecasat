import React from 'react';
import sunny from "../image/sunny.png";
import cloudy from "../image/cloudy.png";
import rainy from "../image/rainy.png";
import AdditionalInfo from './AdditionalInfo';

function Weather(){
    const weather: string[] = [sunny,cloudy,rainy];
    const title: string[] = ["最高気温","最低気温","湿度","体感温度"];
    const temperture: string[] = ["35.5℃","30.0℃","40％","37.4℃"];

    return(
        <div>
            <div id="marqueeContainer">
            <h2 id="weather">晴れ</h2>
            </div>
            <div>
            <img src={weather[0]} alt="sunny" className='left weather'/>
            <div>
                <AdditionalInfo title={title[0]} temperture={temperture[0]}/>
                <AdditionalInfo title={title[1]} temperture={temperture[1]}/>
                <AdditionalInfo title={title[2]} temperture={temperture[2]}/>
                <AdditionalInfo title={title[3]} temperture={temperture[3]}/>
            </div>
            </div>
        </div>
    );
}
export default Weather;