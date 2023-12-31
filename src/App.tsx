import React, { useState } from 'react';
import './App.css';
import Location from './component/Location';
import Weather from './component/Weather';

function App() {
  const [prefecture, setPrefecture] = useState("");
  const [isSelected, setIsSelected] = useState(false);


  function onSelectPrefecture(prefecture:string){
    console.log("onSelectPrefecture: " + prefecture);
    setPrefecture(prefecture);
    if(prefecture!="noSelect"){
      setIsSelected(true);
    }else {
      setIsSelected(false);
    }
  }
  const v = [];
  for(let i=0; i<5; i++){
    v.push("test: " + i);
  }
  const [testReturn, setTestReturn] = useState(v);
  console.log(testReturn);
  const t = testReturn;



  return (
    <div className="App">
      <h1>天気予報</h1>
      <Location onSelectPrefecture={onSelectPrefecture}/>
      <Weather prefecture={prefecture} visibility={isSelected}/>
    </div>
  );
}

export default App;
