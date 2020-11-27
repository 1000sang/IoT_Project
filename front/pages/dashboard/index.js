import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { withAuthSync } from '../../authentication/auth.utils';
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout';
import Widgets from '../../containers/Widgets/Widgets';

import io from 'socket.io-client';
import axios from '../../pages/api/axios'
import { useDispatch, useSelector } from 'react-redux';
import socketActions from '../../redux/socket/actions'


const socketClient = io('https://elb.devfloors.com:443/deviceRoom', { transports: ['websocket'] });

const { getTempData, getHumData } = socketActions;

export default withAuthSync(() => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.Auth);
  const { tempData, humData } = useSelector((state) => state.socketReducer)
  const [temp, setTempData] = useState('');
  const [hum, setHumData] = useState('');

  // useEffect(() => {
  //   if (tempData) {
  //     setTempData(tempData)
  //   }
  //   if (humData) {
  //     setHumData(humData)
  //   }
  // }, [tempData, humData])

  function socketConnect(userData) {
    socketClient.on('connect', async () => {
      console.log('socket connected');

      socketClient.on('newRoom', (data) => {
        if (userData.userId == data.userId) {
          Object.values(data.topics).map((v) => {
            socketClient.on(`${v}`, (data) => {
              switch (JSON.parse(data).dataType) {
                case 'Temp':
                  dispatch(getTempData(JSON.parse(data).data))
                  // setTempData(JSON.parse(data).data)
                  break;
                case 'Hum':
                  dispatch(getHumData(JSON.parse(data).data))
                  // setHumData(JSON.parse(data).data)
                  break;
              }
            })
          })
        }
      })

      socketClient.on('disconnect', async () => {
        console.log('접속 해제');
      })

      const result = await axios.post(`/socket/room`, userData);
      console.log('userDAta', userData)
    })
  }
  socketConnect(userData);

  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <DashboardLayout>
        {/* <Card /> */}
        <Widgets />
      </DashboardLayout>
    </>
  )
});
