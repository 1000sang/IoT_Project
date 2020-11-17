import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
import Widgets from '@iso/containers/Widgets/Widgets';

// import io from 'socket.io-client';

// const socketClient = io('ws://localhost:1883', { transports: ['websocket'] });

// function socketConnect() {
//   socketClient.on('connect', () => {
//     console.log('socket connected');
//   })
// }

import mqtt from 'mqtt';

const mqttConnect = mqtt.connect('ws://localhost:1883');

// import { Connect, subscribe } from 'mqtt-react';
// const MessageContainer = subscribe({ topic: 'DHT11' });

export default withAuthSync(() => {
  // socketConnect();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    mqttConnect.on('connect', () => {
      console.log('connect')
    })
    mqttConnect.on('message', (topic, payload, packet) => {
      console.log(topic)
      setMessages(payload.toString())
    })
  })

  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <DashboardLayout>
        <Widgets />
      </DashboardLayout>
    </>
  )
});