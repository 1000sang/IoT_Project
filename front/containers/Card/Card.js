import React, { useEffect, useState } from 'react';
import CardWidgetWrapper from './Card.styles';
import { useSelector } from 'react-redux';

export default function ({ number, text }) {

    const { tempData, humData } = useSelector((state) => state.socketReducer)
    const [temp, setTempData] = useState('');
    const [hum, setHumData] = useState('');

    useEffect(() => {
        if (tempData) {
            setTempData(tempData)
        }
        if (humData) {
            setHumData(humData)
        }
    }, [tempData, humData])

    return (
        <CardWidgetWrapper className="isoCardWidget">
            <div className="isoContentWrapper">
                <h3 className="isoStatNumber">{temp}</h3>
                <h3 className="isoStatNumber">{hum}</h3>



                <span className="isoLabel">{hum}</span>
            </div>

            {/* <div className="isoContentWrapper">
                몬도 : {temp}, 습도 : {hum}
            </div> */}
        </CardWidgetWrapper>
    );
}
