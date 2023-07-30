import React, { useEffect, useState } from 'react';
import sunny from "../image/sunny.png";
import cloudy from "../image/cloudy.png";
import rainy from "../image/rainy.png";
import AdditionalInfo from './AdditionalInfo';
import json from "../prefecture.json";


function getPrefecture(selectedPref:string){
    let index = 0;
    for(let i=0; i<json.prefecture.length; i++){
      if(json.prefecture[i].pref == selectedPref){
          index = i;
          break;
      }
    }
    return json.prefecture[index];
}


function getPhysicalTemp(temperture:number ,humidity:number){
    const ret = temperture - (1/2.3) * (temperture-10) * (0.8 - (humidity/100));
    return ret;
}


function Weather(props: {prefecture:string, visibility:boolean}){
    console.log("Weather render " + props.prefecture);
    const weather: string[] = [sunny,cloudy,rainy];
    const weatherJP: string[] = ["晴れ","曇り","雨"];



    const [weatherImg, setWeatherImg] = useState(sunny);
    const title: string[] = ["最高気温","最低気温","湿度","体感温度"];
    const temperture: string[] = ["35.5℃","30.0℃","40％","37.4℃"];
    const visibleStatus = (props.visibility ? "visible":"hidden");
    const [maxTemp, setMaxTemp] = useState("");
    const [minTemp, setMinTemp] = useState("");
    const [humidity, setHumidity] = useState("");
    const [physicalTemp, setPhysicalTemp] = useState("");
    const [weatherTitle, setWeatherTitle] = useState("");



    useEffect(() => {
      console.log("---------useEffect---------");

      const selectedPref = getPrefecture(props.prefecture);
      const latitude = selectedPref.lat;
      const longitude = selectedPref.lng;

      const url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&hourly=temperature_2m,relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&windspeed_unit=ms&timezone=Asia%2FTokyo&forecast_days=1";

    new Promise((resolve,reject) =>{
        fetch(url)
        .then((res) =>res.json())
        .then((data) => {
            resolve(data);
            const time = data.hourly.time[0];
            // let maxTemperture = data.hourly.temperature_2m[0];
            // let minTemperture = data.hourly.temperature_2m[0];
            // let maxHumidity = data.hourly.relativehumidity_2m[0];
            // let minHumidity = data.hourly.relativehumidity_2m[0];
            const maxTemperture = data.daily.temperature_2m_max[0];
            const minTemperture = data.daily.temperature_2m_min[0];

            const windspeed = data.daily.windspeed_10m_max[0];
            const weatherCode = data.daily.weathercode[0];

            let maxHumidity = data.hourly.relativehumidity_2m[0];
            let minHumidity = data.hourly.relativehumidity_2m[0];

            for(let i=0; i<data.hourly.time.length; i++){

                // // 最高気温取得
                // if(maxTemperture < data.hourly.temperature_2m[i]){
                //     maxTemperture = data.hourly.temperature_2m[i];
                // }
                // // 最低気温取得
                // if(minTemperture > data.hourly.temperature_2m[i]){
                //     minTemperture = data.hourly.temperature_2m[i];
                // }

                // 最高湿度取得
                if(maxHumidity < data.hourly.relativehumidity_2m[i]){
                    maxHumidity = data.hourly.relativehumidity_2m[i];
                }

                // 最低湿度取得
                if(minHumidity > data.hourly.relativehumidity_2m[i]){
                    minHumidity = data.hourly.relativehumidity_2m[i];
                }

            }
            console.log("time: " + time + " maxTemperture: " + maxTemperture + " minTemperture: " + minTemperture + " maxHumidity: " + maxHumidity + " minHumidity: " + minHumidity + " weatherCode: " + weatherCode);
            setMaxTemp(maxTemperture + "");
            setMinTemp(minTemperture + "");
            setHumidity(maxHumidity + "%/" + minHumidity + "%");

            const temp_physicalTemp = getPhysicalTemp(maxTemperture,maxHumidity);
            setPhysicalTemp(temp_physicalTemp + "");
            let weatherIndex = 0;
            if(weatherCode <= 4) weatherIndex = 0;
            else if(45 <= weatherCode && weatherCode <= 57) weatherIndex = 1;
            else if(61 <= weatherIndex && weatherIndex <= 99) weatherIndex = 2;
            setWeatherImg(weather[weatherIndex]);
            setWeatherTitle(weatherJP[weatherIndex]);
        })
    })

      return () => {
        console.log("---------useEffect return---------");
    }
    }, [props.prefecture])
    


    return(
        <div style={{visibility:visibleStatus}}>
            <div id="marqueeContainer">
                <h2 id="weather">{weatherTitle}</h2>
            </div>
            <div>
                <img src={weatherImg} alt="sunny" className='weather'/>
                <div>
                    <div>
                        <AdditionalInfo title={title[0]} temperture={maxTemp}/>
                        <AdditionalInfo title={title[1]} temperture={minTemp}/>
                        <AdditionalInfo title={title[2]} temperture={humidity}/>
                        <AdditionalInfo title={title[3]} temperture={physicalTemp}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Weather;