import React from 'react';

function AdditionalInfo(props: {title: string, temperture: string}){

    return(
        <div className='left width25'>
            <h3>{props.title}</h3>
            <p>{props.temperture}</p>
        </div>
    );
}
export default AdditionalInfo;