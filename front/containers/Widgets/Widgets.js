import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import IsoWidgetsWrapper from './WidgetsWrapper';
import CardWidget from './Card/CardWidget';
import Device from '../devices';
import IntlMessages from '@iso/components/utility/intlMessages';
import { useSelector } from 'react-redux';

const styles = {
  wisgetPageStyle: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
}

export default function () {
  const { tempData, humData } = useSelector((state) => state.socketReducer)
  const [temp, setTempData] = useState('');
  const [hum, setHumData] = useState('');

  let CARD_WIDGET = [
    {
      // icon: 'ion-android-chat',
      iconcolor: '#42A5F5',
      number: `${temp}`,
      text: '온도',
    },
    {
      // icon: 'ion-music-note',
      iconcolor: '#F75D81',
      number: `${hum}`,
      text: '습도',
    },
    {
      // icon: 'ion-trophy',
      iconcolor: '#FEAC01',
      number: 'widget.cardwidget3.number',
      text: 'widget.cardwidget3.text',
    },
  ];

  const { rowStyle, colStyle } = basicStyle;

  useEffect(() => {
    if (tempData) {
      setTempData(tempData)
    }
    if (humData) {
      setHumData(humData)
    }
  }, [tempData, humData])

  return (
    <LayoutWrapper>
      <div style={styles.wisgetPageStyle}>
        <Row style={rowStyle} gutter={0} justify="start">
          {CARD_WIDGET.map((widget, idx) => (
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper key={idx} gutterBottom={20}>
                <CardWidget
                  icon={widget.icon}
                  iconcolor={widget.iconcolor}
                  number={widget.number}
                  text={widget.text}
                />
              </IsoWidgetsWrapper>
            </Col>
          ))}
        </Row>
        <Device />
      </div>
    </LayoutWrapper>
  );
}
