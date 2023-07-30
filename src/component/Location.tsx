import React, { DetailedHTMLProps, SelectHTMLAttributes } from 'react';


function Location(props: {onSelectPrefecture:any}){
    console.log("Location render");

    const PREFECTURE_NAMES_JP = ["未選択","北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"];
    const PREFECTURE_NAMES_EN = ["noSelect","hokkaido","aomori","iwate","miyagi","akita","yamagata","fukushima","ibaraki","tochigi","gunma","saitama","chiba","tokyo","kanagawa","niigata","toyama","ishikawa","fukui","yamanashi","nagano","gifu","shizuoka","aichi","mie","shiga","kyoto","osaka","hyogo","nara","wakayama","tottori","shimane","okayama","hiroshima","yamaguchi","tokushima","kagawa","ehime","kochi","fukuoka","saga","nagasaki","kumamoto","oita","miyazaki","kagoshima","okinawa",]
    
    function getPrefectureOption(){
      const returnList = [];
      for(let i=0; i<PREFECTURE_NAMES_JP.length; i++){
        const option = <option key={"key_" + PREFECTURE_NAMES_EN[i]} value={PREFECTURE_NAMES_EN[i]}>{PREFECTURE_NAMES_JP[i]}</option>
        returnList.push(option);
      }
      return returnList;
    }

    function onChanged(event:any){
        console.log("================onChanged================");
        console.log(event.target.value);
        props.onSelectPrefecture(event.target.value);
    }


    return(
        <div className='width100'>
          <h3 id="locatonTitle">場所: </h3>
          <select id="locationSelect" name="location" onChange={onChanged}>
            {
              getPrefectureOption()
            }
          </select>
        </div>
    );

}
export default Location;